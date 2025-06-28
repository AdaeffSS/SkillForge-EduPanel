import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value

    // Если нет accessToken и пользователь не на странице /login
    if (!accessToken && !request.nextUrl.pathname.startsWith('/login')) {
        // Формируем URL для редиректа на логин с параметром accessRefresh=1
        // и параметром redirect, равным текущему пути + query
        const loginUrl = new URL('/login', request.url)

        loginUrl.searchParams.set('accessRefresh', '1')

        // Полный путь с query, например: /some/path?param=value
        const currentPathWithQuery = request.nextUrl.pathname + request.nextUrl.search

        loginUrl.searchParams.set('redirect', currentPathWithQuery)

        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico).*)'],
}
