import { useState } from "react";
import { Plus } from "lucide-react";
import { COLORS } from "../theme/colors";
import { FAQS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" style={{ padding: "88px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display" style={{ fontSize: 32, marginTop: 14, color: COLORS.navy }}>
            Questions fréquentes
          </h2>
          <p style={{ color: COLORS.inkSoft, marginTop: 12, fontSize: 16 }}>
            Tout ce que vous devez savoir avant de commander.
          </p>
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => (
            <div key={f.q} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden", background: COLORS.white }}>
              <div
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 22px",
                  fontWeight: 700,
                  fontSize: 15,
                  color: COLORS.navy,
                  cursor: "pointer",
                }}
              >
                {f.q}
                <Plus
                  size={20}
                  color={COLORS.ocean}
                  style={{
                    flexShrink: 0,
                    marginLeft: 14,
                    transition: "transform .2s ease",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0)",
                  }}
                />
              </div>
              <div style={{ maxHeight: openIndex === i ? 200 : 0, overflow: "hidden", transition: "max-height .25s ease" }}>
                <div style={{ padding: "0 22px 20px", color: COLORS.inkSoft, fontSize: 14.5, lineHeight: 1.7 }}>{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
