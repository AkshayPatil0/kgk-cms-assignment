import { NotFoundError, ValidationError, withError } from "@/lib/error";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// ---- Validation Schemas ----

// Schema for creating Content
const createContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  contentTypeId: z.string().cuid("Invalid ContentType ID"),
  content: z.string().optional(),
});

// Schema for updating Content
const updateContentSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

// Filters schema for content retrieval
const contentFiltersSchema = z.object({
  title: z.string().optional(),
  published: z.boolean().optional(),
  contentTypeId: z.string().cuid().optional(),
});

// Sorting schema
const sortOrderSchema = z.enum(["asc", "desc"]);

// ---- Content CRUD Operations ----

// Create a Content
export const createContent = async (
  title: string,
  slug: string,
  contentTypeId: string,
  content?: string
) => {
  const [valError] = withError(() =>
    createContentSchema.parse({ title, slug, contentTypeId, content })
  );
  if (valError) {
    throw new ValidationError(valError.message);
  }

  return await prisma.content.create({
    data: {
      title,
      slug,
      content,
      contentTypeId,
    },
  });
};

// Get a single Content by ID
export const getContentById = async (id: string) => {
  const content = await prisma.content.findUnique({
    where: { id },
  });
  if (!content) throw new NotFoundError("Content not found");
  return content;
};

// Update a Content
export const updateContent = async (
  id: string,
  data: Partial<Prisma.ContentUpdateInput>
) => {
  const [valError] = withError(() => updateContentSchema.parse(data));
  if (valError) {
    throw new ValidationError(valError.message);
  }

  return await prisma.content.update({
    where: { id },
    data,
  });
};

// Delete a Content
export const deleteContent = async (id: string) => {
  return await prisma.content.delete({
    where: { id },
  });
};

// ---- Advanced Content Queries: Filtering, Sorting, and Pagination ----

/**
 * Get a paginated list of content with optional filtering and sorting
 */
export const getContents = async ({
  filters = {},
  page = 1,
  pageSize = 10,
  sortField = "createdAt",
  sortOrder = "desc",
}: {
  filters: {
    title?: string;
    published?: boolean;
    contentTypeId?: string;
  };
  page: number;
  pageSize: number;
  sortField: keyof Prisma.ContentOrderByWithRelationInput;
  sortOrder: Prisma.SortOrder;
}) => {
  const [valError] = withError(() => {
    contentFiltersSchema.parse(filters);
    sortOrderSchema.parse(sortOrder);
  });
  if (valError) {
    throw new ValidationError(valError.message);
  }

  const skip = (page - 1) * pageSize;

  return await prisma.content.findMany({
    where: {
      title: filters.title ? { contains: filters.title } : undefined,
      published: filters.published,
      contentTypeId: filters.contentTypeId,
    },
    skip,
    take: pageSize,
    orderBy: {
      [sortField]: sortOrder,
    },
  });
};

// Get total count for pagination purposes
export const getContentsCount = async (
  filters: {
    title?: string;
    published?: boolean;
    contentTypeId?: string;
  } = {}
) => {
  const [valError] = withError(() => contentFiltersSchema.parse(filters));
  if (valError) {
    throw new ValidationError(valError.message);
  }

  return await prisma.content.count({
    where: {
      title: filters.title ? { contains: filters.title } : undefined,
      published: filters.published,
      contentTypeId: filters.contentTypeId,
    },
  });
};
