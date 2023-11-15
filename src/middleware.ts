import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOption";

export default withAuth(
  function middleware(req: NextRequestWithAuth){
    const { token } = req.nextauth;

    if (!token) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    cookies: authOptions.cookies,
    pages: authOptions.pages
  }
);
export const config = { matcher: ['/portal', "/((?!register|api|login|$).*)"]}