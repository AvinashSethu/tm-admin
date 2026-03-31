import { getExamGroupByGoalID } from "@/src/util/exam/groupExamController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { goalID } = await request.json();
  if (!goalID) {
    return Response.json({
      success: false,
      message: "Goal ID is required",
    });
  }
  try {
    const result = await getExamGroupByGoalID(goalID);
    return Response.json(result);
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
