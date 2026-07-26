import { COLORS } from "../theme/colors";
import Eyebrow from "./ui/Eyebrow";

export default function FormatSection() {
  return (
    <section style={{ padding: "88px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <Eyebrow>Format</Eyebrow>
          <h2 className="font-display" style={{ fontSize: 32, marginTop: 14, color: COLORS.navy }}>
            Format du livre photo
          </h2>
        </div>
        <div
          className="flex flex-wrap items-center justify-center gap-10"
          style={{ borderRadius: 24, overflow: "hidden", background: `linear-gradient(135deg, ${COLORS.navy}, #173a5e)`, padding: 50 }}
        >
          <div
            style={{
              width: 200,
              aspectRatio: "3/4",
              background: COLORS.white,
              borderRadius: 8,
              boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <div className="font-display" style={{ fontWeight: 800, fontSize: 15, color: COLORS.navy }}>
              OXmemo
            </div>
            <div>
              <div style={{ height: 6, width: "70%", background: COLORS.mist, borderRadius: 3, marginBottom: 8 }} />
              <div style={{ height: 6, width: "50%", background: COLORS.mist, borderRadius: 3 }} />
            </div>
          </div>
          <div style={{ color: "#b9cbe1", fontSize: 14, maxWidth: 280, lineHeight: 1.7 }}>
            <strong className="font-display" style={{ color: COLORS.gold, display: "block", fontSize: 17, marginBottom: 8 }}>
              21 × 21 cm — couverture rigide
            </strong>
            Papier photo mat premium 250g, reliure cousue, jusqu'à 50 pages extensibles à volonté (8 MAD/page
            supplémentaire).
          </div>
        </div>
      </div>
    </section>
  );
}
