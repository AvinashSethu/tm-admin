import { createAndUpdateExamSection } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { examID, type, sectionTitle, sectionIndex, pMark, nMark } =
    await req.json();
  if (!examID || !type) {
    return Response.json(
      { error: "examID and type are required" },
      { status: 400 }
    );
  }
  try {
    const result = await createAndUpdateExamSection({
      examID,
      type,
      sectionTitle,
      sectionIndex,
      pMark,
      nMark,
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
