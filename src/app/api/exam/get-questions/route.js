import { getQuestions } from "@/src/util/exam/questionFilterController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const {
    type,
    difficulty,
    subjectID,
    searchTerm,
    limit,
    lastEvaluatedKey,
    isRandom, // Use isRandom as provided
    randomCount,
  } = await request.json();

  try {
    const questions = await getQuestions({
      type,
      difficulty,
      subjectID,
      searchTerm,
      limit,
      lastEvaluatedKey,
      isRandom, // Pass isRandom as random
      randomCount,
    });

    return Response.json(questions);
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
