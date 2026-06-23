import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import SobreNosotros from "@/components/SobreNosotros";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />
      <HeroSearch />
      <SobreNosotros />
      <Footer />
    </main>
  );
}
