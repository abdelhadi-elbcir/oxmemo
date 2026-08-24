import { useState } from "react";
import { Search, ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { COLORS } from "../theme/colors";
import { PACKS } from "../data/content";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";

// TODO: remplacer par le vrai numéro WhatsApp OXmemo (format international, sans "+")
const WHATSAPP_NUMBER = "212600000000";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const COVER_TYPES = [
  { id: "cardboard", name: "Couverture rigide cartonnée", description: "Solide, durable et premium" },
  { id: "paper", name: "Couverture souple papier", description: "Légère, flexible et économique" },
];

const CATEGORIES = ["Tous", "Voyage", "Anniversaire", "Mariage", "Famille", "Naissance", "Maroc", "Autre"];

const DESIGNS = [
  { id: 1, category: "Maroc", title: "MARRAKECH", image: "/designs/marrakech.png" },
  { id: 2, category: "Maroc", title: "CHEFCHAOUEN", image: "/designs/chefchaouen.png" },
  { id: 3, category: "Maroc", title: "ESSAOUIRA", image: "/designs/essaouira.png" },
  { id: 4, category: "Maroc", title: "DAKHLA", image: "/designs/dakhla.png" },
  { id: 5, category: "Maroc", title: "MAROC", image: "/designs/maroc.png" },
  { id: 6, category: "Voyage", title: "FRANCE", image: "/designs/france.png" },
  { id: 7, category: "Voyage", title: "ITALIE", image: "/designs/italie.png" },
  { id: 8, category: "Voyage", title: "TURQUIE", image: "/designs/turquie.png" },
];

const inputStyle = {
  width: "100%",
  padding: "14px 15px",
  border: `1.5px solid ${COLORS.border}`,
  borderRadius: 10,
  fontSize: 15,
  fontFamily: "inherit",
  background: COLORS.mist,
  color: COLORS.ink,
};

const labelStyle = {
  fontSize: 13.5,
  fontWeight: 700,
  color: COLORS.navy,
  display: "block",
  marginBottom: 6,
};

const cardStyle = {
  background: COLORS.white,
  borderRadius: 20,
  padding: 36,
  color: COLORS.ink,
  position: "relative",
  zIndex: 1,
  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.45)",
};

function randomRef(prefix, digits) {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return `${prefix}${Math.floor(min + Math.random() * (max - min))}`;
}

function isValidMoroccanPhone(value) {
  const phone = value.replace(/[\s.-]/g, "");
  return /^(?:0[67]\d{8}|(?:\+?212)[67]\d{8})$/.test(phone);
}

function StepIndicator({ step }) {
  const labels = ["Informations", "Design", "Confirmation"];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32, position: "relative", zIndex: 1 }}>
      {labels.map((label, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  background: done || active ? COLORS.gold : "rgba(255,255,255,0.12)",
                  color: done || active ? COLORS.navyDeep : "rgba(255,255,255,0.6)",
                  transition: ".2s",
                }}
              >
                {done ? <Check size={15} /> : n}
              </div>
              <span
                className="hidden md:inline"
                style={{ fontSize: 13, fontWeight: 600, color: active || done ? COLORS.white : "rgba(255,255,255,0.5)" }}
              >
                {label}
              </span>
            </div>
            {n < labels.length && <div style={{ width: 28, height: 2, background: done ? COLORS.gold : "rgba(255,255,255,0.18)" }} />}
          </div>
        );
      })}
    </div>
  );
}

export default function OrderForm({ selectedPack, onSelectPack }) {
  const pack = PACKS.find((p) => p.id === selectedPack);
  const [coverType, setCoverType] = useState("cardboard");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", whatsapp: "", address: "", destination: "Marrakech", layout: "1 image par page", pages: 50, note: "" });
  const [category, setCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [coverDescription, setCoverDescription] = useState("");
  const [designRef] = useState(() => randomRef("#D", 3));
  const [orderRef] = useState(() => randomRef("#", 6));
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [savedOrder, setSavedOrder] = useState(null);

  const extraPages = Math.max(0, form.pages - 50);
  const selectedCover = COVER_TYPES.find((type) => type.id === coverType);
  const packPrice = pack?.prices?.[coverType] ?? pack?.price ?? 0;
  const total = packPrice + extraPages * 8;
  const deposit = 50;
  const remainingBalance = Math.max(0, total - deposit);

  const filteredDesigns = DESIGNS.filter(
    (d) => (category === "Tous" || d.category === category) && d.title.toLowerCase().includes(search.toLowerCase())
  );

  const validWhatsapp = isValidMoroccanPhone(form.whatsapp);
  const canGoStep1 = form.name.trim() && validWhatsapp && form.address.trim();
  const hasCoverDescription = coverDescription.trim().length > 0;
  const canGoStep2 = selectedDesign !== null || hasCoverDescription;
  const designTitle = selectedDesign !== null
    ? DESIGNS.find((d) => d.id === selectedDesign)?.title ?? "—"
    : coverDescription.trim();

  const finalRef = savedOrder?.order_ref ?? orderRef;

  const waMessage = encodeURIComponent(
    `Bonjour, je viens de valider ma commande ${finalRef} sur OXmemo.\nNom: ${form.name}\nFormule: ${pack?.name} — ${selectedCover?.name} — ${form.pages} pages\nDestination: ${form.destination}\nDesign: ${designTitle}\nAcompte de confirmation: 50 MAD.\nJe vous envoie mes photos ci-joint.`
  );

  async function handleSubmitOrder() {
    if (!canGoStep2 || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          whatsapp: form.whatsapp,
          address: form.address,
          packId: pack?.id,
          packName: `${pack?.name} — ${selectedCover?.name}`,
          packPrice,
          destination: form.destination,
          layout: form.layout,
          pages: form.pages,
          extraPages,
          note: form.note || null,
          designId: selectedDesign,
          designTitle,
          total,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSavedOrder(data);
    } catch (err) {
      // Le backend est peut-être indisponible : on ne bloque pas la commande,
      // le client peut toujours envoyer ses photos via WhatsApp.
      console.error("[OrderForm] échec de l'enregistrement de la commande:", err);
      setSubmitError("La commande n'a pas pu être synchronisée avec le serveur, mais vous pouvez continuer.");
    } finally {
      setSubmitting(false);
      setStep(3);
    }
  }

  return (
    <section id="order" style={{ padding: "56px 0 88px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            background: `linear-gradient(180deg, ${COLORS.navyDeep}, ${COLORS.navy})`,
            borderRadius: 28,
            padding: "48px clamp(22px, 4vw, 56px) 56px",
            color: COLORS.white,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <StepIndicator step={step} />

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-[0.72fr_1.45fr]" style={{ gap: 48, alignItems: "start" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <Eyebrow style={{ background: "rgba(193,155,85,0.15)" }}>Étape 1 · Informations</Eyebrow>
                <h2 className="font-display" style={{ color: COLORS.white, fontSize: "clamp(30px, 3vw, 42px)", lineHeight: 1.15, marginTop: 16 }}>
                  Commander mon album OXmemo
                </h2>
                <p style={{ color: "#C4D6C8", marginTop: 18, fontSize: 16, lineHeight: 1.75, maxWidth: 430 }}>
                  Complétez vos informations pour finaliser votre album souvenir. À l'étape suivante, vous choisirez
                  le design de votre couverture.
                </p>
                <div
                  style={{
                    marginTop: 30,
                    padding: 20,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#D9E7DC",
                    fontSize: 13.5,
                    lineHeight: 1.9,
                  }}
                >
                  <div>✓ Acompte de 50 MAD à la confirmation</div>
                  <div>✓ Livraison gratuite au Maroc</div>
                  <div>✓ Validation avant impression</div>
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ marginBottom: 24 }}>
                  <h3 className="font-display" style={{ color: COLORS.navy, fontSize: 24, lineHeight: 1.2 }}>
                    Vos informations
                  </h3>
                  <p style={{ color: COLORS.inkSoft, fontSize: 13.5, marginTop: 6 }}>
                    Tous les champs marqués sont nécessaires pour préparer votre commande.
                  </p>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Prénom & Nom</label>
                  <input
                    type="text"
                    placeholder="ex. Salma Amrani"
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 18 }}>
                  <div>
                    <label style={labelStyle}>Numéro WhatsApp</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="06 12 34 56 78"
                      style={{ ...inputStyle, borderColor: form.whatsapp && !validWhatsapp ? "#C65D4B" : COLORS.border }}
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    />
                    <div style={{ fontSize: 11, marginTop: 5, color: form.whatsapp && !validWhatsapp ? "#C65D4B" : COLORS.inkSoft }}>
                      {form.whatsapp && !validWhatsapp ? "Entrez un numéro marocain valide." : "Format : 06XXXXXXXX, 07XXXXXXXX ou +212."}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Adresse & Ville</label>
                    <input
                      type="text"
                      placeholder="Casablanca, Maarif"
                      style={inputStyle}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>1. Type de couverture</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {COVER_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setCoverType(type.id)}
                        style={{
                          padding: "15px 14px",
                          borderRadius: 12,
                          border: `2px solid ${coverType === type.id ? COLORS.gold : COLORS.border}`,
                          background: coverType === type.id ? "rgba(193,155,85,.12)" : COLORS.mist,
                          color: COLORS.navy,
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                          <span style={{ fontWeight: 800, fontSize: 13.5 }}>{type.name}</span>
                          {coverType === type.id && <Check size={17} color={COLORS.goldDark} strokeWidth={3} />}
                        </div>
                        <div style={{ color: COLORS.inkSoft, fontSize: 11.5, marginTop: 5 }}>{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>2. Offre choisie</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {PACKS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onSelectPack(p.id)}
                        style={{
                          flex: 1,
                          padding: "13px 10px",
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
                        {p.name} — {p.prices[coverType]} MAD
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 18 }}>
                  <div>
                    <label style={labelStyle}>Destination</label>
                    <select
                      style={inputStyle}
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    >
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
                    <select
                      style={inputStyle}
                      value={form.layout}
                      onChange={(e) => setForm({ ...form, layout: e.target.value })}
                    >
                      <option>1 image par page</option>
                      <option>1 à 4 images par page</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Nombre de pages</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setForm({ ...form, pages: Math.max(50, form.pages - 10) })}
                      style={{ width: 34, height: 34, borderRadius: 8, border: `1.5px solid ${COLORS.border}`, background: COLORS.mist, cursor: "pointer", fontWeight: 700 }}
                    >
                      −
                    </button>
                    <span style={{ fontWeight: 700, minWidth: 70, textAlign: "center" }}>{form.pages} pages</span>
                    <button
                      onClick={() => setForm({ ...form, pages: form.pages + 10 })}
                      style={{ width: 34, height: 34, borderRadius: 8, border: `1.5px solid ${COLORS.border}`, background: COLORS.mist, cursor: "pointer", fontWeight: 700 }}
                    >
                      +
                    </button>
                    {extraPages > 0 && (
                      <span style={{ fontSize: 12, color: COLORS.inkSoft }}>+{extraPages * 8} MAD ({extraPages} pages supp. à 8 MAD)</span>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Note spéciale (optionnel)</label>
                  <input
                    type="text"
                    placeholder="Instructions particulières"
                    style={inputStyle}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                  />
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
                  <span style={{ fontSize: 13, color: COLORS.inkSoft }}>Total de la commande</span>
                  <span className="font-display" style={{ fontWeight: 800, fontSize: 22, color: COLORS.navy }}>
                    {total} MAD
                  </span>
                </div>
                <Button
                  style={{ width: "100%", marginTop: 16, opacity: canGoStep1 ? 1 : 0.5, cursor: canGoStep1 ? "pointer" : "not-allowed" }}
                  onClick={() => canGoStep1 && setStep(2)}
                >
                  Commander mon album <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ ...cardStyle, maxWidth: 760, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600 }}>Réf. {designRef}</div>
                  <h3 className="font-display" style={{ fontSize: 22, color: COLORS.navy, marginTop: 2 }}>
                    Choisissez votre design
                  </h3>
                  <p style={{ fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>
                    {form.destination} · {new Date().getFullYear() + 1}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(1)}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 999, border: `1.5px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                  >
                    <ArrowLeft size={14} /> Retour
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={!canGoStep2 || submitting}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "9px 16px",
                      borderRadius: 999,
                      border: "none",
                      background: canGoStep2 ? COLORS.gold : COLORS.border,
                      color: COLORS.navyDeep,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: canGoStep2 && !submitting ? "pointer" : "not-allowed",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Envoi..." : <>Suivant <ArrowRight size={14} /></>}
                  </button>
                </div>
              </div>

              <div style={{ position: "relative", marginBottom: 16 }}>
                <Search size={16} style={{ position: "absolute", left: 13, top: 12, color: COLORS.inkSoft }} />
                <input
                  type="text"
                  placeholder="Rechercher un design..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 36 }}
                />
              </div>

              <div className="flex gap-2" style={{ flexWrap: "wrap", marginBottom: 20 }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 999,
                      border: `1.5px solid ${category === c ? COLORS.gold : COLORS.border}`,
                      background: category === c ? COLORS.gold : COLORS.mist,
                      color: category === c ? COLORS.navyDeep : COLORS.inkSoft,
                      fontWeight: 600,
                      fontSize: 12.5,
                      cursor: "pointer",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                {filteredDesigns.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDesign(d.id);
                      setCoverDescription("");
                    }}
                    style={{
                      aspectRatio: "3/4",
                      borderRadius: 14,
                      border: `2px solid ${selectedDesign === d.id ? COLORS.gold : "transparent"}`,
                      background: COLORS.mist,
                      position: "relative",
                      cursor: "pointer",
                      overflow: "hidden",
                      padding: 0,
                      display: "block",
                    }}
                  >
                    {selectedDesign === d.id && (
                      <div style={{ position: "absolute", zIndex: 2, top: 8, right: 8, width: 24, height: 24, borderRadius: "50%", background: COLORS.gold, boxShadow: "0 2px 8px rgba(0,0,0,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={13} color={COLORS.navyDeep} />
                      </div>
                    )}
                    <img
                      src={d.image}
                      alt={`Design de couverture ${d.title}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "28px 11px 10px", color: "#fff", fontWeight: 800, fontSize: 12.5, lineHeight: 1.25, textAlign: "left", background: "linear-gradient(transparent, rgba(5, 20, 34, .88))" }}>
                      {d.title}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${COLORS.border}` }}>
                <label style={labelStyle} htmlFor="cover-description">
                  Votre design n’existe pas ? Décrivez votre couverture
                </label>
                <textarea
                  id="cover-description"
                  value={coverDescription}
                  onChange={(e) => {
                    setCoverDescription(e.target.value.slice(0, 300));
                    if (e.target.value.trim()) setSelectedDesign(null);
                  }}
                  placeholder="Ex. : couverture beige avec la mosquée Hassan II, quelques vagues bleues, le titre CASABLANCA et l’année 2026..."
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 105, lineHeight: 1.5 }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 5, fontSize: 11, color: COLORS.inkSoft }}>
                  <span>Une description suffit pour continuer sans choisir d’image.</span>
                  <span>{coverDescription.length}/300</span>
                </div>
              </div>

              {filteredDesigns.length === 0 && (
                <p style={{ textAlign: "center", color: COLORS.inkSoft, fontSize: 13, padding: "24px 0" }}>Aucun design trouvé.</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div style={{ ...cardStyle, maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: `2.5px solid ${COLORS.gold}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Check size={28} color={COLORS.gold} />
              </div>
              <h3 className="font-display" style={{ fontSize: 24, color: COLORS.navy }}>
                Merci pour votre commande ! 🎉
              </h3>
              <p style={{ color: COLORS.inkSoft, marginTop: 8, fontSize: 14.5 }}>Votre demande de commande a bien été enregistrée.</p>
              {submitError && (
                <p style={{ color: "#B8843A", marginTop: 8, fontSize: 12.5, lineHeight: 1.6 }}>{submitError}</p>
              )}

              <div style={{ marginTop: 22, padding: "18px 20px", borderRadius: 14, background: "rgba(193,155,85,.15)", border: `1.5px solid ${COLORS.gold}`, textAlign: "left" }}>
                <div style={{ color: COLORS.navy, fontWeight: 800, fontSize: 15.5 }}>Acompte obligatoire : 50 MAD</div>
                <p style={{ color: COLORS.inkSoft, fontSize: 13, lineHeight: 1.6, marginTop: 6 }}>
                  Pour confirmer votre commande, vous devez verser un acompte de 50 MAD. Chaque album étant personnalisé, la préparation commence uniquement après réception de cet acompte.
                </p>
                <div style={{ color: COLORS.navy, fontWeight: 700, fontSize: 13, marginTop: 8 }}>
                  Solde à payer à la livraison : {remainingBalance} MAD
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 26,
                  padding: "15px 20px",
                  borderRadius: 14,
                  background: "#25D366",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={20} /> Envoyer mes photos sur WhatsApp
              </a>
              <p style={{ fontSize: 12, color: COLORS.inkSoft, marginTop: 10, lineHeight: 1.6 }}>
                Envoyez vos photos en DOCUMENT 📎 — on prépare votre album dès réception.
              </p>

              <div style={{ marginTop: 24, padding: 18, background: COLORS.mist, borderRadius: 14, textAlign: "left" }}>
                {[
                  ["Référence", finalRef],
                  ["Nom", form.name || "—"],
                  ["Formule", `${pack?.name} — ${selectedCover?.name} — ${form.pages} pages`],
                  ["Design", designTitle],
                  ["Total", `${total} MAD`],
                  ["Acompte obligatoire", `${deposit} MAD`],
                  ["Solde à la livraison", `${remainingBalance} MAD`],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 13.5 }}>
                    <span style={{ color: COLORS.inkSoft }}>{label}</span>
                    <span style={{ fontWeight: 700, color: COLORS.navy }}>{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  setSelectedDesign(null);
                  setCoverDescription("");
                  setCoverType("cardboard");
                  setForm({ name: "", whatsapp: "", address: "", destination: "Marrakech", layout: "1 image par page", pages: 50, note: "" });
                }}
                style={{ marginTop: 18, background: "none", border: "none", color: COLORS.ocean, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Passer une nouvelle commande
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
