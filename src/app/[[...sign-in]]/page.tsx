"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-privatSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="flex flex-col gap-2 rounded-md bg-white p-12 shadow-2xl"
        >
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            School Management System
          </h1>
          <h2 className="text-center text-gray-400">Sign in to your account</h2>

          <Clerk.GlobalError className="text-sm text-red-400" />

          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="rounded-md p-2 ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="rounded-md p-2 ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="my-1 rounded-md bg-blue-500 p-2 text-white"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
