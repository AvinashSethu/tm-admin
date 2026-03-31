import { makeProSubscriptionActiveOrInactive } from "@/src/util/user/userController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, { params }, auth) => {
  const { isActive, subscriptionID } = await request.json();

  const status = isActive ? "active" : "inactive";

  try {
    const response = await makeProSubscriptionActiveOrInactive(subscriptionID, status);
    return Response.json(response);
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
});
