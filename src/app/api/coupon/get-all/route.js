import { getAllCoupons } from "@/src/util/coupon/couponController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  try {
    const coupons = await getAllCoupons();
    return Response.json(coupons);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
