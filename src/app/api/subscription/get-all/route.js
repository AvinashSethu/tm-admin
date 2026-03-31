import { getAllSubscriptionPlan } from "@/src/util/subscription/subscriptionController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (req, _context, auth) => {
  try {
    const response = await getAllSubscriptionPlan();
    return Response.json(response);
  } catch (error) {
    return Response.json(
      {
        status: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
});
