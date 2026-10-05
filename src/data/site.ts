export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroSlides = [
  { image: img("1600596542815-ffad4c1539a9", 1920), name: "The Emerald Villa", location: "Sector 150, Noida", price: "₹4.2 Cr" },
  { image: img("1477959858617-67f85cf4f1df", 1920), name: "Skyline Residences", location: "Golf Course Rd, Gurugram", price: "₹2.85 Cr" },
  { image: img("1613490493576-7fde63acd811", 1920), name: "Aravali Retreat", location: "Chattarpur, New Delhi", price: "₹7.5 Cr" },
];

export const rotatingWords = ["Home", "Plot", "Office", "Villa", "Investment"];

export const stats = [
  { value: 1200, suffix: "+", label: "Properties Sold" },
  { value: 850, suffix: "+", label: "Happy Families" },
  { value: 18, suffix: "", label: "Core Services" },
  { value: 12, suffix: "+", label: "Years Experience" },
];

export type Category = "Buy" | "Sell" | "Rent" | "Legal" | "Advice";
export const serviceFilters = ["All", "Buy", "Sell", "Rent", "Legal", "Advice"] as const;

export const services: { icon: string; title: string; category: Category; desc: string }[] = [
  { icon: "🏡", title: "Property Buying", category: "Buy", desc: "Find verified homes that match your budget, lifestyle and future plans." },
  { icon: "💰", title: "Property Selling", category: "Sell", desc: "Get the best market price with expert pricing, marketing and buyer screening." },
  { icon: "🔑", title: "Property Renting", category: "Rent", desc: "Quick, hassle-free rentals with verified tenants and clear agreements." },
  { icon: "📑", title: "Property Leasing", category: "Rent", desc: "Long-term commercial and residential leases structured to protect you." },
  { icon: "🛠️", title: "Property Management", category: "Rent", desc: "Rent collection, maintenance and tenant care — fully handled for you." },
  { icon: "📊", title: "Property Valuation", category: "Advice", desc: "Accurate, data-backed valuations based on real locality transactions." },
  { icon: "🤝", title: "Real Estate Consultation", category: "Advice", desc: "One-on-one guidance to make confident, informed property decisions." },
  { icon: "📈", title: "Investment Advisory", category: "Advice", desc: "Identify high-growth micro-markets and maximise long-term returns." },
  { icon: "🏦", title: "Home Loan Assistance", category: "Legal", desc: "Best rates from 15+ banks with paperwork handled end to end." },
  { icon: "⚖️", title: "Property Legal Assistance", category: "Legal", desc: "Title checks, agreements and dispute support from seasoned lawyers." },
  { icon: "📜", title: "Property Registration", category: "Legal", desc: "Stamp duty, registry and mutation completed smoothly and on time." },
  { icon: "🚗", title: "Site Visit Assistance", category: "Buy", desc: "Escorted site visits with honest on-ground insights at your schedule." },
  { icon: "✈️", title: "NRI Property Services", category: "Advice", desc: "Buy, sell and manage Indian property remotely with full transparency." },
  { icon: "🏢", title: "Commercial Property Services", category: "Buy", desc: "Offices, retail and warehouses in prime business corridors." },
  { icon: "🏘️", title: "Residential Property Services", category: "Buy", desc: "Apartments, builder floors and villas across Delhi-NCR." },
  { icon: "🌳", title: "Land & Plot Services", category: "Buy", desc: "Clear-title plots and land parcels with complete due diligence." },
  { icon: "🏗️", title: "New Project Sales", category: "Sell", desc: "Pre-launch prices and exclusive inventory from top developers." },
  { icon: "✅", title: "Property Verification", category: "Legal", desc: "Ownership, approvals and encumbrance checks before you pay a rupee." },
];

export const whyUs = [
  { icon: "🛡️", title: "100% Verified Properties", desc: "Every listing passes a 27-point legal and physical verification." },
  { icon: "💎", title: "Transparent Pricing", desc: "No hidden charges. You see exactly what you pay and why." },
  { icon: "🎯", title: "Expert Negotiation", desc: "We save our clients an average of 6–9% on the asking price." },
  { icon: "⚡", title: "Fast Documentation", desc: "Agreements, loans and registry completed in record time." },
  { icon: "📍", title: "Local Market Expertise", desc: "12+ years of deep knowledge across every Delhi-NCR micro-market." },
  { icon: "🤲", title: "After-Sales Support", desc: "From possession to interiors and tenants — we stay with you." },
];

export const properties = [
  { image: img("1600585154340-be6161a56a0c"), tag: "For Sale", title: "4 BHK Luxury Villa", location: "Sector 150, Noida", price: "₹3.75 Cr", beds: 4, area: "3,800 sq.ft" },
  { image: img("1545324418-cc1a3fa10c00"), tag: "Rent", title: "3 BHK Premium Apartment", location: "Sector 12, Dwarka", price: "₹55,000/mo", beds: 3, area: "1,850 sq.ft" },
  { image: img("1497366216548-37526070297c"), tag: "Lease", title: "Grade-A Office Space", location: "Connaught Place, Delhi", price: "₹4.2 L/mo", beds: 0, area: "5,200 sq.ft" },
  { image: img("1500382017468-9049fed747ef"), tag: "Plot", title: "Corner Residential Plot", location: "Sohna Road, Gurugram", price: "₹1.6 Cr", beds: 0, area: "300 sq.yd" },
  { image: img("1486406146926-c627a92ad1ab"), tag: "New Project", title: "Skyview Towers", location: "Golf Course Ext., Gurugram", price: "₹1.9 Cr onwards", beds: 3, area: "2,100 sq.ft" },
  { image: img("1512917774080-9991f1c4c750"), tag: "For Sale", title: "Independent Builder Floor", location: "Greater Kailash, Delhi", price: "₹5.4 Cr", beds: 4, area: "3,200 sq.ft" },
];

export const process = [
  { n: "01", title: "Consult", desc: "We understand your goals, budget and timeline in a free one-on-one session." },
  { n: "02", title: "Shortlist", desc: "A curated list of verified properties that genuinely match your needs." },
  { n: "03", title: "Verify & Visit", desc: "Legal checks done, then escorted site visits with honest insights." },
  { n: "04", title: "Close & Register", desc: "Negotiation, loan, paperwork and registry — handled end to end." },
];

export const gallery = [
  img("1600607687939-ce8a6c25118c"),
  img("1564013799919-ab600027ffc6"),
  img("1600566753190-17f0baa2a6c3"),
  img("1580587771525-78b9dba3b914"),
  img("1502672260266-1c1ef2d93688"),
  img("1570129477492-45c003edd2be"),
  img("1600047509807-ba8f99d2cdde"),
  img("1613490493576-7fde63acd811"),
];

export const testimonials = [
  { name: "Rohit Malhotra", role: "Bought a villa in Noida", text: "Pandit Real Estate made our first home purchase effortless. Every document was verified and they negotiated ₹22 lakh off the price!" },
  { name: "Priya Sharma", role: "NRI, London", text: "Managing my Dwarka flat from abroad was a nightmare until I found them. Rent arrives on time and I get monthly updates." },
  { name: "Anil Kapoor", role: "Office lease, CP", text: "They found us a perfect office in Connaught Place within two weeks. Professional, transparent and genuinely helpful." },
  { name: "Neha Gupta", role: "Sold flat in Gurugram", text: "Sold our apartment above market rate in just 34 days. The pricing advice and buyer screening were outstanding." },
  { name: "Vikram Singh", role: "Plot investor", text: "Their investment advisory is spot on. The plot I bought on Sohna Road has appreciated 40% in three years." },
];

export const clients = ["DLF", "Godrej Properties", "M3M", "Sobha", "Tata Housing", "ATS Greens", "Mahagun", "Prestige Group"];

export const faqs = [
  { q: "Is the first consultation really free?", a: "Yes. Your first consultation — in person, on call or video — is completely free with no obligation." },
  { q: "How do you verify properties?", a: "Our legal team checks title deeds, approvals, encumbrances and builder RERA status, followed by a physical inspection." },
  { q: "Do you help with home loans?", a: "Absolutely. We partner with 15+ banks and NBFCs to get you the best rates and handle all the paperwork." },
  { q: "Which areas do you cover?", a: "All of Delhi-NCR — Delhi, Noida, Greater Noida, Gurugram, Faridabad and Ghaziabad." },
  { q: "What are your charges?", a: "Our fees are transparent and shared upfront. Many services like site visits and consultation are free." },
];

export const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
];

export const homeAnchors = [
  { label: "Services", hash: "services" },
  { label: "Properties", hash: "properties" },
  { label: "Gallery", hash: "gallery" },
  { label: "Contact", hash: "contact" },
];

export const team = [
  { name: "Rajesh Pandit", role: "Founder & CEO" },
  { name: "Sunita Pandit", role: "Head of Legal" },
  { name: "Aman Verma", role: "Investment Advisor" },
  { name: "Kavya Iyer", role: "Client Relations" },
];

export const journey = [
  { year: "2014", title: "The Beginning", desc: "Started as a two-person consultancy in South Delhi with a promise of honest advice." },
  { year: "2017", title: "Expanding to NCR", desc: "Opened offices in Noida and Gurugram and crossed 300 happy families." },
  { year: "2020", title: "Going Digital", desc: "Launched virtual tours and NRI services, serving clients across 12 countries." },
  { year: "2024", title: "1000+ Deals", desc: "Crossed 1,000 properties sold with a legal and loan team under one roof." },
];

export const themes = [
  { id: "emerald", name: "Emerald Gold", swatch: ["#04201a", "#d4a017"] },
  { id: "navy", name: "Royal Navy", swatch: ["#0a1631", "#e0b453"] },
  { id: "sunset", name: "Sunset Orange", swatch: ["#24110a", "#f07a2b"] },
  { id: "purple", name: "Purple Luxe", swatch: ["#1a0d2e", "#c9a0ff"] },
] as const;

export const WHATSAPP = "https://wa.me/919999999999";

export interface FlagshipProject {
  id: number;
  title: string;
  subtitle?: string;
  location: string;
  price: string;
  category: "Residential" | "Commercial" | "Land & Plots";
  status: "JUST LAUNCHED" | "UNDER CONSTRUCTION";
  image: string;
  alt: string;
}

export const flagshipProjects: FlagshipProject[] = [
  {
    id: 1,
    title: "M3M Mansion",
    subtitle: "Luxury Residences on Dwarka Expressway",
    location: "Sector 111, Gurgaon",
    price: "₹4.68 Cr*",
    category: "Residential",
    status: "JUST LAUNCHED",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
    alt: "M3M Mansion luxury high-rise exterior, Gurgaon"
  },
  {
    id: 2,
    title: "Metropolitan One",
    location: "Sector 140A, Noida Expressway",
    price: "₹95 Lakh onwards",
    category: "Commercial",
    status: "UNDER CONSTRUCTION",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    alt: "Metropolitan One commercial tower, Noida Expressway"
  },
  {
    id: 3,
    title: "Om Dream Homes",
    location: "Sector 27, Jhajjar",
    price: "₹62 Lakh*",
    category: "Residential",
    status: "JUST LAUNCHED",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    alt: "Om Dream Homes residential community, Jhajjar"
  },
  {
    id: 4,
    title: "Sector 27 Plots",
    location: "Gurgaon",
    price: "Price on request",
    category: "Land & Plots",
    status: "JUST LAUNCHED",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    alt: "Sector 27 plots land development, Gurgaon"
  },
  {
    id: 5,
    title: "Residences by ELIE",
    location: "Gurgaon",
    price: "Price on request",
    category: "Residential",
    status: "UNDER CONSTRUCTION",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Residences by ELIE luxury apartments, Gurgaon"
  }
];
