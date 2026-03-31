import { getQuestions } from "@/src/util/exam/questionFilterController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  try {
    const body = await req.json();
    const result = await getQuestions(body);

    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
