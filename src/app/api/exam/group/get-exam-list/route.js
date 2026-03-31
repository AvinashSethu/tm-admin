import { getExamListByGroupID } from "@/src/util/exam/groupExamController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { groupID } = await req.json();
  if (!groupID) {
    return Response.json({
      success: false,
      message: "Group ID is required",
    });
  }
  try {
    const result = await getExamListByGroupID(groupID);
    return Response.json(result);
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
});
