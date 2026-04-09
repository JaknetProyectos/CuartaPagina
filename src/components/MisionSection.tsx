"use client";

import { useTranslations } from 'next-intl';

export default function MisionSection() {
  const t = useTranslations('Mission');

  return (
    <section className="relative min-h-[70vh] bg-[#0d0221] overflow-hidden flex items-center justify-center">
      {/* Background Image con tratamiento de color y mezcla */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat opacity-40 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-[2000ms]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506261423908-ea2559c1f24c?q=80&w=884&auto=format&fit=crop')",
        }}
      />
      
      {/* Capas de gradientes y blurs para el estilo solicitado */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0221] via-violet-900/40 to-[#ff00ff]/20" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-magenta-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh] text-center">
        {/* Mission Title con efecto de máscara y resplandor */}
        <div className="relative group">
          <h2 className="font-anton text-8xl md:text-[10rem] lg:text-[14rem] leading-none mb-8 uppercase
            text-transparent bg-clip-text bg-gradient-to-b from-white via-white/10 to-transparent 
            opacity-30 tracking-tighter select-none transition-opacity duration-700 group-hover:opacity-50">
            {t('title')}
          </h2>
          
          {/* Título flotante secundario para legibilidad y diseño */}
          <span className="absolute inset-0 flex items-center justify-center font-anton text-5xl md:text-7xl lg:text-8xl text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.5)] uppercase italic">
            {t('title')}
          </span>
        </div>

        {/* Mission Text dentro de un contenedor con glassmorphism */}
        <div className="relative max-w-5xl mt-[-2rem] md:mt-[-4rem]">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-magenta-500 rounded-[2rem] blur opacity-20 transition duration-1000 group-hover:opacity-40" />
          
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-14 rounded-[2rem] shadow-2xl">
            <p className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed font-light tracking-wide">
              {t('description')}
            </p>
            
            {/* Detalle decorativo inferior (línea magenta/amarillo) */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-magenta-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-magenta-500" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-magenta-500 { background-color: #ff00ff; }
        .from-magenta-500 { --tw-gradient-from: #ff00ff; --tw-gradient-to: rgb(255 0 255 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      `}</style>
    </section>
  );
}