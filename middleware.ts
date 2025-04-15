// import authConfig from "./auth.config"
// import NextAuth from "next-auth"
 
// import { 
//     apiAuthPrefix,
//     authRoutes,
//     DEFAULT_LOGIN_REDIRECT,
//     publicRoutes } from "@/routes";

// const { auth } = NextAuth(authConfig)
// //@ts-ignore
// export default auth(async function middleware(req: NextRequest) {

//     const {nextUrl} = req;
//     const isLoggedIn = !!req.auth;


//     const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return null; // don't do anything
//   }

//   if (isAuthRoute) {

//     if (isLoggedIn) {
     
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null; // don't do anything
//   }

//   if (!isLoggedIn && !isPublicRoute) {
   
//    return Response.redirect(new URL("/auth/login", nextUrl));
  
// }
// return null;

// })


// export const config = {

//     // invokes every single route in the app
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// }



import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // Do nothing for API auth routes
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect logged-in users away from auth routes
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // Allow unauthenticated users to access auth routes
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Redirect unauthenticated users to the login page
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Allow access to public routes or logged-in users
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
