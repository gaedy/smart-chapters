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
import { signUpUser } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {" "}
      {pending ? "Submitting ..." : "Sign up"}{" "}
    </Button>
  );
};

export function SignoutForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-foreground border-none  shadow-none overflow-auto w-full">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your information below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alice bob"
                  required
                  className="bg-background"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  required
                  className="bg-background"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required className="bg-background" />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="bg-background"
                />
              </div>

              <div className="flex flex-col gap-3">
                <SignUpButton />
                {/* <Button variant="outline" className="w-full">
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
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
