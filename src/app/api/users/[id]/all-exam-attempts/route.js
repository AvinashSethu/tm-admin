import { getExamAttemptsByUserID } from "@/src/util/user/userController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (req, { params }, auth) => {
  const { id } = await params;
  try {
    const response = await getExamAttemptsByUserID(id);
    return Response.json(response);
  } catch (error) {
    console.error("Error fetching exam attempts:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
