import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const method = request.method;
    const pathname = request.nextUrl.pathname;
    
    // Log every incoming request. We use console.log here because Next.js middleware 
    // runs in the Edge runtime, where some Node.js specific logger configurations might fail.
    console.log(`[SERVER_LOG] ${method} ${pathname}`);
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
