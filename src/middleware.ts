import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import User from './models/userModel';
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname;
    const token = request.cookies.get("jwttoken")?.value;
    if(!token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
  ],
}