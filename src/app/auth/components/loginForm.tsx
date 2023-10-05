"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "must be contain atleast 8 characters" }),
});

// Component
export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    reValidateMode: "onBlur",
  });

  const { mutate, isLoading, isError, data, isSuccess } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      let res = await axios.post("/api/auth/signup", data);
      return res.data;
    },
  });
  function onSubmit(data: z.infer<typeof LoginSchema>) {
    mutate(data);
  }

  useEffect(() => {
    if (isSuccess) {
      redirect("/home");
    }
  }, [isSuccess]);

  return (
    <Card className="w-auto p-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>Length must be 8 or more </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
