import createGoals from "@/src/util/goals/createGoals";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  try {
    const { title, icon } = await request.json();
    if (!title || !icon) {
      return Response.json(
        { message: "Title and icon are required" },
        { status: 400 }
      );
    }
    const response = await createGoals({ title, icon });
    return Response.json(response, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
