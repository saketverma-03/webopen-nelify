import { dbConnect } from "@/db/dbConfing"
import { IProject, Project } from "@/db/models/projectModel"
import { HydratedDocument } from "mongoose"
import { NextResponse } from "next/server"

/* Table of Contents
 POST: create new project
*/

dbConnect()

interface ReqBodyCreateProject {
    title: string
    discription: string
    user: string
}

// Create new project
export async function POST(request: Request) {
    try {
        const { title, discription }: Partial<ReqBodyCreateProject> =
            await request.json()
        const user = request.headers.get("user-id")
        if (title === "" && user) throw new Error(`invalid inputs`)

        const project: HydratedDocument<IProject> = new Project({
            title,
            discription,
            jsCode: "",
            cssCode: "",
            htmlCode: "",
            user,
        })

        const newProject = await project.save()
        return NextResponse.json({ project: newProject }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 })
    }
}

// Delete project by id
export async function DELETE(req: Request) {
    try {
        const reqBody = await req.json()
        const userid = req.headers.get("user-id")

        console.log(reqBody)

        // Verify if same user in jwt and project
        const { user } = await Project.findById(reqBody.id)
        if (user !== userid)
            return NextResponse.json(
                { error: "Can't delete project, owner ship conflicts " },
                { status: 400 },
            )

        // Delete process
        await Project.findByIdAndDelete(reqBody.id)
        return NextResponse.json({ message: "Deleted Succefully" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}

// Update Project

export async function PUT(request: Request) {
    try {
        const { title, discription }: Partial<ReqBodyCreateProject> =
            await request.json()
        const user = request.headers.get("user-id")
        if (title === "" && user) throw new Error(`invalid inputs`)

        const project: HydratedDocument<IProject> = new Project({
            title,
            discription,
            jsCode: "",
            cssCode: "",
            htmlCode: "",
            user,
        })

        const newProject = await project.save()
        return NextResponse.json({ project: newProject }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 })
    }
}
