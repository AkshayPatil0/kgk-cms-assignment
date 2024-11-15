// app/api/contentType/route.ts

import { NextResponse } from "next/server";
import {
  createContentType,
  getAllContentTypes,
} from "@/services/content-type-service";
import {
  getDefaultErrorResponse,
  mapSuccessResponse,
} from "../../../lib/api/api-utils";

export async function GET() {
  try {
    const contentTypes = await getAllContentTypes();
    return NextResponse.json(mapSuccessResponse(contentTypes));
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();

  try {
    const newContentType = await createContentType(name);
    return NextResponse.json(mapSuccessResponse(newContentType), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(...getDefaultErrorResponse(error));
  }
}
