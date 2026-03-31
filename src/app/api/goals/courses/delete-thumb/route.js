import { deleteThumbnail } from "@/src/util/courses/courseThumbnail";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { courseID, goalID } = await request.json();
  try {
    const result = await deleteThumbnail({
      courseID,
      goalID,
    });
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
