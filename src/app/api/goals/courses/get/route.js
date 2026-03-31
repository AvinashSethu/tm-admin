import getCourse from "@/src/util/courses/getCourse";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { courseID, goalID } = await request.json();
  
  if (!courseID) {
    return Response.json({ message: "Course ID is required" }, { status: 400 });
  }
  try {
    const result = await getCourse({ courseID, goalID });
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error fetching course" }, { status: 500 });
  }
});
