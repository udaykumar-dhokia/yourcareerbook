import Features from "@/components/custom/Features";
import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
