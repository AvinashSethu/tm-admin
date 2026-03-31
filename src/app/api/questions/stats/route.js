import { getQuestionStats } from "@/src/util/exam/questionFilterController";
import { withAuth } from "@/src/lib/withAuth";

export const dynamic = "force-dynamic";

export const GET = withAuth(async (request, _context, auth) => {
  const url = new URL(request.url);
  const subjectID = url.searchParams.get("subjectID") || undefined;
  const type = url.searchParams.get("type") || undefined;
  const searchTerm = url.searchParams.get("search") || undefined;
  const difficultyLevelParam = url.searchParams.get("difficulty");
  const difficultyLevel = difficultyLevelParam
    ? parseInt(difficultyLevelParam, 10)
    : undefined;

  try {
    const stats = await getQuestionStats({
      subjectID,
      type,
      difficultyLevel,
      searchTerm,
    });
    return Response.json({ success: true, data: stats }, { status: 200 });
  } catch (error) {
    console.error("Error fetching question stats:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});
