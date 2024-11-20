import ContentsGrid from "./_components/contents-grid";
import CreateContentButton from "./_components/create-content-button";

export default function Home() {
  return (
    <div className="relative min-h-screen p-4">
      <ContentsGrid />
      <CreateContentButton />
    </div>
  );
}
