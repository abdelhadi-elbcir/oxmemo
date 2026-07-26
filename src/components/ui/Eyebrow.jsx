import { COLORS } from "../../theme/colors";

export default function Eyebrow({ children, style = {} }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: COLORS.goldDark,
        background: "rgba(240,168,58,0.12)",
        padding: "6px 14px",
        borderRadius: 999,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
