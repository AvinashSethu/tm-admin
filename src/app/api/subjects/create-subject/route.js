import createSubject from "@/src/util/subjects/createSubject";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { title } = await request.json();
  if (!title) {
    return Response.json(
      { message: "Title is required", success: false },
      { status: 400 }
    );
  }
  try {
    const response = await createSubject({ title });
    return Response.json(response, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
