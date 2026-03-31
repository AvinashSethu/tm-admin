import { createGoalContent } from "@/src/util/goals/goalContent";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { goalID, content } = await request.json();
  try {
    const result = await createGoalContent({ goalID, content });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
