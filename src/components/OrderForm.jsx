import { COLORS } from "../theme/colors";
import { PACKS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";

const inputStyle = {
  width: "100%",
  padding: "11px 13px",
  border: `1.5px solid ${COLORS.border}`,
  borderRadius: 10,
  fontSize: 14.5,
  fontFamily: "inherit",
  background: COLORS.mist,
  color: COLORS.ink,
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: COLORS.navy,
  display: "block",
  marginBottom: 6,
};

export default function OrderForm({ selectedPack, onSelectPack }) {
  const total = PACKS.find((p) => p.id === selectedPack)?.price ?? 0;

  return (
    <section id="order" style={{ padding: "88px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            background: `linear-gradient(180deg, ${COLORS.navyDeep}, ${COLORS.navy})`,
            borderRadius: 28,
            padding: 40,
            gap: 40,
            color: COLORS.white,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow style={{ background: "rgba(193,155,85,0.15)" }}>Commander</Eyebrow>
            <h2 className="font-display" style={{ color: COLORS.white, fontSize: 28, marginTop: 14 }}>
              Commander mon album OXmemo
            </h2>
            <p style={{ color: "#C4D6C8", marginTop: 14, fontSize: 15, lineHeight: 1.7 }}>
              Complétez vos informations pour finaliser votre album souvenir. Notre équipe vous contacte sur
              WhatsApp pour confirmer les détails avant impression.
            </p>
            <div
              style={{
                marginTop: 30,
                width: 130,
                height: 130,
                borderRadius: "50%",
                border: "2.5px dashed rgba(193,155,85,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: COLORS.gold,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: "0.05em",
                padding: 10,
              }}
            >
              OXMEMO
              <br />
              ORIGINAL
              <br />★ MAROC ★
            </div>
          </div>

          <div
            style={{
              background: COLORS.white,
              borderRadius: 20,
              padding: 28,
              color: COLORS.ink,
              position: "relative",
              zIndex: 1,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.45)",
            }}
          >
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Prénom & Nom</label>
              <input type="text" placeholder="ex. Salma Amrani" style={inputStyle} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" style={{ marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Numéro WhatsApp</label>
                <input type="tel" placeholder="06 12 34 56 78" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Ville</label>
                <input type="text" placeholder="Casablanca" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Adresse</label>
              <input type="text" placeholder="Adresse de livraison" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Offre choisie</label>
              <div className="flex gap-2">
                {PACKS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPack(p.id)}
                    style={{
                      flex: 1,
                      padding: 10,
                      borderRadius: 10,
                      border: `1.5px solid ${selectedPack === p.id ? COLORS.navy : COLORS.border}`,
                      background: selectedPack === p.id ? COLORS.navy : COLORS.mist,
                      color: selectedPack === p.id ? COLORS.white : COLORS.inkSoft,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      transition: ".15s",
                    }}
                  >
                    {p.name} — {p.price} MAD
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" style={{ marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Destination</label>
                <select style={inputStyle}>
                  <option>Marrakech</option>
                  <option>Chefchaouen</option>
                  <option>Dakhla</option>
                  <option>Fès</option>
                  <option>Essaouira</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Mise en page</label>
                <select style={inputStyle}>
                  <option>1 image par page</option>
                  <option>1 à 4 images par page</option>
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 18,
                padding: 16,
                background: COLORS.mist,
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 13, color: COLORS.inkSoft }}>Total à payer à la livraison</span>
              <span className="font-display" style={{ fontWeight: 800, fontSize: 22, color: COLORS.navy }}>
                {total} MAD
              </span>
            </div>
            <Button style={{ width: "100%", marginTop: 16 }}>Commander mon album →</Button>
            <p style={{ fontSize: 11.5, color: COLORS.inkSoft, marginTop: 12, textAlign: "center", lineHeight: 1.6 }}>
              En commandant, vous acceptez nos{" "}
              <span style={{ color: COLORS.ocean, fontWeight: 600, cursor: "pointer" }}>Conditions Générales</span> et
              autorisez OXmemo à utiliser vos photos uniquement pour l'impression de votre album.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
