import { getExamGroup } from "@/src/util/exam/groupExamController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, { params }, auth) => {
  const { examGroupID } = await params;
  if (!examGroupID) {
    return Response.json({
      success: false,
      message: "Exam group ID is required",
    });
  }
  try {
    const result = await getExamGroup(examGroupID);
    return Response.json(result);
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
