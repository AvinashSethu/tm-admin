import { deleteCoupon } from "@/src/util/coupon/couponController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { id } = await request.json();
  if (!id) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const coupon = await deleteCoupon(id);
    return Response.json(coupon);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
