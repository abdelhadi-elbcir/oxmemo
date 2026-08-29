import { BookHeart, Heart, Sparkles } from "lucide-react";
import { COLORS } from "../theme/colors";
import Eyebrow from "./ui/Eyebrow";
import Button from "./ui/Button";

const MOMENTS = [
  { Icon: Heart, title: "Une émotion", text: "Le sourire, le paysage et les personnes qui ont rendu ce moment unique." },
  { Icon: Sparkles, title: "Une histoire", text: "Vos photos prennent vie dans une mise en page pensée comme un véritable récit." },
  { Icon: BookHeart, title: "Un souvenir durable", text: "Un bel objet que l’on ouvre aujourd’hui et que l’on transmet demain." },
];

export default function MemoryStory({ onNavigate }) {
  return (
    <section className="memory-story" style={{ padding: "96px 0", overflow: "hidden" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div className="memory-collage" style={{ position: "relative", minHeight: 510 }}>
          <div className="memory-glow" />
          <img className="memory-photo memory-photo-main" src="/designs/pack-trio-books-a4-2026.webp" alt="Trois albums de souvenirs marocains" loading="lazy" />
          <img className="memory-photo memory-photo-detail" src="/format-album-a4.webp" alt="Album photo ouvert" loading="lazy" />
          <div className="memory-note font-display">Les moments passent.<br /><span>Les souvenirs restent.</span></div>
        </div>
        <div>
          <Eyebrow>Plus qu’un album</Eyebrow>
          <h2 className="font-display" style={{ color: COLORS.navy, fontSize: "clamp(32px, 5vw, 46px)", lineHeight: 1.12, marginTop: 16 }}>
            Transformez vos plus beaux moments en héritage
          </h2>
          <p style={{ color: COLORS.inkSoft, fontSize: 17, lineHeight: 1.8, marginTop: 18, maxWidth: 570 }}>
            Un voyage se termine, une enfance grandit, une fête devient un souvenir. OXmemo rassemble ces instants dans un livre que votre famille prendra plaisir à feuilleter encore et encore.
          </p>
          <div style={{ display: "grid", gap: 13, marginTop: 28 }}>
            {MOMENTS.map(({ Icon, title, text }, index) => (
              <div className="memory-benefit" key={title} style={{ animationDelay: `${index * 120}ms` }}>
                <div className="memory-benefit-icon"><Icon size={21} strokeWidth={2} /></div>
                <div><h3 className="font-display" style={{ color: COLORS.navy, fontSize: 15 }}>{title}</h3><p style={{ color: COLORS.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginTop: 3 }}>{text}</p></div>
              </div>
            ))}
          </div>
          <Button style={{ marginTop: 28 }} onClick={() => onNavigate("order")}>Créer mon album souvenir</Button>
        </div>
      </div>
    </section>
  );
}
