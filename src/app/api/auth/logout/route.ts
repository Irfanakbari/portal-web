import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {

    const idToken = session.id_token

    // this will log out the user on Keycloak side
    const url = `${process.env.KEYCLOACK_END_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL!)}`;

    try {
      await fetch(url, { method: "GET" });
    } catch (err) {
      return Response.json({ status: 500 })    }
  }
  return Response.json({ status: 500 })
}