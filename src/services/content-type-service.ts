import { NotFoundError } from "@/lib/error";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import slugify from "slugify";
const prisma = new PrismaClient();

// ---- Validation Schemas ----

// Schema for ContentType
const contentTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

// ---- ContentType CRUD Operations ----

// Create a ContentType
export const createContentType = async (name: string) => {
  contentTypeSchema.parse({ name });
  return await prisma.contentType.create({
    data: { name, slug: slugify(name) },
  });
};

// Get all ContentTypes
export const getAllContentTypes = async () => {
  return await prisma.contentType.findMany();
};

// Get a ContentType by ID
export const getContentTypeById = async (id: string) => {
  const contentType = await prisma.contentType.findUnique({
    where: { id },
  });
  if (!contentType) throw new NotFoundError("Content type not found");
  return contentType;
};

// Update a ContentType
export const updateContentType = async (id: string, name: string) => {
  contentTypeSchema.parse({ name });
  return await prisma.contentType.update({
    where: { id },
    data: { name },
  });
};

// Delete a ContentType
export const deleteContentType = async (id: string) => {
  return await prisma.contentType.delete({
    where: { id },
  });
};
