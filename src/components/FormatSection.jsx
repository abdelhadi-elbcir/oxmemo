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
          className="grid grid-cols-1 lg:grid-cols-5"
          style={{ borderRadius: 24, overflow: "hidden", background: COLORS.navy, boxShadow: "0 28px 65px -38px rgba(15,46,36,.65)" }}
        >
          <div
            className="lg:col-span-3"
            style={{
              position: "relative",
              minHeight: 360,
              background: COLORS.mist,
            }}
          >
            <img
              src="/format-album-a4.webp"
              alt="Album photo A4 vertical avec couverture rigide et pages intérieures"
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", position: "absolute", inset: 0, objectFit: "cover" }}
            />
            <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, display: "flex", justifyContent: "center" }}>
              <div style={{ padding: "9px 16px", borderRadius: 999, color: COLORS.navyDeep, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", boxShadow: "0 8px 24px rgba(0,0,0,.16)", fontSize: 13, fontWeight: 800 }}>
                Format A4 vertical : 21 × 29,7 cm
              </div>
            </div>
          </div>
          <div className="lg:col-span-2" style={{ color: "#C4D6C8", padding: "42px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ color: COLORS.gold, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>Format premium</span>
            <strong className="font-display" style={{ color: COLORS.white, display: "block", fontSize: 26, lineHeight: 1.25, marginTop: 10 }}>
              Un véritable album A4
            </strong>
            <div className="grid grid-cols-2 gap-3" style={{ marginTop: 24 }}>
              <div style={{ borderRadius: 12, padding: 14, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)" }}>
                <div style={{ color: COLORS.gold, fontSize: 20, fontWeight: 800 }}>21 cm</div>
                <div style={{ fontSize: 12, marginTop: 3 }}>Largeur</div>
              </div>
              <div style={{ borderRadius: 12, padding: 14, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)" }}>
                <div style={{ color: COLORS.gold, fontSize: 20, fontWeight: 800 }}>29,7 cm</div>
                <div style={{ fontSize: 12, marginTop: 3 }}>Hauteur</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, marginTop: 22 }}>
              Couverture rigide, papier photo mat premium 250 g et reliure soignée. De 30 à 50 pages incluses, puis 80 MAD par tranche de 10 pages supplémentaires.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
