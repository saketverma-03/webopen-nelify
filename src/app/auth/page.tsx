"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./components/loginForm";
import CreateAccountForm from "./components/signupFrom";

export default function Auth() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full min-h-screen">
        <div className="p-4 lg:px-72 xl:px-96 pb-0 pt-6 w-screen max-w-[1440px] h-full">
          {/* <div className="lg:w-96"> */}
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Login</TabsTrigger>
              <TabsTrigger value="password">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <LoginForm />
            </TabsContent>
            <TabsContent value="password">
              <CreateAccountForm />
            </TabsContent>
          </Tabs>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
