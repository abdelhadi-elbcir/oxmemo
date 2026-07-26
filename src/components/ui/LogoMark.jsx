import { COLORS } from "../../theme/colors";

export default function LogoMark({ size = 38 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.ocean})`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: size * 0.37,
          height: size * 0.37,
          borderRadius: "50%",
          border: `2.5px solid ${COLORS.gold}`,
          top: size * 0.23,
          left: size * 0.23,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 6,
          height: size * 0.42,
          background: COLORS.gold,
          borderRadius: 2,
          bottom: size * 0.15,
          right: size * 0.2,
          transform: "rotate(20deg)",
        }}
      />
    </div>
  );
}
