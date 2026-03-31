import liveUnliveGoal from "@/src/util/goals/liveUnliveGoal";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, { params }, auth) => {
  const { goalID } = await params;
  try {
    const response = await liveUnliveGoal({ goalID });
    return Response.json(response);
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
});
