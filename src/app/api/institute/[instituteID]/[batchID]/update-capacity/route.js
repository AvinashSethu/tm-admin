import { updateBatchCapacity } from "@/src/util/institute/batchControllers";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, { params }, auth) => {
  const { batchID } = await params;
  const { capacity } = await req.json();
  try {
    const resp = await updateBatchCapacity(batchID, capacity);
    return Response.json(resp, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
