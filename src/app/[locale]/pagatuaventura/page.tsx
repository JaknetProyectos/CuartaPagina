"use client";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, ShoppingCart, ShieldCheck, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { getOptimizedUrl } from "@/lib/images";

function PayQuoteContent() {
    const t = useTranslations('PayQuote');
    const searchParams = useSearchParams();
    const queryFolio = searchParams.get('folio');

    const [folio, setFolio] = useState("");
    const [montoManual, setMontoManual] = useState<string>("");
    const [quoteData, setQuoteData] = useState<any>(null);
    const [searching, setSearching] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const { getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    const autoSearch = useCallback(async (f: string) => {
        if (!f || f.length < 3) return;
        setSearching(true);
        setInfoMessage("");
        try {
            const data = await getQuoteByFolio(f.trim().toUpperCase());
            if (data) {
                setQuoteData(data);
                setMontoManual(data.price?.toString() || "");
                setInfoMessage(t('form.messages.found'));
            } else {
                setQuoteData(null);
                setInfoMessage(t('form.messages.external'));
            }
        } catch (err) {
            console.error("Error en búsqueda:", err);
        } finally {
            setSearching(false);
        }
    }, [getQuoteByFolio, t]);

    useEffect(() => {
        if (queryFolio) {
            const f = queryFolio.toUpperCase();
            setFolio(f);
            autoSearch(f);
        }
    }, [queryFolio, autoSearch]);

    const handleAddToBag = () => {
        if (!folio || !montoManual) return;

        addToCart({
            experienceId: quoteData?.folio || folio.toUpperCase(),
            title: quoteData?.experiencia_title || `${t('cart.custom_prefix')}: ${folio.toUpperCase()}`,
            destinationName: "Aventura Trip Craft MX",
            price: Number(montoManual),
            personas: quoteData ? (parseInt(quoteData.personas) || 1) : 1,
            fecha: new Date().toISOString().split('T')[0],
            description: quoteData ? `${t('cart.client')}: ${quoteData.nombre}` : `${t('cart.folio_label')}: ${folio.toUpperCase()}`
        });

        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-4 max-w-6xl animate-in fade-in duration-700">
            {/* CARD PRINCIPAL CRISTALIZADA */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 min-h-[650px] shadow-2xl">

                {/* LADO IZQUIERDO: BRANDING ATMOSFÉRICO */}
                <div className="relative hidden md:block overflow-hidden">
                    <img
                        src={getOptimizedUrl("https://plus.unsplash.com/premium_photo-1673971700988-346588461fa7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                        alt="Adventure"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0221] via-transparent to-transparent md:via-[#0d0221]/40" />
                    
                    <div className="relative z-10 p-16 text-white h-full flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="h-1.5 w-20 bg-magenta-500 rounded-full shadow-[0_0_15px_#ff00ff]" />
                            <h2 className="text-6xl font-anton uppercase tracking-tighter leading-[0.85]">
                                {t('branding.title_part1')} <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                    {t('branding.title_part2')}
                                </span>
                            </h2>
                            <p className="text-xs uppercase tracking-[0.4em] text-white font-bold leading-relaxed max-w-xs">
                                {t('branding.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: FORMULARIO HIGH-TECH */}
                <div className="p-10 md:p-20 flex flex-col justify-center bg-[#0d0221]/40">
                    <div className="mb-12">
                        <h1 className="text-[10px] font-anton text-white uppercase tracking-[0.5em] mb-3">
                            {t('form.header')}
                        </h1>
                        <div className="h-px w-full  opacity-30" />
                    </div>

                    <div className="space-y-10">
                        {/* INPUT FOLIO */}
                        <div className="relative group">
                            <label className="text-[9px] font-anton text-white uppercase tracking-[0.3em] block mb-2">
                                {t('form.labels.folio')}
                            </label>
                            <div className="flex items-center gap-4 border-b border-white/10 group-focus-within:border-yellow-400 transition-all duration-500">
                                <input
                                    type="text"
                                    placeholder="WNDR-XXXXX"
                                    value={folio}
                                    onChange={(e) => setFolio(e.target.value)}
                                    onBlur={() => autoSearch(folio)}
                                    className="w-full bg-transparent py-4 outline-none text-3xl font-anton uppercase tracking-widest text-white placeholder:text-white"
                                    required
                                />
                                {searching ? (
                                    <Loader2 className="animate-spin text-yellow-400" />
                                ) : (
                                    <Search size={24} className="text-white group-focus-within:text-yellow-400 transition-colors" />
                                )}
                            </div>

                            {infoMessage && (
                                <div className={`mt-3 flex items-center gap-2 text-[10px] font-anton uppercase tracking-widest ${quoteData ? 'text-green-400' : 'text-orange-400'}`}>
                                    {quoteData ? <ShieldCheck size={14} /> : <Info size={14} />}
                                    {infoMessage}
                                </div>
                            )}
                        </div>

                        {/* DATA RESULT (GLASS PANEL) */}
                        {quoteData && (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
                                <span className="text-[9px] font-anton text-white-500 uppercase tracking-widest block mb-2">{t('form.labels.passenger')}</span>
                                <p className="text-2xl font-anton text-white uppercase tracking-tight leading-none mb-1">{quoteData.nombre}</p>
                                <p className="text-[10px] text-white uppercase font-bold tracking-[0.2em]">{quoteData.experiencia_title}</p>
                            </div>
                        )}

                        {/* INPUT MONTO */}
                        <div className="space-y-3">
                            <label className="text-[9px] font-anton text-white uppercase tracking-[0.3em] block">
                                {t('form.labels.amount')}
                            </label>
                            <div className="flex items-end gap-3 border-b border-white/10 focus-within:border-magenta-500 transition-all duration-500">
                                <span className="text-3xl font-anton text-white pb-2">$</span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="0.00"
                                    className="w-full py-2 text-6xl font-anton text-white outline-none bg-transparent tracking-tighter"
                                    value={montoManual}
                                    onChange={(e) => setMontoManual(e.target.value)}
                                />
                                <span className="text-xs font-anton text-white-500 pb-4 tracking-widest">MXN</span>
                            </div>
                        </div>

                        {/* BOTÓN DE ACCIÓN */}
                        <button
                            onClick={handleAddToBag}
                            disabled={!folio || !montoManual || searching}
                            className="w-full bg-white text-[#0d0221] py-6 rounded-2xl font-anton uppercase text-lg tracking-[0.2em] shadow-[0_10px_30px_rgba(255,255,255,0.05)] hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-10 disabled:grayscale"
                        >
                            <ShoppingCart size={20} /> {t('form.submit_button')}
                        </button>
                    </div>
                </div>
            </div>

            {/* SECCIÓN EDITORIAL INFERIOR REDISEÑADA */}
            <section className="py-32 px-4 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full md:w-5/12 relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-magenta-500 to-violet-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                            <img
                                src={getOptimizedUrl("https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                                alt="Adventure Atmosphere"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0221] via-transparent to-transparent opacity-80" />
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 space-y-8">
                        <h2 className="text-5xl md:text-8xl font-anton uppercase tracking-tighter text-white leading-[0.85]">
                            {t('editorial.title')}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-xl md:text-2xl font-light text-white/80 italic border-l-4 border-magenta-500 pl-6">
                                {t('editorial.subtitle')}
                            </p>
                            <div className="h-px w-24 bg-yellow-400" />
                            <p className="text-sm tracking-[0.1em] font-medium leading-loose text-white/40 uppercase">
                                {t('editorial.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function PayQuotePage() {
    const t = useTranslations('PayQuote');
    return (
        <div className="bg-[#0d0221] min-h-screen">
            <Header />
            <div className="pt-32 pb-20 overflow-hidden">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="animate-spin text-white-500 mb-4" size={48} />
                        <span className="text-white text-[10px] font-anton uppercase tracking-[0.5em]">{t('loading')}</span>
                    </div>
                }>
                    <PayQuoteContent />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}