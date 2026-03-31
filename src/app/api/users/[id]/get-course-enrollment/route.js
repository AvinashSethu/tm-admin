import { getCourseEnrollByUserID } from "@/src/util/user/userController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, { params }, auth) => {
  const { id } = await params;
  try {
    const response = await getCourseEnrollByUserID(id);
    return Response.json(response);
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
});
