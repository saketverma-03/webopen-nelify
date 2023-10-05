import { dbConnect } from "@/db/dbConfing";
import { IUser, User } from "@/db/models/userModel";
import * as jose from "jose";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

/* TODO
0 createUser [PUT]
0 delteUser [DELETE]
0 getUser [GET]
0 updateUser [PUT]
*/

const userSchema = z.object({
  username: z.string().min(1, { message: "userName is Required" }),
  email: z.string().email({ message: "Please Give a valid Email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

dbConnect();

// Get user
const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

export async function GET(req: NextRequest) {
  try {
    const authcookie = req.cookies.get("auth");
    if (!authcookie) {
      throw new Error("No auth cookie");
    }
    const { payload } = await jose.jwtVerify(authcookie.value, secret);
    const user = await User.findById(payload.id);
    user.password = "";
    user._id = "";
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

// Create User
export async function PUT(req: Request) {
  try {
    const reqBody: Partial<z.infer<typeof userSchema>> = await req.json();

    // checking for valid reqBody
    if (!userSchema.safeParse(reqBody).success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Create a new user
    const newUser: HydratedDocument<IUser> = new User({
      username: reqBody.username,
      email: reqBody.email,
      password: reqBody.password,
    });

    // save to database
    const user = await newUser.save();

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

// Delete User
export async function DELETE(request: Request) {
  try {
    const reqBody: { id: Partial<string> } = await request.json();

    const res = await User.findByIdAndDelete(reqBody.id);
    res.password = "********";
    return NextResponse.json({ res: res }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
