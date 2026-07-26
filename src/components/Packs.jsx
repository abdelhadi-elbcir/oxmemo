import { Check, CreditCard, Award, Truck, Star } from "lucide-react";
import { COLORS } from "../theme/colors";
import { PACKS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";

const TRUST_ITEMS = [
  { Icon: CreditCard, title: "Paiement à la livraison", text: "Payez uniquement à réception" },
  { Icon: Award, title: "Qualité premium", text: "Impression professionnelle" },
  { Icon: Truck, title: "Livraison gratuite", text: "Partout au Maroc en 5–7 jours" },
  { Icon: Star, title: "Imprimé au Maroc", text: "Savoir-faire local depuis 2024" },
];

export default function Packs({ selectedPack, onSelectPack, onNavigate }) {
  return (
    <section id="packs" style={{ background: COLORS.mist, padding: "88px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <Eyebrow>Nos formules</Eyebrow>
          <h2 className="font-display" style={{ fontSize: 32, marginTop: 14, color: COLORS.navy }}>
            Choisissez votre pack
          </h2>
          <p style={{ color: COLORS.inkSoft, marginTop: 12, fontSize: 16 }}>
            Une formule pour chaque souvenir — seul, à deux, ou en famille.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              style={{
                position: "relative",
                border: `1.5px solid ${pack.popular ? COLORS.gold : COLORS.border}`,
                borderRadius: 20,
                background: COLORS.white,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: pack.popular ? "0 25px 50px -25px rgba(240,168,58,0.45)" : "none",
              }}
            >
              {pack.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: COLORS.gold,
                    color: COLORS.navyDeep,
                    fontSize: 11.5,
                    fontWeight: 800,
                    padding: "6px 12px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    zIndex: 2,
                  }}
                >
                  Le plus populaire
                </div>
              )}
              <div style={{ aspectRatio: "16/11", overflow: "hidden", background: COLORS.mist }}>
                <img src={pack.img} alt={pack.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "26px 26px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 className="font-display" style={{ fontSize: 21, color: COLORS.navy }}>
                  {pack.name}
                </h3>
                <p style={{ color: COLORS.inkSoft, fontSize: 14, marginTop: 6 }}>{pack.tagline}</p>
                <div className="font-display" style={{ fontSize: 32, fontWeight: 800, marginTop: 16, color: COLORS.navy }}>
                  {pack.price} MAD
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {pack.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 14.5 }}>
                      <Check size={16} color={COLORS.ocean} strokeWidth={3} style={{ marginTop: 2, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pack.popular ? "primary" : "navy"}
                  style={{ marginTop: "auto", width: "100%" }}
                  onClick={() => {
                    onSelectPack(pack.id);
                    onNavigate("order");
                  }}
                >
                  Choisir {pack.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ marginTop: 60 }}>
          {TRUST_ITEMS.map(({ Icon, title, text }) => (
            <div
              key={title}
              style={{ textAlign: "center", padding: "22px 14px", borderRadius: 16, background: COLORS.white, border: `1px solid ${COLORS.border}` }}
            >
              <Icon size={26} color={COLORS.ocean} style={{ margin: "0 auto" }} />
              <h4 className="font-display" style={{ fontSize: 15, marginTop: 10, color: COLORS.navy }}>
                {title}
              </h4>
              <p style={{ fontSize: 13, color: COLORS.inkSoft, marginTop: 5 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
