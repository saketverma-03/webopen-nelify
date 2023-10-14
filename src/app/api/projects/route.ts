import { dbConnect } from "@/db/dbConfing";
import { Project } from "@/db/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function GET(req: NextRequest) {
  try {
    const user = req.headers.get("user-id");
    if (!user) throw Error("invalid cookie, User is required");
    let projects = await Project.find({
      user: user,
    });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err, message: err?.message },
      { status: 400 }
    );
  }
}
