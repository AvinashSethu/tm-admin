import { updateUserStatus } from "@/src/util/user/userController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { id, status } = await request.json();
  if (!id || !status) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const user = await updateUserStatus(id, status);
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
