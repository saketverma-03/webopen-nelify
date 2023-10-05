import { dbConnect } from "@/db/dbConfing";
import { User } from "@/db/models/userModel";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

type RequestBody = {
  userId: string;
};

// opening a connection
dbConnect();

export async function GET(request: Request, context: any) {
  try {
    const { userid } = context.params;
    const user = await User.findById(userid);
    user.password = "****";
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

// Create a new user
export async function POST(request: Request) {}
