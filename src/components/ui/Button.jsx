import { COLORS } from "../../theme/colors";

const VARIANTS = {
  primary: {
    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
    color: COLORS.navyDeep,
    boxShadow: "0 12px 24px -8px rgba(193,155,85,0.55)",
  },
  outline: {
    background: "transparent",
    border: "1.5px solid rgba(255,255,255,0.35)",
    color: COLORS.white,
  },
  navy: { background: COLORS.navy, color: COLORS.white },
};

export default function Button({ children, variant = "primary", onClick, href, style = {}, className = "" }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "15px 28px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: "transform .15s ease, box-shadow .15s ease",
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={className}
      style={{ ...base, ...VARIANTS[variant], ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </Tag>
  );
}
