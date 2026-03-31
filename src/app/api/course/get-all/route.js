import { getALLCourse } from "@/src/util/courses/getAllCourses";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  try {
    const resp = await getALLCourse();
    return Response.json(resp);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
});
