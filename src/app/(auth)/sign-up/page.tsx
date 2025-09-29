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
    
            <SignoutForm />
     
  );
}

export default SignUpPage;
