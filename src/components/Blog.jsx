import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { BLOG_POSTS } from "../data/blog";
import { COLORS } from "../theme/colors";
import Button from "./ui/Button";

export default function Blog({ slug, onNavigate }) {
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (post) {
    return (
      <main style={{ background: COLORS.white }}>
        <article style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px 88px" }}>
          <button onClick={() => onNavigate("blog")} style={{ display: "inline-flex", alignItems: "center", gap: 7, border: 0, background: "transparent", color: COLORS.ocean, fontWeight: 700, cursor: "pointer", marginBottom: 30 }}>
            <ArrowLeft size={17} /> Retour au blog
          </button>
          <div style={{ color: COLORS.goldDark, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em" }}>{post.category}</div>
          <h1 className="font-display" style={{ color: COLORS.navy, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.12, marginTop: 12 }}>{post.title}</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, color: COLORS.inkSoft, fontSize: 13, marginTop: 18 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><CalendarDays size={15} />{post.date}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={15} />{post.readingTime} de lecture</span>
          </div>
          <img src={post.image} alt="" style={{ width: "100%", maxHeight: 430, objectFit: "cover", borderRadius: 22, marginTop: 32 }} />
          <p style={{ fontSize: 19, lineHeight: 1.8, color: COLORS.ink, marginTop: 34 }}>{post.intro}</p>
          {post.sections.map((section) => (
            <section key={section.title} style={{ marginTop: 34 }}>
              <h2 className="font-display" style={{ color: COLORS.navy, fontSize: 24 }}>{section.title}</h2>
              <p style={{ color: COLORS.inkSoft, fontSize: 16, lineHeight: 1.85, marginTop: 10 }}>{section.text}</p>
            </section>
          ))}
          <div style={{ marginTop: 46, padding: 26, borderRadius: 18, background: COLORS.mist, border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
            <h2 className="font-display" style={{ color: COLORS.navy, fontSize: 23 }}>Prêt à créer votre album ?</h2>
            <p style={{ color: COLORS.inkSoft, margin: "8px 0 18px" }}>Configurez votre album personnalisé en quelques minutes.</p>
            <Button variant="navy" onClick={() => onNavigate("order")}>Commander mon album <ArrowRight size={16} /></Button>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main style={{ background: `linear-gradient(180deg, ${COLORS.mist}, #fff 55%)`, padding: "72px 0 96px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ color: COLORS.goldDark, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".09em" }}>Conseils & inspiration</div>
          <h1 className="font-display" style={{ color: COLORS.navy, fontSize: "clamp(34px, 5vw, 52px)", marginTop: 12 }}>Le blog OXmemo</h1>
          <p style={{ color: COLORS.inkSoft, fontSize: 17, lineHeight: 1.7, marginTop: 12 }}>Des guides pratiques pour transformer vos photos en souvenirs imprimés qui durent.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: 44 }}>
          {BLOG_POSTS.map((item) => (
            <article key={item.slug} style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: 20, background: COLORS.white, border: `1px solid ${COLORS.border}`, boxShadow: "0 18px 45px -32px rgba(16,45,35,.5)" }}>
              <img src={item.image} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover" }} />
              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ color: COLORS.goldDark, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em" }}>{item.category}</div>
                <h2 className="font-display" style={{ color: COLORS.navy, fontSize: 20, lineHeight: 1.35, marginTop: 9 }}>{item.title}</h2>
                <p style={{ color: COLORS.inkSoft, fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>{item.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, color: COLORS.inkSoft, fontSize: 11.5, marginTop: 18 }}><span>{item.date}</span><span>{item.readingTime}</span></div>
                <button onClick={() => onNavigate(`blog/${item.slug}`)} style={{ display: "inline-flex", alignItems: "center", gap: 7, alignSelf: "flex-start", border: 0, background: "transparent", color: COLORS.ocean, fontWeight: 800, cursor: "pointer", padding: 0, marginTop: 20 }}>
                  Lire l’article <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
