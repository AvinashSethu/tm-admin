import getSubject from "@/src/util/subjects/getSubject";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (req, { params }, auth) => {
  const { subjectID } = await params;

  if (!subjectID) {
    return Response.json(
      { success: false, message: "Subject ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await getSubject({ subjectID });
    if (result.success) {
      return Response.json(result);
    } else {
      return Response.json(result, { status: 404 });
    }
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
