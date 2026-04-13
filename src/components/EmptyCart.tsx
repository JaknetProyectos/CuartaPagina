"use client";

import { useCart } from "@/context/cartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingBag, ArrowLeft, Compass, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export function EmptyCart() {
    const t = useTranslations('Cart');

    return (
        <div className="bg-[#0d0221] min-h-screen flex flex-col text-white">
            <Header />
            
            <main className="flex-grow flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">
                {/* Elementos de fondo decorativos */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-magenta-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                    
                    {/* Icono con Estilo Odyssey */}
                    <div className="relative mb-12">
                        <div className="absolute inset-0 bg-gradient-to-tr from-magenta-500 to-violet-600 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse" />
                        <div className="relative bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-md shadow-2xl">
                            <ShoppingBag size={80} className="text-white/10" strokeWidth={1} />
                            <div className="absolute -top-4 -right-4 bg-yellow-400 p-4 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,0.4)] rotate-12">
                                <Compass size={24} className="text-[#0d0221] animate-spin-slow" />
                            </div>
                            <Sparkles className="absolute -bottom-2 -left-2 text-magenta-500 animate-bounce" size={24} />
                        </div>
                    </div>

                    {/* Tipografía Anton y Estilo Editorial */}
                    <h2 className="text-7xl md:text-8xl font-anton uppercase tracking-tighter leading-none text-center mb-6">
                        {t('empty_title_part1')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-500 via-yellow-400 to-magenta-500 bg-[length:200%_auto] animate-gradient-x">
                            {t('empty_title_part2')}
                        </span>
                    </h2>

                    <p className="text-white/40 text-[10px] md:text-xs font-anton uppercase tracking-[0.4em] max-w-sm text-center leading-relaxed mb-16 opacity-80">
                        {t('empty_description')}
                    </p>

                    {/* Botones con Degradados y Hover Effects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
                        <Link href="/experiencias"
                            className="group relative overflow-hidden flex items-center justify-center gap-3 bg-white text-[#0d0221] py-6 rounded-2xl font-anton uppercase text-xs tracking-widest hover:bg-magenta-600 hover:text-white transition-all duration-500 shadow-2xl">
                            <span className="relative z-10">{t('explore_destinations')}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-magenta-600 to-violet-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>

                        <Link href="/pasion-futbolera"
                            className="flex items-center justify-center gap-3 border border-white/10 bg-white/5 text-white py-6 rounded-2xl font-anton uppercase text-xs tracking-widest hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 backdrop-blur-sm">
                            {t('football_passion')}
                        </Link>
                    </div>

                    {/* Link de Retroceso Estilizado */}
                    <Link href="/" className="group mt-16 flex items-center gap-3 text-[10px] font-anton text-white/30 uppercase tracking-[0.3em] hover:text-yellow-400 transition-all">
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> 
                        {t('back_home')}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}