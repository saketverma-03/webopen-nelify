import { stat } from "fs"
import * as jose from "jose"
import jwt from "jsonwebtoken"

import { NextRequest, NextResponse } from "next/server"

const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2",
)
const alg = "HS256"

export async function middleware(req: NextRequest) {
    /* /user */
    if (req.nextUrl.pathname.startsWith("/api/user")) {
        let a = req.headers.get("request-method")
        console.log(a)
    }

    /* /home  /clone */
    if (
        req.nextUrl.pathname.startsWith("/home") ||
        req.nextUrl.pathname.startsWith("/clone")
    ) {
        try {
            const authcookie = req.cookies.get("auth")
            // unvarifued users
            if (!authcookie) return NextResponse.redirect(new URL("/auth", req.url))

            // retrive cookies value
            const { payload } = await jose.jwtVerify(authcookie.value, secret)

            if (!payload.id) return NextResponse.redirect(new URL("/auth", req.url))

            // req.headers.set("user-id", payload.id as string);
        } catch (err: any) {
            if (err.name === "JWTExpired") {
                let res = NextResponse.redirect(new URL("/auth", req.url))
                res.cookies.delete("auth")
                return res
            }

            return NextResponse.json({ error: err })
        }
    }

    if (req.nextUrl.pathname.startsWith("/api/projects")) {
        const authcookie = req.cookies.get("auth")

        // Redirect to public project route
        if (!authcookie) {
            return NextResponse.redirect(new URL("/auth", req.url))
        }

        // retrive cookies value
        const { payload } = await jose.jwtVerify(authcookie.value, secret)

        const response = NextResponse.next()
        response.headers.append("user-id", payload.id as string)
        return response
    }
    // 2nd
    if (
        req.nextUrl.pathname.startsWith("/api/project")
        //    req.nextUrl.pathname.startsWith("/api/projects")
    ) {
        const authcookie = req.cookies.get("auth")

        // Redirect to public project route
        if (!authcookie) {
            return NextResponse.redirect(new URL("/api/public/project", req.url))
        }

        // retrive cookies value
        const { payload } = await jose.jwtVerify(authcookie.value, secret)

        const response = NextResponse.next()
        response.headers.append("user-id", payload.id as string)
        return response
    }
}
