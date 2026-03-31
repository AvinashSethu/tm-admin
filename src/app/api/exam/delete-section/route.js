import { deleteSection } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { examID, type, sectionIndex } = await request.json();
  if (!examID || !type || sectionIndex == undefined) {
    return Response.json({ success: false, message: "Missing fields" });
  }

  try {
    await deleteSection({ examID, type, sectionIndex });
    return Response.json(
      {
        success: true,
        message: "Section deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
