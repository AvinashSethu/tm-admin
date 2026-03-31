import getLessons from "@/src/util/courses/getLessons";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { courseID } = await request.json();
  if (!courseID) {
    return Response.json({ message: "courseID is required" }, { status: 400 });
  }
  try {
    const response = await getLessons(courseID);
    return Response.json(response);
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
});
