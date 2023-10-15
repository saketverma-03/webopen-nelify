import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    return NextResponse.json({ a: "Redircte herer" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
