import Navbar from "@/components/NavBar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { AppEntryMotion } from "@/components/auth/app-entry-motion";
import { MainPageTransition } from "@/components/auth/main-page-transition";
import { getUserBookCounts } from "@/lib/data/book.data";
import { auth } from "../../../auth";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const libraryCount = session?.user?.id
    ? (await getUserBookCounts(session.user.id)).TOTAL
    : 0;
  const initialUser = {
    name: session?.user?.name ?? "Guest",
    email: session?.user?.email ?? "guest@example.com",
    avatar: session?.user?.image ?? "/avatar.jpg",
  };

  return (
    <AppEntryMotion className="flex h-screen w-full flex-col">
      <div className="flex justify-between w-full h-screen overflow-hidden bg-background ">
        <div>
          <AppSidebar libraryCount={libraryCount} initialUser={initialUser} />
        </div>

        {/* main content */}
        <div className="flex flex-col gap-2  flex-1 py-2 md:py-2 md:pr-2 md:px-0 px-2 overflow-hidden">
          <Navbar />
          <div className="sticky top-0 bg-foreground rounded-3xl flex-1 flex flex-col scrollbar-overlay">
            <div className="p-6 flex flex-col gap-4 overflow-x-hidden">
              <MainPageTransition>{children}</MainPageTransition>
            </div>
          </div>
        </div>
      </div>
    </AppEntryMotion>
  );
}
