import { deleteGoalThumbnail } from "@/src/util/goals/goalThumbnail";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { goalID } = await request.json();

  try {
    const result = await deleteGoalThumbnail({
      goalID,
    });
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
