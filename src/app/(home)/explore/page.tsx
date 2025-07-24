function Explore() {
  return (
    <div className="flex flex-col w-full h-full gap-10">
      <div className="flex flex-col gap-4 ">
        <p className="text-2xl font-medium">Explore New Books</p>

        <p className="">Search books, authors, or genres... </p>
      </div>

      <div className="flex flex-col gap-4">
        <p>Trending Books</p>
      </div>

      <div className="flex flex-col gap-4">
        <p>Browse By Genre</p>
      </div>

      <div className="flex flex-col gap-4">
        <p>New Releases</p>
      </div>

      <div className="flex flex-col gap-4">
        <p>Staff Picks</p>
      </div>
    </div>
  );
}
export default Explore;
