import { markExamAsLive } from "@/src/util/exam/examController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { examID, type } = await req.json();
  if (!examID || !type) {
    return Response.json(
      { error: "examID and type are required" },
      { status: 400 }
    );
  }
  try {
    const result = await markExamAsLive({ examID, type });
    return Response.json(result);
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
