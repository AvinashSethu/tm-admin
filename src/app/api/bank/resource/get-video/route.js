import getVideoURL from "@/src/util/bank/getVideoURL";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  const url = new URL(request.url);
  const resourceID = url.searchParams.get("resourceID");
  if (!resourceID) {
    return Response.json({
      success: false,
      message: "Resource ID is required",
    });
  }
  try {
    const response = await getVideoURL(resourceID);
    return Response.json(response);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
