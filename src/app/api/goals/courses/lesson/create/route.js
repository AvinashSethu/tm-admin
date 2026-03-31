import createLesson from "@/src/util/courses/createLesson";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { courseID, sectionID } = await request.json();
  if (!courseID) {
    return Response.json(
      { success: false, message: "Missing courseID" },
      { status: 400 }
    );
  }
  try {
    const result = await createLesson({ courseID, sectionID });
    return Response.json(result);
  } catch (error) {
    console.error("Error in createLesson route:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
