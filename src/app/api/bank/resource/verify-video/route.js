import { verifyUpload } from "@/src/util/bank/uploadVideo";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { videoID, bankID, resourceID } = await request.json();
  if (!videoID || !bankID || !resourceID) {
    return Response.json(
      {
        success: false,
        message: "videoID, bankID, and resourceID are required",
      },
      { status: 400 }
    );
  }
  try {
    const result = await verifyUpload({ videoID, bankID, resourceID });
    return Response.json(result, { status: 201 });
  } catch (err) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
