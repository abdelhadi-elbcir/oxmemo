import { Check } from "lucide-react";
import { COLORS } from "../theme/colors";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";

const ALBUM_CARDS = [
  {
    label: "MARRAKECH",
    sub: "Été 2026",
    style: {
      transform: "rotate(-9deg) translate(-38px,10px)",
      opacity: 0.75,
      zIndex: 1,
      background: "linear-gradient(155deg,#1B4636,#0E3D30)",
    },
  },
  {
    label: "CHEFCHAOUEN",
    sub: "Duo · 48 pages",
    style: {
      transform: "rotate(6deg) translate(30px,-8px)",
      opacity: 0.9,
      zIndex: 2,
      background: "linear-gradient(155deg,#1B4636,#0E3D30)",
    },
  },
  {
    label: "DAKHLA",
    sub: "Solo · 50 pages",
    style: { zIndex: 3, background: "linear-gradient(155deg,#2C6B54,#0D3226)" },
  },
];

export default function Hero({ onNavigate }) {
  return (
    <section
      id="hero"
      style={{
        background: `radial-gradient(1200px 500px at 15% -10%, rgba(31,110,88,0.22), transparent), linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navy} 60%, #0A3226 100%)`,
        color: COLORS.white,
        padding: "70px 0 88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="grid md:grid-cols-2 gap-12 items-center"
        style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}
      >
        <div>
          <Eyebrow style={{ background: "rgba(193,155,85,0.15)" }}>✦ Album photo de voyage personnalisé</Eyebrow>
          <h1
            className="font-display"
            style={{ color: COLORS.white, fontSize: 44, lineHeight: 1.1, marginTop: 20, letterSpacing: "-0.01em" }}
          >
            Vos souvenirs méritent
            <br />
            un écrin d'<span style={{ color: COLORS.gold }}>exception</span>
          </h1>
          <p style={{ fontSize: 17.5, color: "#D2E3D6", marginTop: 20, maxWidth: 460 }}>
            Des albums photo premium, façonnés au Maroc. Capturez vos moments précieux dans un livre qui dure toute
            une vie.
          </p>
          <div className="flex flex-wrap gap-3.5" style={{ marginTop: 32 }}>
            <Button onClick={() => onNavigate("order")}>Commander mon album →</Button>
            <Button variant="outline" onClick={() => onNavigate("packs")}>
              Destinations & Events
            </Button>
          </div>
          <div className="flex flex-wrap gap-5" style={{ marginTop: 34 }}>
            {["Imprimé au Maroc", "Livraison gratuite", "Composition par IA"].map((t) => (
              <span key={t} style={{ fontSize: 13.5, color: "#A9C2AE", display: "flex", alignItems: "center", gap: 7 }}>
                <Check size={14} color={COLORS.gold} strokeWidth={3} /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="order-first md:order-last" style={{ maxWidth: 380, margin: "0 auto", width: "100%" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: 22,
              background: "linear-gradient(160deg,#153F30,#08201A)",
              boxShadow: "0 40px 80px -30px rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {ALBUM_CARDS.map((c, i) => (
              <div
                key={c.label}
                style={{
                  position: "absolute",
                  width: "64%",
                  aspectRatio: "3/4",
                  borderRadius: 16,
                  boxShadow: "0 25px 50px -18px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 22,
                  top: "50%",
                  left: "50%",
                  translate: "-50% -50%",
                  ...c.style,
                }}
              >
                {i === 2 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: COLORS.gold,
                      boxShadow: "0 6px 14px rgba(193,155,85,0.5)",
                    }}
                  />
                )}
                <div className="font-display" style={{ fontWeight: 700, color: COLORS.white, fontSize: 14 }}>
                  {c.label}
                </div>
                <div style={{ color: "#B4C9B9", fontSize: 11.5, marginTop: 4 }}>{c.sub}</div>
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                bottom: -14,
                left: "50%",
                transform: "translateX(-50%)",
                background: COLORS.gold,
                color: COLORS.navyDeep,
                fontWeight: 700,
                fontSize: 12.5,
                padding: "7px 16px",
                borderRadius: 999,
                boxShadow: "0 10px 20px -6px rgba(193,155,85,0.6)",
                whiteSpace: "nowrap",
                zIndex: 4,
              }}
            >
              ✎ Composé par IA en 2 min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
