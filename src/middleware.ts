import { NextResponse } from "next/server";

export function middleware() {
  // retrieve the current response
  const res = NextResponse.next();

  // add the CORS headers to the response
  res.headers.append(
    "Access-Control-Allow-Credentials",
    process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS,
  );
  res.headers.append(
    "Access-Control-Allow-Origin",
    process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  ); // replace this your actual origin
  res.headers.append(
    "Access-Control-Allow-Methods",
    process.env.ACCESS_CONTROL_ALLOW_METHODS,
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    process.env.ACCESS_CONTROL_ALLOW_HEADERS,
  );

  return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: "/api/:path*",
};
