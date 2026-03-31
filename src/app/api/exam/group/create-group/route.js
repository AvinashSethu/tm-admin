import { createExamGroup } from "@/src/util/exam/groupExamController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { title, goalID } = await req.json();
  if (!title || !goalID) {
    return Response.json({
      success: false,
      message: "Title and goalID are required",
    });
  }
  try {
    const result = await createExamGroup({ title, goalID });
    return Response.json(result, { status: 200 });
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
