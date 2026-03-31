import { createThumbnail } from "@/src/util/courses/courseThumbnail";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { courseID, fileType, fileName, goalID } = await request.json();

  try {
    const result = await createThumbnail({
      courseID,
      fileType,
      fileName,
      goalID,
    });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
