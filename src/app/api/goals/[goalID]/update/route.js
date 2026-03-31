import updateGoal from "@/src/util/goals/updateGoal";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, { params }, auth) => {
  const { goalID } = await params;
  try {
    const { title, icon, tagline, description } = await request.json();
    if (!title || !icon) {
      return Response.json(
        { message: "Title and icon are required" },
        { status: 400 }
      );
    }
    const response = await updateGoal(goalID, {
      title,
      icon,
      tagline,
      description,
    });
    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
