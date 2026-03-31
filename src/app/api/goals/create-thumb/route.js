import { createGoalThumbnail } from "@/src/util/goals/goalThumbnail";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { goalID, fileType, fileName } = await request.json();

  try {
    const result = await createGoalThumbnail({
      goalID,
      fileType,
      fileName,
    });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
