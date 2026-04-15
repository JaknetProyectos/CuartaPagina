"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useExperiences } from "@/hooks/useExperiences";
import { Link } from "@/i18n/routing";
import { X, CheckCircle, Loader2, Send, Sparkles, MapPin } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function AdventurePlannerSection() {
    const t = useTranslations('AdventurePlanner');
    const { createQuote, loading } = useQuotes();
    const { data: experiences } = useExperiences({ pageSize: 20 });
    const [quoteId, setQuoteId] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        personas: "Individual",
        experiencia_slug: "",
        detalles: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const selectedExp = experiences?.find(ex => ex.id === form.experiencia_slug);

            const result = await createQuote({
                ...form,
                experiencia_title: selectedExp?.title || t('form.default_exp_title')
            } as any);

            await fetch("/api/cotizacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    id: result.id,
                    experiencia_title: selectedExp?.title || t('form.default_exp_title')
                }),
            });

            setQuoteId(result.id);
            setShowModal(true);

        } catch (err) {
            console.error(err);
            alert(t('form.error_alert'));
        }
    };

    return (
        <div className="bg-[#0d0221] min-h-screen">
            <Header />
            
            <main className="relative w-full overflow-hidden">
                {/* Background Layer con Overlay */}
                <div className="absolute inset-0 z-0">
                    <div 
                        className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40 scale-105"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')" }}
                    />
                    <div className="absolute inset-0 bg-[#0d0221]" />
                </div>

                {/* MODAL SUCCESS (GLASSMORPHISM) */}
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#0d0221]/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
                        <div className="relative bg-white w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                            <div className="h-3 w-full bg-gradient-to-r from-magenta-500 to-violet-600" />
                            <div className="p-10 text-center">
                                <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
                                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><CheckCircle size={40} /></div>
                                <h3 className="text-2xl font-anton uppercase tracking-tight text-[#0d0221] mb-2">{t('modal.title')}</h3>
                                <p className="text-sm text-gray-500 mb-8 font-medium px-4">{t('modal.description')}</p>
                                <button onClick={() => setShowModal(false)} className="w-full bg-[#0d0221] text-white py-4 rounded-2xl font-anton uppercase tracking-widest hover:bg-magenta-600 transition-all shadow-lg">{t('modal.button')}</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hero Content Section */}
                <section className="relative z-10 pt-40 pb-10 px-6 lg:px-20">
                    <div className="max-w-4xl">
                        <span className="text-yellow-400 font-anton text-xs uppercase tracking-[0.5em] mb-4 block animate-pulse">
                            {t('hero.overline')}
                        </span>
                        <h1 className="font-anton text-6xl md:text-9xl text-white uppercase leading-[0.85] tracking-tighter mb-6">
                            {t('hero.title')}
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl font-light italic">
                            {t('hero.description')}
                        </p>
                    </div>
                </section>

                {/* Form & Info Section */}
                <section className="relative z-10 container mx-auto px-6 pb-32 pt-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        
                        {/* TEXTO IZQUIERDA (Info adicional) */}
                        <div className="lg:col-span-5 space-y-10 self-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-anton text-white leading-none uppercase tracking-tighter">
                                    {t('content.title')}
                                </h2>
                                <p className="text-white/50 text-lg leading-relaxed font-light">
                                    {t('content.description')}
                                </p>
                            </div>
                        </div>

                        {/* FORMULARIO (GLASSMORPHISM DARK) */}
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-magenta-500 to-violet-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                            <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <div className="bg-gradient-to-r from-magenta-600 to-violet-700 p-8 text-white">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="text-lg font-anton uppercase tracking-widest leading-none">{t('form.header_title')}</h4>
                                            <p className="text-[10px] opacity-70 uppercase mt-2 tracking-[0.2em] font-bold">{t('form.header_subtitle')}</p>
                                        </div>
                                        <Sparkles className="text-yellow-400 animate-bounce" />
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-anton text-magenta-500 uppercase tracking-widest ml-1">{t('form.labels.name')}</label>
                                            <input
                                                required
                                                type="text"
                                                value={form.nombre}
                                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white text-sm focus:border-magenta-500 outline-none transition-all rounded-2xl"
                                                placeholder="Tu nombre completo"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-anton text-magenta-500 uppercase tracking-widest ml-1">{t('form.labels.email')}</label>
                                            <input
                                                required
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white text-sm focus:border-magenta-500 outline-none transition-all rounded-2xl"
                                                placeholder="email@ejemplo.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-anton text-violet-400 uppercase tracking-widest ml-1">{t('form.labels.phone')}</label>
                                            <input
                                                required
                                                type="tel"
                                                value={form.telefono}
                                                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white text-sm focus:border-magenta-500 outline-none transition-all rounded-2xl"
                                                placeholder="+52..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-anton text-violet-400 uppercase tracking-widest ml-1">{t('form.labels.group_type')}</label>
                                            <div className="relative">
                                                <select
                                                    value={form.personas}
                                                    onChange={(e) => setForm({ ...form, personas: e.target.value })}
                                                    className="w-full bg-[#0d0221] border border-white/10 px-5 py-4 text-white text-sm focus:border-magenta-500 outline-none appearance-none rounded-2xl font-medium"
                                                >
                                                    <option value="Individual">{t('form.options.individual')}</option>
                                                    <option value="Pareja">{t('form.options.couple')}</option>
                                                    <option value="+4 Grupo">{t('form.options.group')}</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">▼</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-anton text-yellow-400 uppercase tracking-widest ml-1">{t('form.labels.base_experience')}</label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={form.experiencia_slug}
                                                onChange={(e) => setForm({ ...form, experiencia_slug: e.target.value })}
                                                className="w-full bg-[#0d0221] border border-white/10 px-5 py-4 text-white text-sm focus:border-magenta-500 outline-none appearance-none rounded-2xl font-medium"
                                            >
                                                <option value="">{t('form.placeholders.select_adventure')}</option>
                                                {experiences?.map((exp) => (
                                                    <option key={exp.id} value={exp.id}>{exp.title}</option>
                                                ))}
                                            </select>
                                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-anton text-white/30 uppercase tracking-widest ml-1">{t('form.labels.details')}</label>
                                        <textarea
                                            rows={3}
                                            value={form.detalles}
                                            onChange={(e) => setForm({ ...form, detalles: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white text-sm focus:border-magenta-500 outline-none resize-none rounded-2xl transition-all"
                                            placeholder={t('form.placeholders.details')}
                                        />
                                    </div>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full bg-white text-[#0d0221] hover:bg-magenta-500 hover:text-white py-5 rounded-2xl font-anton text-xl uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-20"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> {t('form.submit_button')}</>}
                                    </button>

                                    <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <p className="text-[9px] text-white/30 uppercase font-black tracking-widest text-center">{t('form.footer.question')}</p>
                                        <Link href="/pagatuaventura" className="text-[10px] font-anton text-yellow-400 uppercase border-b border-yellow-400/30 hover:text-white hover:border-white transition-all tracking-widest">
                                            {t('form.footer.link')}
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}