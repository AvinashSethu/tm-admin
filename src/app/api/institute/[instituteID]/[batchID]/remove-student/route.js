import { removeStudentFromBatch } from "@/src/util/institute/batchControllers";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, { params }, auth) => {
  const { batchID } = await params;
  const { userID } = await req.json();
  if (!userID || !batchID) {
    return Response.json(
      { success: false, message: "User ID and batch ID are required" },
      { status: 400 }
    );
  }
  try {
    const result = await removeStudentFromBatch(userID, batchID);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
