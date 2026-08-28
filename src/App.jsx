import { useEffect, useState } from "react";
import { COLORS } from "./theme/colors";
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
import DashboardApp from "./dashboard/DashboardApp";
import Blog from "./components/Blog";

function pageFromPath() {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
  if (path === "/user/dashboard") return "dashboard";
  if (path === "/commande") return "order";
  if (path === "/blog") return "blog";
  if (path.startsWith("/blog/")) return path.slice(1);
  return "home";
}

export default function App() {
  const [selectedPack, setSelectedPack] = useState("duo");
  const [page, setPage] = useState(pageFromPath);

  useEffect(() => {
    const handlePopState = () => {
      setPage(pageFromPath());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (id) => {
    if (id === "blog" || id.startsWith("blog/")) {
      window.history.pushState({}, "", `/${id}`);
      setPage(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "order") {
      window.history.pushState({}, "", "/commande");
      setPage("order");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (page !== "home") {
      window.history.pushState({}, "", "/");
      setPage("home");
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (page === "dashboard") {
    return <DashboardApp />;
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <div
        style={{
          background: COLORS.navyDeep,
          color: "#DCEAE0",
          textAlign: "center",
          fontSize: 13.5,
          padding: "9px 16px",
          fontWeight: 500,
        }}
      >
        📦 Livraison gratuite partout au Maroc - Album photo de voyage{" "}
        <strong style={{ color: COLORS.gold }}>créé avec soin</strong>
      </div>

      <Header onNavigate={navigateTo} />

      {page === "home" ? (
        <>
          <Hero onNavigate={navigateTo} />
          <VideoShowcase />
          <Packs selectedPack={selectedPack} onSelectPack={setSelectedPack} onNavigate={navigateTo} />
          <Steps />
          <FormatSection />
          <Testimonials />
          <FAQ />
          <CTABanner onNavigate={navigateTo} />
        </>
      ) : page === "order" ? (
        <main style={{ minHeight: "calc(100vh - 160px)", background: `linear-gradient(180deg, ${COLORS.mist}, #fff 70%)` }}>
          <OrderForm selectedPack={selectedPack} onSelectPack={setSelectedPack} />
        </main>
      ) : (
        <Blog slug={page.startsWith("blog/") ? page.slice(5) : null} onNavigate={navigateTo} />
      )}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
