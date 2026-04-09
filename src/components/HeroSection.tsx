"use client";

import { Link } from "@/i18n/routing";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import logoBig from "@/public/logo-big.png"
import { getOptimizedUrl } from "@/lib/images";
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('Hero');

  const FEATURED_DESTINATIONS = [
    {
      name: "Oaxaca",
      slug: "exp-012",
      image: getOptimizedUrl("https://images.unsplash.com/photo-1660670173026-ec491dd3dd1a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      label: t('labels.culture')
    },
    {
      name: "Los Cabos",
      slug: "exp-007",
      image: getOptimizedUrl("https://images.unsplash.com/photo-1587673461694-f0b160bef05c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      label: t('labels.luxury')
    },
    {
      name: "Xochimilco",
      slug: "exp-002",
      image: getOptimizedUrl("https://images.unsplash.com/photo-1564762332974-5bf63a654c9d?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      label: t('labels.magic')
    },
    {
      name: "Querétaro",
      slug: "exp-008",
      image: getOptimizedUrl("https://images.unsplash.com/photo-1591933733584-bf9577821973?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      label: t('labels.history')
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2D0021]">
      {/* Background con gradiente sutil y overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40"
        style={{
          backgroundImage: "url('https://outdoors.com/wp-content/uploads/2024/06/real-life-jungle-cruise-6.jpg?w=1200')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/80 via-magenta-900/40 to-yellow-500/10" />

      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-20 flex flex-col min-h-screen justify-center">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* SECCIÓN IZQUIERDA: LOGO Y TÍTULO SECUNDARIO */}
          <div className="lg:col-span-4 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative w-48 md:w-64 animate-pulse-slow">
              <Image
                src={logoBig}
                width={500}
                height={325}
                alt="Logo Principal"
                className="object-contain filter drop-shadow-[0_0_15px_rgba(217,0,98,0.5)]"
                priority
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extralight text-yellow-400 leading-tight">
                {t('explore_the')} <br /> 
                <span className="font-black italic text-white uppercase tracking-tighter block mt-2 text-5xl md:text-6xl">
                  {t('store')}
                </span>
              </h2>
            </div>
          </div>

          {/* SECCIÓN DERECHA: TEXTO PRINCIPAL Y CTA */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-10">
            <div className="border-l-4 border-magenta-500 pl-8 space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                {t('title_visit')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-yellow-400">{t('title_mexico')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed">
                {t('description')}
              </p>
            </div>

            <div className="flex justify-start">
              <Link
                href="/experiencias"
                className="group relative overflow-hidden bg-magenta-600 hover:bg-magenta-500 text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(217,0,98,0.4)] flex items-center gap-4"
              >
                <span className="relative z-10">{t('start_trip')}</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-magenta-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER: DESTINOS CON DISEÑO DE CARDS FLOTANTES */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {FEATURED_DESTINATIONS.map((dest, idx) => (
            <Link
              key={dest.slug}
              href={`/experiencias/${dest.slug}`}
              className={`group relative h-48 md:h-72 rounded-[2rem] overflow-hidden transition-all duration-700  ${
                idx % 2 === 0 ? "mt-0" : "mt-8"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-magenta-900/20 to-transparent opacity-60 group-hover:opacity-90" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2  transition-transform duration-500">
                  <MapPin className="w-3 h-3 text-yellow-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest  text-yellow-400">
                    {dest.label}
                  </span>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold text-yellow-400 transition-colors">
                  {dest.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Elemento decorativo: Círculo de luz magenta */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-magenta-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}