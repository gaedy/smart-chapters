"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {" "}
      {pending ? "Signing in ..." : "Sign in"}{" "}
    </Button>
  );
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-foreground border-none  shadow-none overflow-auto w-full">
        <CardHeader className="">
          <CardTitle className="text-lg md:text-xl">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <form action={action}>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  required
                  defaultValue="alice@example.com"
                  className="bg-background"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex justify-start items-center flex-wrap">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto self-start text-muted-foreground hover:text-primary text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  defaultValue="123456"
                  type="password"
                  required
                  className="bg-background"
                />
              </div>
              <div className="flex flex-col gap-3">
                <SignInButton />
                {/* <Button variant="outline" className="w-full text-sm">
                  Login with Google
                </Button> */}
              </div>

              {data && !data.success && (
                <>
                  <div className="flex justify-center items-center text-sm text-red-600">
                    {data.message}
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 text-center text-xs md:text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
