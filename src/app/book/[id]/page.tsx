import DetailedPage from "../../../components/detailedPage";

export default function BookDetailPage({ params }: { params: { id: string } }) {
  return <DetailedPage bookId={params.id} />;
}
