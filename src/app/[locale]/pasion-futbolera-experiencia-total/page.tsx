"use client";
import { Suspense, useState, useCallback, useEffect } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, CreditCard, Trophy, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from 'next-intl';
import { getOptimizedUrl } from "@/lib/images";

function PayFootballContent() {
    const t = useTranslations('PayFootball');
    const searchParams = useSearchParams();
    const queryFolio = searchParams.get('folio');
    const { getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    const [folio, setFolio] = useState("");
    const [montoManual, setMontoManual] = useState<string>("");
    const [quoteFound, setQuoteFound] = useState<any>(null);
    const [searching, setSearching] = useState(false);
    const [msg, setMsg] = useState("");

    const validateFolio = useCallback(async (f: string) => {
        if (!f || f.length < 3) return;
        setSearching(true);
        setMsg("");
        try {
            const data = await getQuoteByFolio(f.trim().toUpperCase());
            if (data) {
                setQuoteFound(data);
                setMontoManual(data.price?.toString() || "");
                setMsg(t('form.messages.found'));
            } else {
                setQuoteFound(null);
                setMsg(t('form.messages.external'));
            }
        } finally {
            setSearching(false);
        }
    }, [getQuoteByFolio, t]);

    useEffect(() => {
        if (queryFolio) {
            setFolio(queryFolio.toUpperCase());
            validateFolio(queryFolio.toUpperCase());
        }
    }, [queryFolio, validateFolio]);

    const handlePay = () => {
        if (!folio || !montoManual) return;
        addToCart({
            experienceId: quoteFound?.folio || folio.toUpperCase(),
            title: quoteFound?.experiencia_title || `${t('cart.title_prefix')}: ${folio.toUpperCase()}`,
            destinationName: "Pasión Futbolera VIP",
            price: Number(montoManual),
            personas: parseInt(quoteFound?.personas) || 1,
            fecha: new Date().toISOString().split('T')[0],
            description: quoteFound ? `${t('cart.passenger')}: ${quoteFound.nombre}` : t('cart.manual_folio')
        });
        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-6 max-w-6xl">
            {/* CARD DE PAGO CRISTALIZADA */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden grid md:grid-cols-2 shadow-2xl relative">
                
                {/* LADO INFO - DEGRADADO DEPORTIVO */}
                <div className="p-12 md:p-16 bg-gradient-to-br from-[#03A9F4] to-[#0d0221] text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Trophy size={180} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-6">
                            <Sparkles size={12} className="text-yellow-400" />
                            <span className="text-[10px] font-anton uppercase tracking-[0.3em]">
                                {t('branding.overline')}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-anton uppercase tracking-tighter leading-[0.85] mb-6">
                            {t('branding.title_part1')} <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                                {t('branding.title_part2')}
                            </span>
                        </h2>
                        <div className="h-1.5 w-16 bg-yellow-400 rounded-full mb-8 shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <p className="text-white text-lg leading-relaxed font-light italic border-l-2 border-white/20 pl-6">
                            {t('branding.description')}
                        </p>
                    </div>
                </div>

                {/* LADO FORMULARIO - DARK TECH */}
                <div className="p-10 md:p-16 bg-[#0d0221]/40 space-y-12 flex flex-col justify-center">
                    <div className="space-y-10">
                        {/* INPUT FOLIO */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-anton text-[#03A9F4] uppercase tracking-[0.4em] ml-1">
                                {t('form.labels.folio')}
                            </label>
                            <div className="flex items-center border-b border-white/10 focus-within:border-yellow-400 transition-all duration-500">
                                <input 
                                    type="text" 
                                    value={folio} 
                                    className="w-full bg-transparent py-5 text-3xl font-anton text-white outline-none uppercase tracking-widest placeholder:text-white"
                                    onChange={(e) => setFolio(e.target.value)} 
                                    onBlur={() => validateFolio(folio)} 
                                />
                                {searching ? (
                                    <Loader2 className="animate-spin text-[#03A9F4]" />
                                ) : (
                                    <Search className="text-white" size={24} />
                                )}
                            </div>
                            {msg && (
                                <div className="flex items-center gap-2 mt-2">
                                    <ShieldCheck size={12} className="text-[#03A9F4]" />
                                    <p className="text-[9px] font-anton uppercase text-[#03A9F4] tracking-widest">
                                        {msg}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* PANEL DE USUARIO ENCONTRADO */}
                        {quoteFound && (
                            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 animate-in fade-in slide-in-from-top-4 duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Trophy size={40} />
                                </div>
                                <p className="text-[9px] text-white uppercase font-anton tracking-[0.3em] mb-2">{t('form.labels.passenger')}</p>
                                <p className="text-2xl font-anton text-white uppercase tracking-tight">{quoteFound.nombre}</p>
                            </div>
                        )}

                        {/* INPUT MONTO */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-anton text-white uppercase tracking-[0.4em] ml-1">
                                {t('form.labels.amount')}
                            </label>
                            <div className="flex items-baseline gap-3 border-b border-white/10 focus-within:border-magenta-500 transition-all duration-500">
                                <span className="text-3xl font-anton text-white">$</span>
                                <input 
                                    type="number" 
                                    value={montoManual} 
                                    className="w-full bg-transparent py-4 text-6xl font-anton text-white outline-none tracking-tighter"
                                    onChange={(e) => setMontoManual(e.target.value)} 
                                />
                                <span className="text-xs font-anton text-white uppercase pb-4 tracking-widest">MXN</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handlePay} 
                        disabled={!folio || !montoManual} 
                        className="w-full bg-white text-[#0d0221] py-7 rounded-2xl font-anton uppercase text-xl tracking-[0.3em] hover:bg-yellow-400 transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-10 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
                    >
                        <CreditCard size={22} /> {t('form.submit_button')}
                    </button>
                </div>
            </div>

            {/* SECCIÓN EDITORIAL ESTILO REVISTA */}
            <section className="py-32 px-4 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full md:w-5/12 relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#03A9F4] to-magenta-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                            <img
                                src={getOptimizedUrl("https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                                alt="Stadium Atmosphere"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0221] via-transparent to-transparent opacity-80" />
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2rem] shadow-2xl hidden md:block group-hover:-translate-y-2 transition-transform duration-500">
                            <Trophy size={40} className="text-[#0d0221]" />
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 space-y-10">
                        <h2 className="text-6xl md:text-8xl font-anton uppercase tracking-tighter text-white leading-[0.85]">
                            {t('editorial.title')}
                        </h2>
                        <div className="space-y-8">
                            <p className="text-xl md:text-2xl font-light text-white italic border-l-4 border-yellow-400 pl-8">
                                {t.rich('editorial.subtitle', {
                                    white: (chunks) => <span className="text-white font-anton uppercase tracking-tight not-italic">{chunks}</span>
                                })}
                            </p>
                            <div className="h-px w-24 bg-magenta-500" />
                            <p className="text-xs tracking-[0.2em] font-medium leading-loose text-white uppercase">
                                {t('editorial.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function PayFootballPage() {
    const t = useTranslations('PayFootball');
    return (
        <div className="bg-[#0d0221] min-h-screen">
            <Header />
            <main className="pt-32 pb-24 overflow-hidden">
                <Suspense fallback={
                    <div className="py-40 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-[#03A9F4]" size={48} />
                        <span className="text-white text-[10px] font-anton uppercase tracking-[0.5em]">{t('loading')}</span>
                    </div>
                }>
                    <PayFootballContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}