import { COLORS } from "../theme/colors";
import { STEPS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";

export default function Steps() {
  return (
    <section style={{ background: COLORS.mist, padding: "88px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 className="font-display" style={{ fontSize: 32, marginTop: 14, color: COLORS.navy }}>
            En 4 étapes simples
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.title} style={{ padding: "30px 22px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18 }}>
              <div
                className="font-display"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: COLORS.navy,
                  color: COLORS.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 26, marginTop: 16 }}>{s.icon}</div>
              <h4 className="font-display" style={{ fontSize: 16, marginTop: 12, color: COLORS.navy }}>
                {s.title}
              </h4>
              <p style={{ fontSize: 13.5, color: COLORS.inkSoft, marginTop: 8, lineHeight: 1.6 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
