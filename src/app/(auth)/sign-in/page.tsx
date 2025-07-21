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

  

  return (
    <div className="flex justify-between w-full h-screen gap-2 p-2 bg-background">
      <div className="flex-1 overflow-auto bg-foreground font-libre p-4 rounded-xl flex justify-center items-center">
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
