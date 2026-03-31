import { getAllInstitutes } from "@/src/util/institute/instituteControllers";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (req, _context, auth) => {
  try {
    const result = await getAllInstitutes();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
