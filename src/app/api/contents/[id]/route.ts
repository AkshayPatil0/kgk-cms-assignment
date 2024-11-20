// app/api/content/[id]/route.ts

import { NextResponse } from "next/server";
import {
  getContentById,
  updateContent,
  deleteContent,
} from "@/services/content-service";
import {
  getDefaultErrorResponse,
  mapSuccessResponse,
} from "../../../../lib/api/api-utils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const content = await getContentById(id);
    return NextResponse.json(mapSuccessResponse(content));
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
  const data = await request.json();

  try {
    const updatedContent = await updateContent(id, data);
    return NextResponse.json(mapSuccessResponse(updatedContent));
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
    await deleteContent(id);
    return NextResponse.json(mapSuccessResponse(null));
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}
