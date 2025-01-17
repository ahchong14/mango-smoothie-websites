import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get hostname (e.g. mangosmoothie.com, www.mangosmoothie.com)
  const hostname = request.headers.get('host') || 'mangosmoothie.com'
  const isWWW = hostname.startsWith('www.')
  const isProd = process.env.NODE_ENV === 'production'

  // Redirect non-www to www in production
  if (isProd && !isWWW) {
    return NextResponse.redirect(
      `https://www.${hostname}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    )
  }

  // Force HTTPS in production
  if (isProd && !request.nextUrl.protocol.includes('https')) {
    return NextResponse.redirect(
      `https://${hostname}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
  ],
}

