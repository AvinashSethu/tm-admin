import getAllGoals from "@/src/util/goals/getAllGoals";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  try {
    const response = await getAllGoals();
    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
