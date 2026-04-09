"use client";

import { useParams } from "next/navigation";
import { useExperience } from "@/hooks/useExperience";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Check, ChevronLeft, ChevronRight, ShoppingCart, Users, X, MapPin, Clock, Tag } from "lucide-react";
import { useCart } from "@/context/cartContext";
import Loading from "@/components/Loading";
import { useTranslations } from 'next-intl';

export default function ExperienceDetailPage() {
    const t = useTranslations('ExperienceDetail');
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();
    const { data, loading, error } = useExperience(id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [selection, setSelection] = useState({
        fecha: "",
        personas: 1,
    });
    const [addedToCart, setAddedToCart] = useState(false);

    if (loading) return <Loading />;
    if (error || !data) return <div className="p-10 text-center text-red-500 font-anton">{t('error_loading')}</div>;

    const priceNumber = Number(data.price);
    const total = priceNumber * selection.personas;
    const images = data.images?.length ? data.images : [data.image];

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedImage((prev) => prev === 0 ? images.length - 1 : prev - 1);

    const handleAddToCart = () => {
        if (!selection.fecha) {
            alert(t('alerts.select_date'));
            return;
        }
        addToCart({
            experienceId: data.id,
            title: data.title,
            destinationName: data.destinationName ?? "",
            price: Number(data.price),
            personas: selection.personas,
            fecha: selection.fecha,
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    return (
        <div className="bg-[#0d0221] min-h-screen text-white">
            <Header />

            {/* HERO BACKGROUND DECORATION */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* 🖼 IZQUIERDA (7 COL) → GALERÍA CINEMATOGRÁFICA */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <img
                                src={images[selectedImage]}
                                onClick={() => setGalleryOpen(true)}
                                className="w-full h-[500px] object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0221]/60 to-transparent pointer-events-none" />
                            <button 
                                onClick={() => setGalleryOpen(true)}
                                className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full hover:bg-magenta-500 transition-colors"
                            >
                                <Users size={20} />
                            </button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {images.map((img: any, i: number) => (
                                <img
                                    key={i}
                                    src={img}
                                    onClick={() => setSelectedImage(i)}
                                    className={`h-24 w-24 flex-shrink-0 object-cover rounded-2xl cursor-pointer border-2 transition-all ${
                                        selectedImage === i ? "border-magenta-500 scale-105 shadow-[0_0_15px_rgba(255,0,255,0.4)]" : "border-white/10 opacity-50 hover:opacity-100"
                                    }`}
                                />
                            ))}
                        </div>

                        {/* DESCRIPCIÓN DETALLADA (DEBAJO DE GALERÍA EN DESKTOP) */}
                        <div className="mt-12 space-y-8">
                            <section>
                                <h2 className="text-magenta-500 font-anton text-sm uppercase tracking-[0.4em] mb-4">
                                    {t('sections.description_title')}
                                </h2>
                                <p className="text-white/70 leading-relaxed text-xl font-light italic">
                                    "{data.description}"
                                </p>
                            </section>

                            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                                <h3 className="text-2xl font-anton text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
                                    {t('sections.guidelines.title')}
                                </h3>

                                <div className="space-y-6 text-white/60 leading-7 font-light">
                                    <p className="text-justify">
                                        {t.rich('sections.guidelines.p1', {
                                            bold: (chunks) => <span className="text-magenta-400 font-bold underline decoration-magenta-500/30">{chunks}</span>
                                        })}
                                    </p>

                                    <div className="bg-[#0d0221]/50 p-6 rounded-2xl border-l-4 border-violet-600">
                                        <p className="mb-4 font-anton text-white tracking-wider uppercase text-sm">
                                            {t('sections.guidelines.options_title')}
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-400 font-anton text-xs mt-1">A</span>
                                                <span>{t.rich('sections.guidelines.option_a', {
                                                    bold: (chunks) => <span className="text-white font-semibold">{chunks}</span>
                                                })}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-yellow-400 font-anton text-xs mt-1">B</span>
                                                <span>{t.rich('sections.guidelines.option_b', {
                                                    bold: (chunks) => <span className="text-white font-semibold">{chunks}</span>
                                                })}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <footer className="pt-6 border-t border-white/10 italic text-[11px] text-white/40 leading-relaxed">
                                        <p>
                                            <strong className="text-magenta-500 not-italic uppercase tracking-[0.2em] mr-2">{t('sections.legal.label')}:</strong>
                                            {t.rich('sections.legal.text', {
                                                strong: (chunks) => <strong className="text-white/60">{chunks}</strong>
                                            })}
                                        </p>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🧾 DERECHA (5 COL) → INFO + CARD DE RESERVA CRISTALINA */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h1 className="text-5xl md:text-6xl font-anton uppercase leading-none tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                    {data.title}
                                </h1>

                                <div className="flex flex-wrap gap-4 items-center mb-6">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-anton uppercase tracking-widest text-yellow-400">
                                        <MapPin size={14} /> {data.destinationName}
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-anton uppercase tracking-widest text-magenta-400">
                                        <Clock size={14} /> {data.duration}
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-anton uppercase tracking-widest text-violet-400">
                                        <Tag size={14} /> {data.category}
                                    </div>
                                </div>
                            </div>

                            {/* 🔥 CARD COMPRA REIMAGINADA */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-magenta-500 to-violet-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-8">
                                    
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-magenta-500 font-anton uppercase tracking-[0.3em] mb-1">{t('purchase_card.price_from')}</p>
                                            <div className="text-5xl font-anton text-white tracking-tighter">MNX {data.priceFormatted}</div>
                                        </div>
                                        <div className="text-right text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                            {t('purchase_card.tax_note')}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 pt-6 border-t border-white/10">
                                        <div className="space-y-3">
                                            <label className="text-xs font-anton text-yellow-400 uppercase tracking-widest flex items-center gap-2">
                                                <Calendar size={14} /> {t('purchase_card.labels.date')}
                                            </label>
                                            <input
                                                type="date"
                                                min={new Date().toISOString().split('T')[0]}
                                                value={selection.fecha}
                                                onChange={(e) => setSelection({ ...selection, fecha: e.target.value })}
                                                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl focus:border-magenta-500 text-white font-medium outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-anton text-magenta-400 uppercase tracking-widest flex items-center gap-2">
                                                <Users size={14} /> {t('purchase_card.labels.people')}
                                            </label>
                                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2">
                                                <button
                                                    onClick={() => setSelection(s => ({ ...s, personas: Math.max(1, s.personas - 1) }))}
                                                    className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl hover:bg-magenta-500 transition-colors font-anton text-2xl"
                                                >-</button>
                                                <span className="flex-grow text-center font-anton text-xl">{selection.personas}</span>
                                                <button
                                                    onClick={() => setSelection(s => ({ ...s, personas: s.personas + 1 }))}
                                                    className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl hover:bg-magenta-500 transition-colors font-anton text-2xl"
                                                >+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex justify-between mb-6">
                                            <span className="text-[10px] text-white/40 font-anton uppercase tracking-[0.3em]">{t('purchase_card.subtotal')}</span>
                                            <span className="text-3xl font-anton text-white">${total.toLocaleString('en-US')}</span>
                                        </div>

                                        <button
                                            onClick={handleAddToCart}
                                            className={`w-full py-5 rounded-2xl font-anton uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-3 ${
                                                addedToCart
                                                ? "bg-green-500 text-white"
                                                : "bg-gradient-to-r from-magenta-600 to-violet-600 hover:shadow-[0_0_25px_rgba(255,0,255,0.4)] text-white shadow-lg"
                                            }`}
                                        >
                                            {addedToCart ? (
                                                <><Check /> {t('purchase_card.buttons.added')}</>
                                            ) : (
                                                <><ShoppingCart size={22} /> {t('purchase_card.buttons.add_to_cart')}</>
                                            )}
                                        </button>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-3 items-center">
                                        <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em]">
                                            {t('purchase_card.confirmation_note')}
                                        </p>
                                        <div className="flex gap-4 text-[10px] text-white/50 font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1 text-green-400/70">✔ {t('purchase_card.trust_badges.quick')}</span>
                                            <span className="flex items-center gap-1 text-green-400/70">✔ {t('purchase_card.trust_badges.secure')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* MODAL GALERÍA OSCURO */}
            {galleryOpen && (
                <div className="fixed inset-0 bg-[#0d0221]/95 backdrop-blur-2xl flex items-center justify-center z-[100] animate-in fade-in duration-300">
                    <button onClick={() => setGalleryOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                        <X size={40} />
                    </button>
                    <button onClick={prevImage} className="absolute left-8 text-magenta-500 hover:scale-125 transition-transform">
                        <ChevronLeft size={60} />
                    </button>
                    <img src={images[selectedImage]} className="max-h-[85vh] max-w-[90vw] object-contain rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" />
                    <button onClick={nextImage} className="absolute right-8 text-magenta-500 hover:scale-125 transition-transform">
                        <ChevronRight size={60} />
                    </button>
                    <div className="absolute bottom-8 text-white/40 font-anton uppercase tracking-widest">
                        {selectedImage + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}