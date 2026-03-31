import { reorderLesson } from "@/src/util/courses/reorderLesson";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { courseID, goalID, lessonIDs, sections } = await request.json();
  if (!courseID || !lessonIDs) {
    return Response.json(
      { success: false, message: "Missing courseID or lessonIDs" },
      { status: 400 }
    );
  }
  try {
    const result = await reorderLesson({ courseID, goalID, lessonIDs, sections });
    return Response.json(result);
  } catch (error) {
    console.error("Error in reorderLesson route:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
