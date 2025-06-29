import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value

    if (!accessToken && !request.nextUrl.pathname.startsWith('/login')) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('accessRefresh', '1')
        const currentPathWithQuery = request.nextUrl.pathname + request.nextUrl.search
        loginUrl.searchParams.set('redirect', currentPathWithQuery)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico).*)'],
}
