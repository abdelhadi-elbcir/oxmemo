import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import VideoShowcase from "./components/VideoShowcase";
import Packs from "./components/Packs";
import OrderForm from "./components/OrderForm";
import Steps from "./components/Steps";
import FormatSection from "./components/FormatSection";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  const [selectedPack, setSelectedPack] = useState("duo");

  const navigateTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <div
        style={{
          background: "#091d34",
          color: "#cfe0f5",
          textAlign: "center",
          fontSize: 13.5,
          padding: "9px 16px",
          fontWeight: 500,
        }}
      >
        📦 Livraison gratuite partout au Maroc - Album photo de voyage{" "}
        <strong style={{ color: "#F0A83A" }}>personnalisé par IA</strong>
      </div>

      <Header onNavigate={navigateTo} />
      <Hero onNavigate={navigateTo} />
      <VideoShowcase />
      <Packs selectedPack={selectedPack} onSelectPack={setSelectedPack} onNavigate={navigateTo} />
      <OrderForm selectedPack={selectedPack} onSelectPack={setSelectedPack} />
      <Steps />
      <FormatSection />
      <Testimonials />
      <FAQ />
      <CTABanner onNavigate={navigateTo} />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
