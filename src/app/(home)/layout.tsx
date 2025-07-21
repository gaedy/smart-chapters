import Sidebar from "@/components/Sidebar/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between w-full h-screen gap-2 p-2 bg-background">
      <Sidebar />
      {/* main content */}
      <div className="flex-1 overflow-auto bg-foreground font-libre p-4 rounded-xl">
        {children}
      </div>
    </div>
  );
}
