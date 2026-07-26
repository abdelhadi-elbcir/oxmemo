import { COLORS } from "../theme/colors";
import { TESTIMONIALS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";

export default function Testimonials() {
  return (
    <section style={{ background: COLORS.mist, padding: "88px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <Eyebrow>Avis clients</Eyebrow>
          <h2 className="font-display" style={{ fontSize: 32, marginTop: 14, color: COLORS.navy }}>
            Ce que disent nos clients
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ color: COLORS.gold, fontSize: 14, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontSize: 14, color: COLORS.ink, lineHeight: 1.6, flex: 1 }}>"{t.quote}"</p>
              <div className="flex items-center gap-2.5" style={{ marginTop: 4 }}>
                <div
                  className="font-display"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.ocean}, ${COLORS.navy})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.white,
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: COLORS.inkSoft }}>{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
