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

  try {
    // find one project
    const project = await Project.findById(id)
    if (project.isPublic === true)
      return NextResponse.json({ project, usertype: "unauth" }, { status: 200 })
    else
      return NextResponse.json({ error: "Trying to access private repo", context }, { status: 400 })
    //      throw Error("Trying to access Private repo")
  } catch (err) {
    return NextResponse.json({ error: err, context }, { status: 400 })
  }
}

