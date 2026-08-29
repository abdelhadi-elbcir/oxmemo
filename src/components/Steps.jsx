import { COLORS } from "../theme/colors";
import { STEPS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";
import { ClipboardCheck, Images, PackageCheck, WandSparkles } from "lucide-react";

const STEP_ICONS = [ClipboardCheck, Images, WandSparkles, PackageCheck];

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
          {STEPS.map((s, i) => {
            const Icon = STEP_ICONS[i];

            return (
            <div key={s.title} style={{ position: "relative", padding: "30px 22px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18, boxShadow: "0 18px 40px -32px rgba(15, 46, 36, .55)" }}>
              <div
                className="font-display"
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  background: COLORS.navy,
                  color: COLORS.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 12,
                  boxShadow: `0 5px 14px rgba(15, 46, 36, .25)`,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.navy,
                  background: `linear-gradient(145deg, rgba(193,155,85,.28), rgba(193,155,85,.08))`,
                  border: `1px solid rgba(193,155,85,.42)`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.8), 0 12px 24px -16px rgba(193,155,85,.9)",
                }}
              >
                <Icon size={31} strokeWidth={1.9} />
              </div>
              <h4 className="font-display" style={{ fontSize: 16, marginTop: 18, color: COLORS.navy }}>
                {s.title}
              </h4>
              <p style={{ fontSize: 13.5, color: COLORS.inkSoft, marginTop: 8, lineHeight: 1.6 }}>{s.text}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
