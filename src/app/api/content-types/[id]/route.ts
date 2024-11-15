// app/api/contentType/[id]/route.ts

import { NextResponse } from "next/server";
import {
  getContentTypeById,
  updateContentType,
  deleteContentType,
} from "@/services/content-type-service";
import {
  getDefaultErrorResponse,
  mapSuccessResponse,
} from "../../../../lib/api/api-utils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const contentType = await getContentTypeById(id);

    return NextResponse.json(mapSuccessResponse(contentType));
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name } = await request.json();

  try {
    const updatedContentType = await updateContentType(id, name);
    return NextResponse.json(mapSuccessResponse(updatedContentType));
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await deleteContentType(id);
    return NextResponse.json(mapSuccessResponse(null));
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}
