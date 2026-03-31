import { getExamByID } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (req, { params }, auth) => {
  const { examID } = await params;
  if (!examID) {
    return Response.json({ error: "examID is required" }, { status: 400 });
  }
  try {
    const exam = await getExamByID(examID);
    return Response.json(exam);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
