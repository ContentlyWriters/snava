import { NextResponse } from "next/server";
import { getReviews } from "@/lib/judgeme";

export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || "1");
    const perPage = Number(searchParams.get("limit") || "12");

    const data = await getReviews(page, perPage);

    return NextResponse.json({
      success: true,
      reviews: data.reviews ?? [],
      total: data.reviews.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}