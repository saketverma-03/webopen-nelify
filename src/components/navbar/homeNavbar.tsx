"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"

export function HomeNavbar() {
  function handleLogout() {
    axios
      .delete("/api/auth/logout")
      .then(() => {
        redirect("/auth")
      })
      .catch((e) => console.log(e))
  }

  return (
    <nav className='flex w-full px-1 mb-4'>
      <div className='flex-1 font-semibold'>WebPen</div>
      <DropdownMenu>
        <DropdownMenuTrigger>{"Saket"}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/profile"}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href={"/home"}>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <span
            onClick={() => handleLogout()}
            className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-destructive hover:text-destructive-foreground'
          >
            logout
          </span>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
