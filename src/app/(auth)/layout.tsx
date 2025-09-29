import Logo from "@/components/ui/Logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center ">
      {/* <Logo /> */}

      <div
        className="flex bg-background justify-center items-center 
      font-inter w-full gap-2 p-2 md:p-4"
      >
        <div className="flex w-full max-w-5xl md:flex-row flex-col h-fit bg-foreground p-4 md:p-6 rounded-2xl md:rounded-3xl gap-4 md:gap-6">
          <div className="w-full md:w-5/12">{children}</div>
          <div className="w-full md:w-7/12 hidden md:block rounded-xl md:rounded-2xl overflow-hidden relative">
            <Image
              src="/image1.jpg"
              alt="auth"
              width={2400}
              height={1800}
              className="w-full h-full object-cover rounded-xl"
              quality={95}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* <div className="absolute font-merriweather inset-0 bg-black/40 flex items-start p-4 justify-start rounded-xl">
              <h1 className="text-primary text-2xl md:text-3xl font-bold">
                Smart Chapters
              </h1>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
