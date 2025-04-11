import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
import { 
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes } from "@/routes";

const { auth } = NextAuth(authConfig)
//@ts-ignore
export default auth(async function middleware(req: NextRequest) {

    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;


    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null; // don't do anything
  }

  if (isAuthRoute) {

    if (isLoggedIn) {
     
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null; // don't do anything
  }

  if (!isLoggedIn && !isPublicRoute) {
   
   return Response.redirect(new URL("/auth/login", nextUrl));
  
}
return null;

})


export const config = {

    // invokes every single route in the app
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}