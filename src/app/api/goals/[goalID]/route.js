import getGoal from "@/src/util/goals/getGoal";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, { params }, auth) => {
  const { goalID } = await params;
  try {
    const response = await getGoal({ goalID });
    if (!response.success) {
      return Response.json(response, { status: 404 });
    }
    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
