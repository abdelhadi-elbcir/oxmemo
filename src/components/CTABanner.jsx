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
          <Eyebrow style={{ background: "rgba(15,42,74,0.1)", color: COLORS.navy }}>
            Prêt à immortaliser vos souvenirs ?
          </Eyebrow>
          <h2 className="font-display" style={{ color: COLORS.navyDeep, fontSize: 28, marginTop: 14 }}>
            Créez votre album OXmemo dès aujourd'hui
          </h2>
          <p style={{ marginTop: 12, fontSize: 15.5, color: "#5a3f0f" }}>
            Composition par IA, impression premium, livraison gratuite partout au Maroc.
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
