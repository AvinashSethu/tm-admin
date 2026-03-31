import { getAllScheduledExams } from "@/src/util/exam/scheduleExamController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  try {
    const response = await getAllScheduledExams();
    return Response.json(response);
  } catch (error) {
    return Response.json({
      success: false,
      message: "Error fetching scheduled exams",
      error: error.message,
    });
  }
});
