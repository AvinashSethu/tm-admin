import { getFileURL } from "@/src/util/bank/getFileURL";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");
  if (!path) {
    return Response.json({ error: "Invalid file path" }, { status: 400 });
  }

  try {
    const response = await getFileURL({ path, expiry: 60 * 5 });
    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("Error getting file URL:", error);
    return Response.json({ error: "Error getting file URL" }, { status: 500 });
  }
});
