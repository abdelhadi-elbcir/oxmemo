import { COLORS } from "../theme/colors";
import { VIDEOS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";

export default function VideoShowcase() {
  return (
    <section style={{ padding: "88px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <Eyebrow>En action</Eyebrow>
          <h2 className="font-display" style={{ fontSize: 32, marginTop: 14, color: COLORS.navy }}>
            L'album OXmemo en action
          </h2>
          <p style={{ color: COLORS.inkSoft, marginTop: 12, fontSize: 16 }}>
            Du carnet de voyage à l'objet-souvenir : découvrez le rendu réel de nos albums.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VIDEOS.map((v) => (
            <div
              key={v.tag}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: COLORS.navy,
                aspectRatio: "9/13",
                position: "relative",
                boxShadow: "0 20px 45px -20px rgba(14,61,48,0.25)",
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                src={v.src}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "rgba(8,42,33,0.55)",
                  backdropFilter: "blur(4px)",
                  color: COLORS.white,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: 999,
                }}
              >
                {v.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
