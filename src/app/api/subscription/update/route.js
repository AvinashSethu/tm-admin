import { updateSubscriptionPlan } from "@/src/util/subscription/subscriptionController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { id, priceWithTax, type, duration, discountInPercent } =
    await req.json();
  if (!id || !priceWithTax || !type || !duration) {
    return Response.json({
      status: false,
      message: "All fields are required",
    });
  }
  try {
    const response = await updateSubscriptionPlan(id, {
      priceWithTax,
      type,
      duration,
      discountInPercent: discountInPercent || 0,
    });
    return Response.json(response);
  } catch (error) {
    return Response.json({
      status: false,
      message: error.message,
    });
  }
});
