import { NextResponse } from "next/server";
import {
  createContent,
  getContents,
  getContentsCount,
} from "@/services/content-service";
import { Prisma } from "@prisma/client";
import {
  getDefaultErrorResponse,
  mapSuccessResponse,
} from "../../../lib/api/api-utils";
import { PaginatedResponse } from "@/lib/api/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = {
    title: searchParams.get("title") || undefined,
    published: searchParams.get("published") === "true",
    contentTypeId: searchParams.get("contentTypeId") || undefined,
  };
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const sortField =
    (searchParams.get(
      "sortField"
    ) as keyof Prisma.ContentOrderByWithRelationInput) || "createdAt";
  const sortOrder =
    (searchParams.get("sortOrder") as Prisma.SortOrder) || "desc";

  try {
    const contents = await getContents({
      filters,
      page,
      pageSize,
      sortField,
      sortOrder,
    });
    const total = await getContentsCount(filters);
    return NextResponse.json(
      mapSuccessResponse({
        records: contents,
        total,
      } as PaginatedResponse<(typeof contents)[0]>)
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}

export async function POST(request: Request) {
  const { title, slug, content, contentTypeId } = await request.json();

  try {
    const newContent = await createContent(title, slug, contentTypeId, content);
    return NextResponse.json(mapSuccessResponse(newContent), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}
