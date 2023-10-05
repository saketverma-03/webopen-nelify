import { NextResponse } from "next/server"

export async function DELETE(req: Request) {
    const res = NextResponse.json({}, { status: 200 })
    res.cookies.delete("auth")
    return res;
}
