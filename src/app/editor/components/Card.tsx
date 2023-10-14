import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Loader2Icon, Share, Share2, ShareIcon } from "lucide-react"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
type props = {
  title: string
  discription: string
  id: string
  isPublic: boolean
  createdAt?: string
}

export default function CardComponent({
  title,
  discription,
  id,
  isPublic,
  createdAt,
}: props) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (data: { id: string }) => {
      const res = await axios.delete(`/api/project/${data.id}`)
      return res?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  })

  // use this to hadnel isPublic state
  const [isChecked, setChecked] = useState(isPublic)

  const pathname = usePathname()
  // mutaion for isPublic
  const mutatePublic = useMutation({
    mutationFn: async (data: { isChecked: boolean }) => {
      setChecked(() => !isChecked)
      console.log(data)
      const res = await axios.put(`/api/project/${id}/changepublic`, { isPublic: isChecked })
      return res.data
    },
    onError: () => setChecked(false),
    onSuccess: (data) => {
      setChecked(data.isPublic)
    }
  })

  // hadnleChecked toggle
  useEffect(() => {
    console.log(isChecked)
  }, [isChecked])

  return (
    <>
      <Card className='w-full hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'>
        <CardHeader className="flex flex-row" >
          <Link href={`/editor/${id}`} className="flex-1">

            <h1 className='font-semibold'>{title}</h1>
            <span className='text-sm text-gray-400'>
              {" "}
              Created at {createdAt}
            </span>
          </Link>
          <span>
            {mutatePublic.isLoading ? <Loader2Icon className="animate-spin" /> : isChecked && <Share2
              onClick={() => { navigator.clipboard.writeText(`${pathname}/editor/${id}`) }}
            />}
          </span>
        </CardHeader>
        <Link href={`/editor/${id}`}>

          <CardContent>
            <CardDescription>{discription}</CardDescription>
          </CardContent>
        </Link>
        <CardFooter className='justify-between'>
          <Label className='flex text-center items-center gap-1'>
            <Switch
              checked={isChecked}
              onCheckedChange={(isChecked) => mutatePublic.mutate({ isChecked })}
            />
            Public {JSON.stringify(isPublic)}
          </Label>
          <Button
            className='hover:bg-destructive hover:text-destructive-foreground'
            variant={"outline"}
            onClick={() => mutate({ id })}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
