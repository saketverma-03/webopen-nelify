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
import { Loader2 } from "lucide-react";

const NewAccountSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "must be contain atleast 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "must be contain atleast 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type UserData = {
  username: string;
  password: string;
  email: string;
};

// component
export default function CreateAccountForm() {
  const form = useForm<z.infer<typeof NewAccountSchema>>({
    resolver: zodResolver(NewAccountSchema),
    reValidateMode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (data: UserData) => {
      const { username, email, password } = data;
      return axios.put("/api/user", { email, password, username });
    },
  });

  function onSubmit(data: z.infer<typeof NewAccountSchema>) {
    const { email, password, username } = data;
    mutation.mutate({ email, password, username });
  }

  // async function createUser(email: string, password: string, username: string) {
  //   try {
  //     const res = await ;
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //     throw Error("Could not Create User");
  //   }
  // }

  return (
    <Card className="w-auto p-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  Cany name no need to be unique
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>Type the passowrd again</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            {mutation.isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
