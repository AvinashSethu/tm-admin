import { makeCourseEnrollmentActiveOrInactive } from "@/src/util/user/userController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, { params }, auth) => {
  const { enrollmentID, isActive } = await request.json();
  if (!enrollmentID || isActive === undefined || isActive === null) {
    return Response.json(
      {
        success: false,
        message: "Enrollment ID and status are required",
      },
      { status: 400 }
    );
  }
  const status = isActive ? "active" : "inactive";
  try {
    const resp = await makeCourseEnrollmentActiveOrInactive(
      enrollmentID,
      status
    );
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
