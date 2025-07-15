import Image from "next/image";

interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string  // Optional coverUrl to allow for static images
}

export default function BookCard({ title, author, coverUrl }: BookCardProps) {
  return (
    <div className="flex flex-col items-center p-2 border rounded-lg w-40 bg-white">
      <Image src={coverUrl} alt={title} width={120} height={180} className="rounded" />
      <p className="mt-2 text-sm font-semibold text-center">{title}</p>
      <p className="text-xs text-gray-500 text-center">{author}</p>
    </div>
  );
}
