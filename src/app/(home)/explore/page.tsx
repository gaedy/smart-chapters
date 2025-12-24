import { auth } from "../../../../auth";
import ExploreBooks from "./ExploreBooks";

export default async function ExplorePage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to view Books.</p>;
  }

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">Explore New Books</p>
        <p className="">Search books, authors, or genres...</p>
      </div>

      {/* <ExploreBooks /> */}
    </div>
  );
}
