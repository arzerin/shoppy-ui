import { NextRequest } from "next/server";
import authenticated from "./app/auth/authenticated";

// const unauthorizedRoutes = ["/auth/login", "/auth/signup"];
import { unauthenticatedRoutes } from "./app/common/constants/routes";


// export function middleware(request: NextRequest) {
//   const auth = request.cookies.get("Authentication")?.value;

//   if (
//     !auth &&
//     !unauthorizedRoutes.some((route) =>
//       request.nextUrl.pathname.startsWith(route)
//     )
//   ) {
//     return Response.redirect(new URL("/auth/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };


export function middleware(request: NextRequest) {
  if (
    !authenticated() &&
    !unauthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route.path)
    )
  ) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};