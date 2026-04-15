"use client";

import { getOptimizedUrl } from "@/lib/images";
import { Globe2Icon } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ConocenosSection() {
  const t = useTranslations('About');

  return (
    <section id="conocenos" className="relative bg-[#0f0720] py-24 overflow-hidden">
      {/* Elementos de fondo decorativos (Blurs) */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-magenta-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Contenedor de Imagen con Efectos */}
          <div className="lg:w-1/2 relative group">
            {/* Glow perimetral */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-magenta-500 to-yellow-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative w-full h-[450px] lg:h-[550px] rounded-[1.8rem] overflow-hidden shadow-2xl border border-white/10">
              <img
                src={getOptimizedUrl("https://images.unsplash.com/photo-1512442827816-8e5a088619c9?q=80&w=835&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t('image_alt')}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="eager"
              />
              {/* Overlay gradiente sobre la imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0720]/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bloque de Contenido */}
          <div className="lg:w-1/2">
            <div className="inline-block">
              <p className="text-yellow-400 bg-clip-text  font-abel text-2xl mb-3 font-medium uppercase tracking-widest">
                {t('subtitle')}
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-transparent mb-6 rounded-full" />
            </div>

            <h2 className="font-anton text-6xl lg:text-8xl mb-8 tracking-tight italic">
              <span className="text-white">Trip</span>
              <span className="text-transparent bg-clip-text bg-magenta-500"> Craft MX</span>
            </h2>

            <div className="backdrop-blur-md bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl mb-10">
              <p className="text-white/90 text-xl leading-relaxed font-light">
                {t.rich('description', {
                  brand: (chunks) => (
                    <span className="font-bold text-magenta-400 drop-shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                      {chunks}
                    </span>
                  )
                })}
              </p>
            </div>

            {/* Feature Item con Glassmorphism */}
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-br from-violet-900/40 to-transparent border-l-4 border-yellow-400 transition-all hover:translate-x-2">
              <div className="p-3 bg-yellow-400 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                <Globe2Icon className="w-7 h-7 text-[#0f0720]" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white block mb-1">
                  {t('essense_title')}
                </span>
                <p className="text-white/70 text-lg leading-snug">
                  {t('essense_description')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Estilos específicos para los colores Magenta que no vienen por defecto en Tailwind estándar */}
      <style jsx>{`
        .bg-magenta-500 { background-color: #ff00ff; }
        .from-magenta-500 { --tw-gradient-from: #ff00ff; --tw-gradient-to: rgb(255 0 255 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .text-magenta-400 { color: #ff4dff; }
      `}</style>
    </section>
  );
}