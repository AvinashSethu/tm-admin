import { verifyFile } from "@/src/util/bank/uploadFile";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {

  const { resourceID, path } = await request.json();
  
  if (!resourceID) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const response = await verifyFile(resourceID, path);
    return Response.json(response);
  } catch (error) {
    console.error("Failed to verify file:", error);
    return Response.json({ error: "Failed to verify file" }, { status: 500 });
  }
});
