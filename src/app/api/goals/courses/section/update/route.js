import { updateSections } from "@/src/util/courses/updateSections";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { courseID, goalID, action, payload } = await request.json();
  if (!courseID || !goalID || !action) {
    return Response.json(
      { success: false, message: "Missing courseID, goalID, or action" },
      { status: 400 }
    );
  }
  try {
    const result = await updateSections({ courseID, goalID, action, payload });
    return Response.json(result);
  } catch (error) {
    console.error("Error in section update route:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
