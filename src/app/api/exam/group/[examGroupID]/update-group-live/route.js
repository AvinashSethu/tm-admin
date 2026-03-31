import { updateExamGroupLiveStatus } from "@/src/util/exam/groupExamController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, { params }, auth) => {
  const { examGroupID } = await params;
  const { isLive, goalID } = await req.json();
  try {
    const result = await updateExamGroupLiveStatus({
      examGroupID,
      goalID,
      isLive,
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
});
