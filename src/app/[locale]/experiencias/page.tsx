"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useExperiences } from "@/hooks/useExperiences";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Loading from "@/components/Loading";
import Image from "next/image";
import { getOptimizedUrl } from "@/lib/images";
import { useTranslations } from 'next-intl';

export default function ExperiencesPage() {
    const t = useTranslations('Experiences');
    const params = useParams();
    const [page, setPage] = useState(1);

    const {
        data,
        loading,
        error,
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
    } = useExperiences({
        page,
        pageSize: 12,
    });

    if (loading) {
        return <Loading />
    }

    return (
        <div className="bg-[#0d0221] min-h-screen text-white">
            <Header />
            
            {/* Hero Section: Fondo Oscuro para contraste de Navbar */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute top-20 -right-20 w-96 h-96 bg-magenta-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-yellow-400 font-anton text-sm uppercase tracking-[0.5em] mb-6 animate-pulse">
                            {t('upper_subtitle') || 'TRIP CRAFT MX // SELECCIÓN'}
                        </span>
                        <h1 className="font-anton text-6xl md:text-8xl lg:text-[10rem] uppercase leading-[0.8] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                            {t('title')}
                        </h1>
                        <div className="h-1 w-24 bg-magenta-500 rounded-full shadow-[0_0_15px_#ff00ff]" />
                    </div>
                </div>
            </section>

            <section className="pb-32 relative z-10">
                <div className="container mx-auto px-6">
                    {/* Grid de Experiencias */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                        {data.map((exp) => (
                            <Link
                                key={exp.id}
                                href={`/experiencias/${exp.id}`}
                                className="group flex flex-col relative"
                            >
                                {/* Contenedor de Imagen con Neón */}
                                <div className="relative h-[450px] w-full mb-8 overflow-hidden rounded-[2.5rem] border border-white/10 transition-all duration-500 group-hover:border-magenta-500/50 shadow-2xl">
                                    <Image
                                        src={getOptimizedUrl(exp.image)}
                                        alt={exp.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                                    />
                                    
                                    {/* Overlay Gradiente Constante */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0221] via-[#0d0221]/20 to-transparent opacity-80" />
                                    
                                    {/* Información sobre la imagen (Duración) */}
                                    <div className="absolute top-6 right-6">
                                        <div className="backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 rounded-2xl">
                                            <p className="text-[10px] font-anton uppercase tracking-widest text-yellow-400">
                                                ⏱ {exp.duration}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Precio Flotante Estilo Ticket */}
                                    <div className="absolute bottom-8 left-8">
                                        <span className="text-[10px] font-black text-magenta-500 uppercase tracking-widest block mb-1 drop-shadow-md">
                                            {t('from_label')}
                                        </span>
                                        <p className="text-4xl font-anton text-white tracking-tighter drop-shadow-lg">
                                            MXN {exp.priceFormatted}
                                        </p>
                                    </div>
                                </div>

                                {/* Texto Inferior */}
                                <div className="space-y-4 px-4">
                                    <h2 className="font-anton text-3xl uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors duration-300 leading-none">
                                        {exp.title}
                                    </h2>

                                    <p className="text-white/50 text-sm line-clamp-2 font-light leading-relaxed">
                                        {exp.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 pt-2">
                                        <div className="h-[1px] flex-grow bg-white/10 group-hover:bg-magenta-500/50 transition-colors" />
                                        <span className="text-[10px] text-magenta-500 font-anton uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            Ver Detalle +
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty state - Dark Glass */}
                    {data.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-40 bg-white/5 border border-white/10 rounded-[3.5rem] backdrop-blur-sm">
                            <div className="text-6xl mb-6 opacity-20">🚀</div>
                            <p className="font-anton text-2xl uppercase tracking-[0.4em] text-white/20">
                                {t('empty_state')}
                            </p>
                        </div>
                    )}

                    {/* Paginación - Diseño de Estación Espacial */}
                    {totalPages > 1 && (
                        <div className="mt-32 flex flex-col items-center">
                            <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl shadow-2xl">
                                <button
                                    disabled={!hasPrevPage}
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                        setPage((prev) => Math.max(prev - 1, 1))
                                    }}
                                    className="px-10 py-4 text-white text-[10px] font-anton uppercase tracking-[0.3em] disabled:opacity-10 hover:text-yellow-400 transition-all rounded-full"
                                >
                                    PREV
                                </button>
                                
                                <div className="w-10 h-10 flex items-center justify-center bg-magenta-500 rounded-full shadow-[0_0_20px_#ff00ff]">
                                    <span className="text-[10px] font-anton text-[#0d0221]">{currentPage}</span>
                                </div>

                                <button
                                    disabled={!hasNextPage}
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                        setPage((prev) => prev + 1)
                                    }}
                                    className="px-10 py-4 text-white text-[10px] font-anton uppercase tracking-[0.3em] disabled:opacity-10 hover:text-magenta-500 transition-all rounded-full"
                                >
                                    NEXT
                                </button>
                            </div>
                            
                            <span className="mt-8 text-[9px] font-black text-white/20 uppercase tracking-[0.6em]">
                                PAGE {currentPage} OF {totalPages}
                            </span>
                        </div>
                    )}
                </div>
            </section>
            
            <Footer />
        </div>
    );
}