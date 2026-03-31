import { updateSubject } from "@/src/util/subjects/createSubject";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, _context, auth) => {
  const { subjectID, title } = await req.json();
  if (!subjectID || !title) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const result = await updateSubject({ subjectID, title });
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});