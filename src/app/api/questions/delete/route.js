import deleteQuestion from "@/src/util/questions/deleteQuestion";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { questionID, subjectID } = await request.json();
  if (!questionID || !subjectID) {
    return Response.json(
      { error: "Invalid question ID or subject ID" },
      { status: 400 }
    );
  }
  try {
    const response = await deleteQuestion({ questionID, subjectID });
    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("Error deleting question:", error);
    return Response.json({ error: "Error deleting question" }, { status: 500 });
  }
});
