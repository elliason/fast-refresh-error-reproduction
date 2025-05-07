import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const requestPath = request.headers.get('X-Request-Path');
    //console.log('requestPath', requestPath);

    const correlationID = request.headers.get('X-Correlation-Id');
    //console.log('correlationID', correlationID);

    // TODO: CSP headers (https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
    // set some headers for all requests
    const response = NextResponse.next();
    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
