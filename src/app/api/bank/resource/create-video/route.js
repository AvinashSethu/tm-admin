import { createVideo } from "@/src/util/bank/uploadVideo";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { title, bankID } = await request.json();
  if (!title || !bankID) {
    return Response.json(
      { success: false, message: "Title and bankID are required" },
      { status: 400 }
    );
  }
  try {
    const result = await createVideo({ title, bankID });
    return Response.json(result, { status: 201 });
  } catch (err) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
