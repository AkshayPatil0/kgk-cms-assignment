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
import { RouteParams } from "@/lib/api/types";

export async function GET(
  request: Request,
  { params }: RouteParams<{ id: string }>
) {
  const { id } = await params;
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
  { params }: RouteParams<{ id: string }>
) {
  const { id } = await params;
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
  { params }: RouteParams<{ id: string }>
) {
  const { id } = await params;
  try {
    await deleteContentType(id);
    return NextResponse.json(mapSuccessResponse(null));
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}
