"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

const inputSchema = z.object({
  title: z.string().min(1, { message: "Name is Required" }),
  discription: z.string().optional(),
});

/* COMPONENT */
export default function CreateCard() {
  //  hooks and states
  const queryClinet = useQueryClient();

  const { mutate, data, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (inputs: z.infer<typeof inputSchema>) => {
      return axios.post("/api/project", { ...inputs });
    },
    onSuccess: () => queryClinet.invalidateQueries({ queryKey: ["projects"] }),
  });

  //   Form-hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
  });

  // useEffect do something when project is created
  useEffect(() => {
    if (!isError) console.log(data);
  }, [isSuccess]);

  function handleFormSubmit(data: z.infer<typeof inputSchema>) {
    try {
      mutate(data);
    } catch (error: any) {
      console.log(error);
      alert("Failed in Creating Project");
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Card className="p-8 w-fit hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
            <CardTitle className="text-gray-800">Create New</CardTitle>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="grid gap-4 mt-5"
          >
            <div className="grid items-center grid-cols-4 gap-4">
              <Label className="text-right">Name</Label>

              <Input
                {...register("title")}
                className="col-span-3"
                placeholder="Name"
              />
            </div>
            <span className="text-destructive text-right">
              {errors.title?.message}
            </span>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label className="text-right">Discription</Label>
              <Input
                {...register("discription")}
                className="col-span-3"
                placeholder="Name"
              />
            </div>
            <span className="text-destructive text-right">
              {errors.discription?.message}
            </span>
            <DialogFooter>
              <Button>{isLoading ? "Creating ...." : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
