import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Smart Chapters - Sign in",
};
async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return <LoginForm />;
}

export default SignInPage;
