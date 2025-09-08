import { auth } from "auth";

export default async function StatsPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to view Stats</p>;
  }

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">Statistics & Progress</p>
        <p className="">Search books, authors, or genres...</p>
      </div>
    </div>
  );
}
