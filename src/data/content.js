export const PACKS = [
  {
    id: "solo",
    name: "Solo",
    tagline: "Immortalisez un voyage en solo",
    price: 299,
    prices: { paper: 299, cardboard: 399 },
    originalPrices: { paper: 399, cardboard: 529 },
    img: "/designs/marakech.webp",
    features: ["1 album photo", "Mise en page soignée", "Destination au choix", "Livraison gratuite"],
    popular: false,
  },
  {
    id: "duo",
    name: "Duo",
    tagline: "Partagez vos souvenirs à deux",
    price: 549,
    prices: { paper: 549, cardboard: 699 },
    originalPrices: { paper: 729, cardboard: 929 },
    img: "/designs/pack-duo-books.webp",
    features: ["2 albums photo", "Mise en page soignée", "Destinations au choix", "Livraison gratuite"],
    popular: true,
  },
  {
    id: "trio",
    name: "Trio",
    tagline: "Offrez à toute la famille",
    price: 799,
    prices: { paper: 799, cardboard: 999 },
    originalPrices: { paper: 1069, cardboard: 1329 },
    img: "/designs/pack-trio-books.webp",
    features: ["3 albums photo", "Mise en page soignée", "Destinations au choix", "Livraison gratuite"],
    popular: false,
  },
];

export const VIDEOS = [
  { tag: "Déballage", src: "https://cdn.shopify.com/videos/c/o/v/ea62cba8880f40f0b6900adb634a2b99.mp4" },
  { tag: "Feuilletage", src: "https://cdn.shopify.com/videos/c/o/v/6e39fd12fc994f30bf27bac21fb82f12.mp4" },
  { tag: "Détail impression", src: "https://cdn.shopify.com/videos/c/o/v/84ccbdfd2f53480e9484a2eb6491412e.mp4" },
];

export const STEPS = [
  { icon: "📋", title: "Choisissez votre formule", text: "Sélectionnez Solo, Duo ou Trio et votre destination parmi nos modèles disponibles." },
  { icon: "📲", title: "Importez vos photos", text: "Téléchargez vos photos directement dans l'application OXmemo, en quelques clics." },
  { icon: "✨", title: "Nous créons votre mise en page", text: "Vos photos sont organisées avec soin pour raconter naturellement l’histoire de votre voyage." },
  { icon: "📦", title: "Recevez votre album", text: "Validez votre commande et recevez votre album premium en 5–7 jours, livré gratuitement." },
];

export const TESTIMONIALS = [
  { initials: "FZ", name: "Fatima Z.", city: "Casablanca", quote: "Le livre est magnifique, ma mère a pleuré en le recevant. Qualité top !" },
  { initials: "YB", name: "Youssef B.", city: "Rabat", quote: "Parfait pour un cadeau de mariage. Livraison rapide et emballage soigné." },
  { initials: "NE", name: "Nadia E.", city: "Marrakech", quote: "J'ai commandé le Duo pour nos vacances en Turquie. Résultat bluffant." },
  { initials: "MA", name: "Mehdi A.", city: "Fès", quote: "La qualité d'impression est vraiment premium. Je recommande à 100%." },
];

export const FAQS = [
  { q: "Comment se déroule la création de mon album ?", a: "Vous choisissez une formule, envoyez vos photos à OXmemo, puis nous préparons soigneusement la mise en page. Vous validez avant impression." },
  { q: "Combien de photos faut-il prévoir ?", a: "Comptez environ 1 à 2 photos par page selon la mise en page choisie, soit 50 à 100 photos pour un album de 50 pages." },
  { q: "Puis-je ajouter des pages supplémentaires ?", a: "Oui. Les formules incluent de 30 à 50 pages. Au-delà de 50 pages, chaque tranche supplémentaire de 10 pages est facturée 80 MAD." },
  { q: "Comment fonctionne le paiement ?", a: "Un acompte de 50 MAD est obligatoire pour confirmer la commande personnalisée et lancer sa préparation. Le solde est payé à la livraison." },
  { q: "Quel est le délai de livraison ?", a: "Comptez 5 à 7 jours ouvrés après validation de la maquette finale, livraison gratuite incluse." },
];
