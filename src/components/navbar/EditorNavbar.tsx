"use client"

import { cssCode, editorFontSize, htmlCode, jsCode, projUserType } from "@/store"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useAtom } from "jotai"
import { Cloud, MinusIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { ProjUserType } from "@/types"
/*  TODO
 *
 *  save to cloud
 *
 *
 * */
export function EditorNavbar({ projId }: { projId: string }) {
  function handleLogout() {
    axios
      .delete("/api/auth/logout")
      .then(() => {
        redirect("/auth")
      })
      .catch((e) => console.log(e))
  }

  const [js] = useAtom(jsCode)
  const [css] = useAtom(cssCode)
  const [html] = useAtom(htmlCode)
  const [, setFontSize] = useAtom(editorFontSize)
  const [userType] = useAtom(projUserType)
  const [size, setSize] = useState(0)
  // save to cloud functionality
  const saveToCloud = useMutation({
    mutationFn: async (data: { jsCode: string, cssCode: string, htmlCode: string }) => {
      const res = await axios.put(`/api/project/${projId}`, data)
      return res.data
    },
  })


  const cloneToCloud = useMutation({
    mutationFn: async (data: { jsCode: string, cssCode: string, htmlCode: string }) => {
      const res = await axios.put(`/api/project/${projId}`, data)
      return res.data
    },
  })

  function handleSaveToCloude() {
    saveToCloud.mutate({ jsCode: js, cssCode: css, htmlCode: html })
  }

  function hadnleClonePRoject() {
    cloneToCloud.mutate({ jsCode: js, cssCode: css, htmlCode: html })
  }

  useEffect(() => {

    setFontSize({ '--e-font-size': `calc(1rem + ${size}px)` })

  }
    , [size])

  function ActionForUser({ userType }: { userType: ProjUserType }) {
    // console.log(userType)
    if (userType === "owner")
      return <Button onClick={handleSaveToCloude} className='gap-2' variant={"ghost"}>
        {saveToCloud.isLoading ? "Uploading.." : "Save"} <Cloud />
      </Button>

    if (userType === "unauth")
      return <Button onClick={handleSaveToCloude} className='gap-2' variant={"ghost"}>
        Login to Save <Cloud />
      </Button>
    if (userType === "guest")
      return <Button onClick={handleSaveToCloude} className='gap-2' variant={"ghost"}>
        {cloneToCloud.isLoading ? "Uploading.." : "Clone"} <Cloud />
      </Button>
  }

  return (
    <nav className='text-white flex w-full p-1 pl-4 items-center bg-gray-800'>
      <Link href={"/home"} className='flex-1 font-semibold'>
        <div>WebPen</div>
      </Link>
      <div className="flex items-center justify-center" >
        <Button className="" onClick={() => setSize(() => size - 1)} variant={"ghost"} ><MinusIcon /> </Button>
        <Button className="" onClick={() => setSize(0)} variant={"ghost"} > {size}</Button>
        <Button className="" onClick={() => setSize(() => size + 1)} variant={"ghost"}><PlusIcon /> </Button>
      </div>
      <ActionForUser userType={userType} />
    </nav>
  )
}
