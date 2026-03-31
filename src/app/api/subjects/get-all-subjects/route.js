import getAllSubjects from "@/src/util/subjects/getAllSubjects";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit"), 10)
      : undefined;
    const cursor = searchParams.get("cursor") || undefined;

    const response = await getAllSubjects({ limit, cursor });
    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
