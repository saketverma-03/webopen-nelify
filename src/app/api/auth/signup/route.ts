import { dbConnect } from "@/db/dbConfing";
import { User } from "@/db/models/userModel";
// import jwt from "jsonwebtoken";
import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

/* TODO
--
0 sigIn [post]
0 signout [delete]
--
*/

const authBodySchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

dbConnect();

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    // thorows an error if invalud req body
    authBodySchema.parse(reqBody);

    const user = await User.findOne({ email: reqBody.email });

    // verify password
    // TODO make bcrypt ps implimentation
    if (!user.password === reqBody.password)
      return NextResponse.json(
        { error: { message: "invalid email or password" } },
        { status: 401 }
      );

    // clear user password
    user.password = "";

    // create_a_jwt_token

    const secret = new TextEncoder().encode(
      "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
    );
    const alg = "HS256";

    const token = await new jose.SignJWT({ id: user.id })
      .setProtectedHeader({ alg })
      .setExpirationTime("2h")
      .sign(secret);

    // create a respone
    const res = NextResponse.json({ user }, { status: 200 });

    res.cookies.set("auth", token);

    return res;
  } catch (error: any) {
    // console.log(error);
    console.log(error.message);
    return NextResponse.json(
      { error: error, message: error.message },
      { status: 400 }
    );
  }
}

// handle logout
export async function DELETE(req: Request) {
  let res = NextResponse.next();
  res.cookies.delete("auth");
  return res;
}
