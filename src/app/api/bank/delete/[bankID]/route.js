import deleteBank from "@/src/util/bank/deleteBank";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, { params }, auth) => {
  const { bankID } = await params;
  if (!bankID) {
    return Response.json({ message: "Bank ID is required" }, { status: 400 });
  }
  try {
    const result = await deleteBank({ bankID });
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error deleting bank" }, { status: 500 });
  }
});
