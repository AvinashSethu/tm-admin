import { getAllBatches } from "@/src/util/institute/batchControllers";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (req, res, _context, auth) => {
  try {
    const batches = await getAllBatches();
    return Response.json(batches);
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
});
