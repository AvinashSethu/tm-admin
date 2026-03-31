import { createExam } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { type, title, groupID, goalID, batchList, studentList } =
    await request.json();
  try {
    const exam = await createExam({
      type,
      title,
      groupID,
      goalID,
      batchList,
      studentList,
    });
    return Response.json(exam);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
