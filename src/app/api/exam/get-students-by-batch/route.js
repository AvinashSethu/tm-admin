import { getStudentsByBatchIds } from "@/src/util/institute/batchControllers";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  try {
    const { batchIds } = await request.json();
    const response = await getStudentsByBatchIds(batchIds);
    return Response.json(response);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
});
