import { COLORS } from "../theme/colors";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";

export default function CTABanner({ onNavigate }) {
  return (
    <section style={{ padding: "0 0 88px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
            borderRadius: 26,
            padding: 50,
            textAlign: "center",
            color: COLORS.navyDeep,
          }}
        >
          <Eyebrow style={{ background: "rgba(14,61,48,0.1)", color: COLORS.navy }}>
            Prêt à immortaliser vos souvenirs ?
          </Eyebrow>
          <h2 className="font-display" style={{ color: COLORS.navyDeep, fontSize: 28, marginTop: 14 }}>
            Ne laissez pas vos plus beaux souvenirs dormir dans votre téléphone
          </h2>
          <p style={{ marginTop: 12, fontSize: 15.5, color: COLORS.navyDeep }}>
            Racontez votre histoire dans un album premium que vous aimerez feuilleter et transmettre.
          </p>
          <div style={{ marginTop: 26 }}>
            <Button variant="navy" onClick={() => onNavigate("order")}>
              Commander mon album →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
