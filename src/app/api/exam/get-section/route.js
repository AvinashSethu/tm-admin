import { getQuestionListBySection } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { examID, type, sectionIndex } = await req.json();
  if (!examID || !type || sectionIndex === undefined) {
    return Response.json({
      success: false,
      message: "Missing required fields",
    });
  }
  try {
    const result = await getQuestionListBySection({
      examID,
      type,
      sectionIndex,
    });
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
