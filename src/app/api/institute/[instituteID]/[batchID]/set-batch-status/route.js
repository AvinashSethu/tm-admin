import { setBatchLockState } from "@/src/util/institute/batchControllers";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (req, { params }, auth) => {
  const { shouldLock } = await req.json();
  const { batchID } = await params;
  try {
    const resp = await setBatchLockState(batchID, shouldLock);
    return Response.json(resp, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
