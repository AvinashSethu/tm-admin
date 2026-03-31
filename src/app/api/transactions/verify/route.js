import { verifyTransaction } from "@/src/util/transactions/transactionController";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  try {
    const { transactionId } = await request.json();

    if (!transactionId) {
      return Response.json(
        { success: false, message: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const result = await verifyTransaction(transactionId);
    return Response.json(result);
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});
