import { updateExamGroup } from "@/src/util/exam/groupExamController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const {
    examGroupID,
    goalID,
    title,
    isLive,
    isProTest,
    isAntiCheat,
    isFullScreenMode,
    isShowResult,
    isRandomQuestion,
    mCoinRewardIsEnabled,
    mCoinRewardConditionPercent,
    mCoinRewardRewardCoin,
  } = await req.json();
  if (!examGroupID || !goalID) {
    return Response.json({
      success: false,
      message: "Group ID is required",
    });
  }
  try {
    const result = await updateExamGroup({
      examGroupID,
      goalID,
      title,
      isLive,
      isProTest,
      isAntiCheat,
      isFullScreenMode,
      isShowResult,
      isRandomQuestion,
      mCoinRewardIsEnabled,
      mCoinRewardConditionPercent,
      mCoinRewardRewardCoin,
    });
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
