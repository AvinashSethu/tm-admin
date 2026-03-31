import { unlinkResource } from "@/src/util/courses/updateLesson";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { lessonID, courseID, resourceID } = await request.json();
  if (!lessonID || !courseID || !resourceID) {
    return Response.json(
      { success: false, message: "Missing lessonID, courseID, or resourceID" },
      { status: 400 }
    );
  }
  try {
    const result = await unlinkResource({ lessonID, courseID, resourceID });
    return Response.json(result);
  } catch (error) {
    console.error("Error in unlinkLessonResource route:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
