import Link from 'next/link';

function page() {
  return (
    <div>
      Library Page
      <Link href="/book/1">Go to Book 1</Link>
    </div>
  );
}
export default page;

