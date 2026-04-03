import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full bg-duckie-bg">
      {/* Desktop header */}
      <div className="hidden md:block">
        <Header />
      </div>
      {/* Mobile header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {children}
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
}
