import { updateStudentListExamBasicInfo } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  try {
    const { examID, studentList } = await request.json();
    const response = await updateStudentListExamBasicInfo({
      examID,
      studentList,
    });
    return Response.json(response);
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
