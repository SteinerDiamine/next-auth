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
  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow all API auth routes (like /api/auth/*)
  if (isApiAuthRoute) {
    return;
  }

  // For other API routes, require authentication
  if (isApiRoute && !isLoggedIn) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

// Update matcher to handle all routes including API routes
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
