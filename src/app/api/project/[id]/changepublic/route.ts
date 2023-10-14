import { Project } from "@/db/models/projectModel"
import { NextResponse } from "next/server"

type Params = {
  id: string
}

// type


export async function PUT(req: Request, context) {
  const params = context.params
  const { isPublic } = await req.json()

  try {
    const res = await Project.findByIdAndUpdate(params.id, {
      isPublic: isPublic,
    })
    return NextResponse.json({ isPublic: !isPublic }, { status: 200 })
  } catch (e: any) {

    return NextResponse.json({ error: e, message: e?.message, id: context }, { status: 400 })
  }
}
