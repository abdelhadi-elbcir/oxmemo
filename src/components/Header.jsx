import { useState } from "react";
import { Menu, X } from "lucide-react";
import { COLORS } from "../theme/colors";
import Button from "./ui/Button";

export default function Header({ onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  const links = [
    { id: "hero", label: "Accueil" },
    { id: "packs", label: "Nos packs" },
    { id: "blog", label: "Blog" },
    { id: "footer", label: "Contact" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <nav
        className="flex items-center justify-between"
        style={{ padding: "14px 24px", maxWidth: 1180, margin: "0 auto" }}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            go("hero");
          }}
          className="font-display flex items-center gap-2.5"
          style={{ fontWeight: 800, fontSize: 22, color: COLORS.navy }}
        >
          <img src="/logo-600.png" alt="OxMemo" style={{ height: 58, width: "auto" }} />
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.id}
              onClick={() => go(l.id)}
              style={{ fontSize: 15, fontWeight: 600, cursor: "pointer", color: COLORS.ink }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="navy" onClick={() => go("order")}>
            Commander mon album
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", padding: 6 }}
        >
          {mobileOpen ? <X size={22} color={COLORS.navy} /> : <Menu size={22} color={COLORS.navy} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden flex flex-col gap-1"
          style={{ padding: "8px 24px 18px", borderTop: `1px solid ${COLORS.border}` }}
        >
          <img
            src="/logo-600.png"
            alt="OxMemo"
            style={{ height: 48, width: "auto", margin: "10px 0 6px" }}
          />
          {links.map((l) => (
            <a key={l.id} onClick={() => go(l.id)} style={{ padding: "10px 0", fontWeight: 600 }}>
              {l.label}
            </a>
          ))}
          <Button variant="navy" style={{ marginTop: 10, width: "100%" }} onClick={() => go("order")}>
            Commander mon album
          </Button>
        </div>
      )}
    </header>
  );
}
