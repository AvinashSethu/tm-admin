import createBank from "@/src/util/bank/createBank";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { title } = await request.json();
  if (!title) {
    return Response.json(
      { success: false, message: "Title is required" },
      { status: 400 }
    );
  }
  try {
    const result = await createBank({ title });
    return Response.json(result, { status: 201 });
  } catch (err) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
