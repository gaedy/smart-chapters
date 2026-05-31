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
    <AppEntryMotion className="flex h-dvh w-full flex-col">
      <div className="flex h-dvh w-full justify-between overflow-hidden bg-background">
        <div>
          <AppSidebar libraryCount={libraryCount} initialUser={initialUser} />
        </div>

        {/* main content */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] md:px-0 md:py-2 md:pr-2">
          <Navbar />
          <div className="sticky top-0 flex min-h-0 flex-1 flex-col rounded-2xl bg-foreground scrollbar-overlay sm:rounded-3xl">
            <div className="flex min-w-0 flex-col gap-4 overflow-x-hidden p-4 sm:p-5 lg:p-6">
              <MainPageTransition>{children}</MainPageTransition>
            </div>
          </div>
        </div>
      </div>
    </AppEntryMotion>
  );
}
