import type { Metadata } from "next";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { SignoutForm } from "@/components/signout-form";

export const metadata: Metadata = {
  title: "Smart Chapters - Sign Up",
};
async function SignUpPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex justify-between w-full h-screen gap-2 p-2 bg-background">
      <div className="flex-1 overflow-auto bg-foreground font-libre p-4 rounded-xl flex justify-center items-center">
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm font-inter">
            <SignoutForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
