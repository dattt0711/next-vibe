import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-(--color-bg)">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
