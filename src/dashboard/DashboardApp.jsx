import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AlertCircle, Clock, LogOut, Mail, Package, RefreshCw, Search, Trash2, Wallet, X, Lock } from "lucide-react";


const API_URL = import.meta.env.VITE_API_URL;

const STORAGE_KEY = "oxmemo_dashboard_token";

const STATUSES = [
  { value: "pending", label: "En attente", color: "#B8843A", bg: "#FBF1DF" },
  { value: "confirmed", label: "Confirmée", color: "#1F6E58", bg: "#E4F2EC" },
  { value: "in_production", label: "En production", color: "#2E6F9E", bg: "#E3EEF7" },
  { value: "shipped", label: "Expédiée", color: "#6B4A85", bg: "#F1E9F6" },
  { value: "delivered", label: "Livrée", color: "#0E3D30", bg: "#DCEAE0" },
  { value: "cancelled", label: "Annulée", color: "#A33B3B", bg: "#FBE4E4" },
];

const AuthContext = createContext(null);

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem(STORAGE_KEY);
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = new Error(body.error || `Erreur ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ? null : response.json();
}

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAdmin(null);
  }, []);

  useEffect(() => {
    let active = true;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setChecking(false);
      return undefined;
    }
    apiRequest("/api/auth/me")
      .then((result) => active && setAdmin(result.admin))
      .catch(() => active && logout())
      .finally(() => active && setChecking(false));
    return () => { active = false; };
  }, [logout]);

  const login = async (email, password) => {
    const result = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem(STORAGE_KEY, result.token);
    setAdmin(result.admin);
  };

  return <AuthContext.Provider value={{ admin, checking, login, logout }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try { await login(email.trim(), password); }
    catch (err) { setError(err.message || "Connexion impossible"); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <img src="/logo-600.png" alt="OXmemo" className="mx-auto mb-3 h-16 w-auto" />
          <h1 className="font-display text-xl font-bold text-navy">Espace administrateur</h1>
          <p className="mt-1 text-sm text-ink-soft">Connectez-vous pour gérer les commandes</p>
        </div>
        <form onSubmit={submit}>
          <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Email</label>
          <div className="relative mb-4">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input type="email" required autoFocus autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@oxmemo.ma" className="w-full rounded-lg border border-border bg-mist py-3 pl-9 pr-3 text-sm" />
          </div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Mot de passe</label>
          <div className="relative mb-5">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-lg border border-border bg-mist py-3 pl-9 pr-3 text-sm" />
          </div>
          {error && <div className="mb-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600"><AlertCircle size={15} />{error}</div>}
          <button disabled={submitting} className="w-full rounded-lg bg-navy py-3 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Connexion…" : "Se connecter"}</button>
        </form>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const meta = STATUSES.find((item) => item.value === status) || STATUSES[0];
  return <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" style={{ color: meta.color, background: meta.bg }}>{meta.label}</span>;
}

function StatCard({ Icon, label, value }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-navy"><Icon size={20} /></div><div><div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</div><div className="mt-0.5 font-display text-xl font-bold text-navy">{value}</div></div></div>;
}

function OrderDrawer({ order, onClose, onStatus, onDelete }) {
  if (!order) return null;
  const rows = [
    ["Nom", order.name], ["WhatsApp", order.whatsapp], ["Adresse", order.address],
    ["Offre", `${order.pack_name} (${Number(order.pack_price).toLocaleString("fr-FR")} MAD)`],
    ["Destination", order.destination], ["Mise en page", order.layout],
    ["Pages", `${order.pages} (+${order.extra_pages} supp.)`], ["Design", order.design_title || "—"],
    ...(order.note ? [["Note", order.note]] : []), ["Total", `${Number(order.total).toLocaleString("fr-FR")} MAD`],
  ];
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <aside className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4"><div><div className="text-xs text-ink-soft">Commande</div><div className="font-display text-lg font-bold text-navy">{order.order_ref}</div></div><button onClick={onClose} className="rounded-full p-2 hover:bg-mist"><X size={18} /></button></div>
        <div className="flex-1 px-6 py-5"><StatusBadge status={order.status} /><div className="mt-5">{rows.map(([label, value]) => <div key={label} className="flex justify-between gap-6 border-b border-border py-2.5 text-sm"><span className="text-ink-soft">{label}</span><span className="max-w-[65%] text-right font-medium text-ink">{value}</span></div>)}</div></div>
        <div className="border-t border-border p-6"><label className="mb-1.5 block text-xs font-semibold text-ink-soft">Changer le statut</label><select value={order.status} onChange={(e) => onStatus(order.id, e.target.value)} className="mb-3 w-full rounded-lg border border-border bg-mist px-3 py-2.5 text-sm">{STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><button onClick={() => onDelete(order.id)} className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600"><Trash2 size={15} /> Supprimer la commande</button></div>
      </aside>
    </div>
  );
}

function Dashboard() {
  const { admin, checking, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    const params = new URLSearchParams({ page: "1", pageSize: "20" });
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    try {
      const result = await apiRequest(`/api/orders?${params}`);
      setOrders(result.data);
      setStats(result.stats);
    } catch (err) {
      if (err.status === 401) logout(); else setError(err.message);
    } finally { setLoading(false); setRefreshing(false); }
  }, [status, search, logout]);

  useEffect(() => {
    if (!admin) return undefined;
    const timer = setTimeout(() => load(), search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [admin, load, search]);

  if (checking) return <div className="flex min-h-screen items-center justify-center bg-mist text-sm text-ink-soft">Chargement…</div>;
  if (!admin) return <LoginPage />;

  const updateStatus = async (id, nextStatus) => {
    const updated = await apiRequest(`/api/orders/${id}`, { method: "PATCH", body: JSON.stringify({ status: nextStatus }) });
    setOrders((items) => items.map((item) => item.id === id ? updated : item));
    setSelected(updated);
    load(true);
  };
  const remove = async (id) => {
    if (!window.confirm("Supprimer définitivement cette commande ?")) return;
    await apiRequest(`/api/orders/${id}`, { method: "DELETE" });
    setSelected(null);
    load(true);
  };
  const revenue = Number(stats?.total_revenue || 0).toLocaleString("fr-FR");

  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><img src="/logo-600.png" alt="OXmemo" className="h-11 w-auto" /><div><div className="font-display font-bold text-navy">Dashboard OXmemo</div><div className="text-xs text-ink-soft">Commandes clients</div></div></div><div className="flex items-center gap-2"><button onClick={() => load(true)} className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-navy"><RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />Actualiser</button><span className="hidden text-xs text-ink-soft sm:block">{admin.email}</span><button onClick={logout} title="Se déconnecter" className="rounded-full border border-border p-2 text-ink-soft"><LogOut size={15} /></button></div></header>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><StatCard Icon={Package} label="Commandes" value={stats?.total_orders || 0} /><StatCard Icon={Clock} label="En attente" value={stats?.pending_count || 0} /><StatCard Icon={Wallet} label="Revenu hors annulées" value={`${revenue} MAD`} /></div>
        <div className="my-6 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nom, référence ou WhatsApp…" className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm" /></div><select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm"><option value="">Tous les statuts</option>{STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">Impossible de contacter l’API : {error}</div>}
        <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">{loading ? <div className="p-10 text-center text-ink-soft">Chargement…</div> : orders.length === 0 ? <div className="p-10 text-center text-ink-soft">Aucune commande.</div> : <table className="w-full min-w-[820px] text-left text-sm"><thead><tr className="border-b border-border bg-mist text-xs uppercase tracking-wide text-ink-soft"><th className="px-4 py-3">Référence</th><th className="px-4 py-3">Client</th><th className="px-4 py-3">Offre</th><th className="px-4 py-3">Destination</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Date</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} onClick={() => setSelected(order)} className="cursor-pointer border-b border-border last:border-0 hover:bg-mist"><td className="px-4 py-3 font-semibold text-navy">{order.order_ref}</td><td className="px-4 py-3"><div>{order.name}</div><div className="text-xs text-ink-soft">{order.whatsapp}</div></td><td className="px-4 py-3">{order.pack_name}<div className="text-xs text-ink-soft">{order.design_title || "—"}</div></td><td className="px-4 py-3">{order.destination}</td><td className="px-4 py-3 font-semibold">{Number(order.total).toLocaleString("fr-FR")} MAD</td><td className="px-4 py-3"><StatusBadge status={order.status} /></td><td className="px-4 py-3 text-xs text-ink-soft">{new Date(order.created_at).toLocaleString("fr-FR")}</td></tr>)}</tbody></table>}</div>
      </main>
      <OrderDrawer order={selected} onClose={() => setSelected(null)} onStatus={updateStatus} onDelete={remove} />
    </div>
  );
}

export default function DashboardApp() {
  return <AuthProvider><Dashboard /></AuthProvider>;
}
