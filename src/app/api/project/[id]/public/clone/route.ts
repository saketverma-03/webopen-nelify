import { Project } from "@/db/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

type ReqBody = {
  jsCode: string,
  cssCode: string,
  htmlCode: string
}

export async function PUT(request: NextRequest, context: any) {

  const { id } = context.params
  const userId = request.headers.get("user-id")
  const reqBody: Partial<ReqBody> = await request.json()
  if (id && userId)
    return NextResponse.json({ error: "auth token is expired" }, { status: 400 })


  try {
    // create new project
    const project = new Project({
      jsCode: reqBody.jsCode,
      cssCode: reqBody.cssCode,
      htmlCode: reqBody.htmlCode,
      user: userId
    })

    return NextResponse.json({ project, message: "project cloned" }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}
