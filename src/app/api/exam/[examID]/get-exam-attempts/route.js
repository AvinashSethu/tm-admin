import { getAllExamAttemptsByExamID } from "@/src/util/exam/examAttemptController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, { params }, auth) => {
  const { examID } = await params;
  try {
    const response = await getAllExamAttemptsByExamID(examID);
    return Response.json(response);
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
});
