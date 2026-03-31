import { getExamsByBatchID } from "@/src/util/exam/batchExamController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, { params }, auth) => {
  try {
    const { batchID } = await params;
    const result = await getExamsByBatchID(batchID);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to fetch scheduled exams",
      },
      { status: 500 }
    );
  }
});
