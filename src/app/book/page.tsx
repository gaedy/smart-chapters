import Link from "next/link";

export default function BookPage() {
  return (
    <div>
      <h1>Book Section</h1>
      <p>Welcome to the book section. Here are some example books:</p>
      <ul>
        <li>
          <Link href="/book/1">Book 1</Link>
        </li>
        <li>
          <Link href="/book/2">Book 2</Link>
        </li>
      </ul>
    </div>
  );
}
