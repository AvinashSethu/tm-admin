import { cookies } from "next/headers";
import { verifyToken } from "./jwtToken";

/**
 * Route-level auth guard — the Next.js equivalent of NestJS useGlobalGuards().
 *
 * Defense-in-depth: proxy.js already blocks unauthenticated requests, but this
 * guard independently verifies the session cookie so that routes are never
 * exposed even if the proxy is misconfigured or bypassed.
 *
 * Usage:
 *   export const GET = withAuth(async (request, context, auth) => { ... });
 *   // auth = { userID, email }
 */
export function withAuth(handler) {
  return async function authHandler(request, context) {
    try {
      const cookieStore = await cookies();
      const session = cookieStore.get("session")?.value;

      if (!session) {
        return Response.json(
          { message: "Unauthorized", success: false },
          { status: 401 },
        );
      }

      const payload = await verifyToken(session);

      return handler(request, context, {
        userID: payload.id,
        email: payload.email,
      });
    } catch {
      return Response.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }
  };
}
