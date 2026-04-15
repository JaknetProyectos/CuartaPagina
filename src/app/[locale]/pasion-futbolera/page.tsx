"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useQuotes } from "@/hooks/useCotizaciones";
import { Loader2, CheckCircle, Send, Trophy, ArrowRight, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { getOptimizedUrl } from "@/lib/images";

export default function FootballRequestPage() {
    const t = useTranslations('FootballRequest');
    const { createQuote } = useQuotes();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "", 
        email: "", 
        telefono: "", 
        detalles: "",
        personas: "1-2", 
        experiencia_title: "Pasión Futbolera: VIP", 
        experiencia_slug: "pasion-futbolera"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newQuote = await createQuote(formData as any);
            await fetch("/api/cotizacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: newQuote.id }),
            });
            setSubmitted(true);
        } catch (err) {
            alert(t('form.error_alert'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0d0221] min-h-screen">
            <Header />
            
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Elementos decorativos de fondo para evitar el vacío */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-magenta-500/5 blur-[100px] rounded-full -z-10" />

                <div className="relative z-10 container mx-auto px-6 max-w-5xl">
                    
                    {/* ENCABEZADO TIPO PREMIACIÓN */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
                            <Trophy size={16} className="text-yellow-400" />
                            <span className="text-[10px] font-anton uppercase tracking-[0.3em] text-white/70">Exclusive Event</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-anton uppercase tracking-tighter text-white leading-[0.85]">
                            {t('hero.title_part1')} <br />
                            <span className="text-transparent bg-clip-text bg-[#03A9F4]">
                                {t('hero.title_part2')}
                            </span>
                        </h1>
                    </div>

                    {/* TARJETA INFORMATIVA (CON LA IMAGEN DEL BALÓN) */}
                    <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl group transition-all duration-500 hover:border-[#03A9F4]/40 mb-12">
                        <div className="grid md:grid-cols-5 items-center">
                            {/* IMAGEN IZQUIERDA (BALÓN) */}
                            <div className="md:col-span-2 h-72 md:h-[400px] relative overflow-hidden">
                                <img
                                    src={getOptimizedUrl("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                                    alt="Estadio Experiencia"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0221] via-transparent to-transparent opacity-60 md:opacity-100" />
                                <div className="absolute top-6 left-6">
                                    <div className="bg-[#03A9F4] text-white p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                                        <Star size={20} fill="currentColor" />
                                    </div>
                                </div>
                            </div>

                            {/* CONTENIDO DERECHA */}
                            <div className="md:col-span-3 p-10 md:p-14 space-y-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-12 bg-magenta-500" />
                                        <span className="text-[11px] font-anton uppercase tracking-[0.5em] text-magenta-500">
                                            {t('card.overline')}
                                        </span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-anton uppercase tracking-tighter text-white leading-none">
                                        {t('card.title_part1')} <br />
                                        <span className="text-white/80">{t('card.title_part2')}</span>
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-base md:text-lg text-white font-light leading-relaxed border-l-2 border-[#03A9F4]/30 pl-8">
                                        {t.rich('card.description', {
                                            bold: (chunks) => <span className="text-white font-anton uppercase tracking-tight italic">{chunks}</span>,
                                            br: () => <br/>
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORMULARIO CRISTALIZADO */}
                    <div className="max-w-3xl mx-auto">
                        <div className="backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#03A9F4] to-magenta-600 rounded-full blur-3xl opacity-20" />
                            
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-anton text-white uppercase tracking-[0.3em] ml-4">{t('form.labels.name')}</label>
                                            <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-[#03A9F4] transition-all"
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-anton text-white uppercase tracking-[0.3em] ml-4">{t('form.labels.email')}</label>
                                            <input required type="email"  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-[#03A9F4] transition-all"
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-anton text-white uppercase tracking-[0.3em] ml-4">{t('form.labels.details')}</label>
                                        <textarea required rows={4}  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-[#03A9F4] resize-none transition-all"
                                            onChange={(e) => setFormData({ ...formData, detalles: e.target.value })} />
                                    </div>

                                    <button disabled={loading} className="w-full bg-white text-[#0d0221] py-6 rounded-2xl font-anton uppercase text-lg tracking-[0.3em] hover:bg-[#03A9F4] hover:text-white transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 shadow-xl disabled:opacity-20">
                                        {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> {t('form.submit_button')}</>}
                                    </button>

                                    <div className="mt-12 text-center border-t border-white/5 pt-10">
                                        <p className="text-[9px] text-white uppercase tracking-[0.4em] mb-4 font-bold">
                                            {t('form.footer.question')}
                                        </p>
                                        <Link href={"/pasion-futbolera-experiencia-total"}>
                                            <button className="text-yellow-400 text-[10px] font-anton uppercase tracking-[0.4em] hover:text-white transition-all flex items-center justify-center gap-3 mx-auto group">
                                                {t('form.footer.link')} 
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-24 space-y-8 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-5xl font-anton uppercase tracking-tighter text-white">{t('success.title')}</h4>
                                        <p className="text-white/40 text-sm max-w-sm mx-auto uppercase tracking-widest leading-loose">{t('success.description')}</p>
                                    </div>
                                    <button onClick={() => setSubmitted(false)} className="text-magenta-500 text-[10px] font-anton uppercase tracking-[0.3em]">Enviar otra solicitud</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
}