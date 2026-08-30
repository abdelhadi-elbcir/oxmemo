import { Instagram, Facebook, MessageCircle, MapPin, Phone } from "lucide-react";
import { COLORS } from "../theme/colors";

const socialIconStyle = {
  width: 36,
  height: 36,
  borderRadius: 10,
  background: "rgba(255,255,255,0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#B4C9B9",
};

const footerLinkStyle = {
  display: "block",
  fontSize: 14,
  color: "#B4C9B9",
  marginBottom: 11,
};

const COLUMNS = [
  { title: "Produit", links: ["Album photo Maroc", "Prix", "Album de voyage", "Album de naissance"] },
  { title: "Explorer", links: ["Destinations", "Événements", "Blog", "Contact"] },
  { title: "Support", links: ["FAQ", "Commander", "Conditions générales", "Politique de confidentialité"] },
];

export default function Footer() {
  return (
    <footer id="footer" style={{ background: COLORS.navyDeep, color: "#B4C9B9", padding: "64px 0 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          style={{ paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                background: COLORS.white,
                borderRadius: 10,
                padding: "8px 14px",
              }}
            >
              <img src="/logo-600.png" alt="OxMemo" style={{ height: 52, width: "auto", display: "block" }} />
            </div>
            <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Vos souvenirs précieux méritent un écrin d'exception. Albums photo personnalisés, imprimés au Maroc.
            </p>
            <div style={{ display: "grid", gap: 9, marginTop: 18, fontSize: 13.5 }}>
              <a href="tel:+212784781570" style={{ display: "flex", alignItems: "center", gap: 9, color: "#DCEAE0", textDecoration: "none" }}>
                <Phone size={16} color={COLORS.gold} /> +212 784-781570
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 9, color: "#DCEAE0" }}>
                <MapPin size={16} color={COLORS.gold} /> Marrakech, Maroc
              </div>
            </div>
            <div className="flex gap-2.5" style={{ marginTop: 20 }}>
              <a href="#" style={socialIconStyle}>
                <Instagram size={16} />
              </a>
              <a href="https://wa.me/212784781570" target="_blank" rel="noreferrer" aria-label="Contacter OXmemo sur WhatsApp" style={socialIconStyle}>
                <MessageCircle size={16} />
              </a>
              <a href="#" style={socialIconStyle}>
                <Facebook size={16} />
              </a>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5
                className="font-display"
                style={{ color: COLORS.white, fontSize: 14, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.03em" }}
              >
                {col.title}
              </h5>
              {col.links.map((l) => (
                <a key={l} href="#" style={footerLinkStyle}>
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-2.5" style={{ paddingTop: 26, fontSize: 13 }}>
          <span>© 2026 OXmemo. Tous droits réservés.</span>
          <span>Fait avec ♥ au Maroc</span>
        </div>
      </div>
    </footer>
  );
}
