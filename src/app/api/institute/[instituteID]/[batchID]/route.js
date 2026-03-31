import { getBatch } from "@/src/util/institute/batchControllers";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (req, { params }, auth) => {
  const { batchID } = await params;
  if (!batchID) {
    return Response.json(
      { success: false, message: "Batch ID is required" },
      { status: 400 }
    );
  }
  try {
    const result = await getBatch({ batchID });
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
