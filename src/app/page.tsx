import BookCard from "@/components/BookCard";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex flex-col gap-4 ">
          <p className="text-2xl font-medium">Welcome Back, Ahmed!</p>
          <p className="">Ready to dive into your next adventure? </p>
        </div>

        <div className="flex flex-col gap-4">
          <p>Currently Reading</p>

          <div className="flex gap-4 ">
            <BookCard />
            <BookCard />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Books You Might Like</p>

          <div className="flex gap-4 ">
            <BookCard />
            <BookCard />
          </div>
        </div>
      </div>
    </>
  );
}
