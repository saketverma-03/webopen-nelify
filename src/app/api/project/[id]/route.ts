import { dbConnect } from "@/db/dbConfing"
import { Project } from "@/db/models/projectModel"
import { NextRequest, NextResponse } from "next/server"

/* Table of content
  GET: getDetails of project
  PUT: update details of project
*/

dbConnect()
export async function GET(request: NextRequest, context: any) {
  const { id } = context.params
  const userId = request.headers.get("user-id")

  if (!id)
    return NextResponse.json({ error: "no id provided" }, { status: 200 })
  try {
    // find one project
    const project = await Project.findById(id)
    let usertype = "owner"

    if (project.user !== userId?.toString()) {
      usertype = "guest"
    }

    return NextResponse.json({ project, usertype }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 200 })
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    // const reqBody = await req.json();
    const params = context.params
    const userid = req.headers.get("user-id")

    // console.log(reqBody)

    // Verify if same user in jwt and project
    const user = await Project.findById(params.id)
    if (user.user.toString() !== userid) {
      console.log(user.user !== userid)
      console.log(user.user.toString())
      console.log(userid)
      return NextResponse.json(
        {
          error: "Can't delete project, owner ship conflicts ",
          id: user.user,
          userid,
        },
        { status: 400 },
      )
    }
    // Delete process
    await Project.findByIdAndDelete(params.id)
    return NextResponse.json({ message: "Deleted Succefully" }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}

type PutReqType = {
  jsCode: string
  cssCode: string
  htmlCode: string
}

// uploading new code to database by updating project
export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params
  const { jsCode, cssCode, htmlCode }: Partial<PutReqType> =
    await request.json()
  //    console.log("htlm", htmlCode)
  // this was inferd from cookies
  const userId = request.headers.get("user-id")

  if (!id)
    return NextResponse.json({ error: "no id provided" }, { status: 200 })

  try {
    // find one project
    const project = await Project.findById(id)
    let usertype = "owner"

    if (project.user !== userId) {
      project.usertype = "guest"
    }
    const updatedProject = await Project.findByIdAndUpdate(id, {
      jsCode: jsCode,
      cssCode: cssCode,
      htmlCode: htmlCode,
    })
    return NextResponse.json({ updatedProject, usertype }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 200 })
  }
}
