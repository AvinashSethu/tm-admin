import { removeQuestionsFromSection } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { examID, type, sectionIndex, questionIDs } = await req.json();

  if (
    !examID ||
    !type ||
    sectionIndex === undefined ||
    !questionIDs
  ) {
    return Response.json(
      {
        success: false,
        message: "Missing required fields",
      },
      { status: 400 }
    );
  }

  try {
    const result = await removeQuestionsFromSection({
      examID,
      type,
      sectionIndex,
      questionIDs,
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
