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
import { AnimatePresence, motion } from "motion/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

const SignInButton = ({ pending }: { pending: boolean }) => {
  return (
    <Button disabled={pending} className="relative overflow-hidden">
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Signing in
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { update } = useSession();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const callbackParam = new URLSearchParams(window.location.search).get(
      "callbackUrl",
    );
    const callbackUrl = callbackParam?.startsWith("/") ? callbackParam : "/";

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl,
    });

    if (result?.error || !result?.ok) {
      setMessage("Invalid email or password");
      setIsSubmitting(false);
      return;
    }

    setIsTransitioning(true);
    await update();
    const resultUrl = result.url
      ? new URL(result.url, window.location.origin)
      : null;
    const destination =
      resultUrl?.origin === window.location.origin
        ? `${resultUrl.pathname}${resultUrl.search}${resultUrl.hash}`
        : callbackUrl;

    window.setTimeout(() => {
      router.replace(destination);
    }, 220);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <AnimatePresence initial={false}>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="h-1.5 w-40 overflow-hidden rounded-full bg-foreground-dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="h-full origin-left rounded-full bg-theme-accent"
                initial={{ scaleX: 0.28 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="bg-foreground border-none shadow-none overflow-auto w-full">
        <CardHeader className="">
          <CardTitle className="text-lg md:text-xl">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit}>
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
                <SignInButton pending={isSubmitting} />
                {/* <Button variant="outline" className="w-full text-sm">
                  Login with Google
                </Button> */}
              </div>

              {message && (
                <>
                  <div className="flex justify-center items-center text-sm text-red-600">
                    {message}
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
