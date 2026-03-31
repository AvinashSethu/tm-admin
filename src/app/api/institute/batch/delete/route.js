import { deleteBatch } from "@/src/util/institute/batchControllers";
import { NextResponse } from "next/server";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  try {
    const { batchID } = await request.json();

    if (!batchID) {
      return NextResponse.json(
        { success: false, message: "Batch ID is required" },
        { status: 400 }
      );
    }

    const result = await deleteBatch({ batchID });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Delete Batch API error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
});
