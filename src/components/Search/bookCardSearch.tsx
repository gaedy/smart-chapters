import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
// import h from "/public/h.jpg"; // fallback image

export type SearchResultCardProps = {
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl: string | null;
  };
  href?: string;
  onClick?: () => void;
};

const BookCardSearch: FC<SearchResultCardProps> = ({ book, href, onClick }) => {
  const content = (
    <div
      className="flex gap-2 p-2 border border-border cursor-pointer rounded-md hover:bg-background"
      onClick={onClick}
    >
      <div className="flex justify-center rounded-md items-center">
        <Image
          className="rounded-md"
          src={book.coverUrl || "h"}
          alt={book.title}
          width={48}
          height={64}
        />
      </div>
      <div className="flex flex-col">
        <p>{book.title}</p>
        <p>{book.author}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default BookCardSearch;
