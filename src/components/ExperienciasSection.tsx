"use client";

import { useTranslations } from 'next-intl';

export default function ExperienciasSection() {
  const t = useTranslations('Experiences');

  return (
    <section id="experiencias" className="relative bg-[#0d0221] py-24 overflow-hidden">
      {/* Luces de fondo (Blurs) */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-magenta-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Big Title con efecto de profundidad y gradiente */}
        <div className="relative mb-12 lg:mb-20">
          <h2 className="font-anton text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent text-7xl md:text-9xl lg:text-[13rem] leading-none text-center uppercase select-none">
            {t('hero_title')}
          </h2>
          <h2 className="absolute inset-0 flex items-center justify-center font-anton text-white text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter mix-blend-overlay opacity-80">
            {t('hero_title')}
          </h2>
        </div>

        {/* Content Grid: Diseño de tarjeta flotante */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Image con borde neón y rotación sutil */}
          <div className="lg:w-2/5 relative z-20 mb-8 lg:mb-0">
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-magenta-500 to-violet-600 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative w-full h-[400px] lg:h-full min-h-[350px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1732738372625-8dc6a664ec78?q=80&w=387&auto=format&fit=crop"
                  alt={t('image_alt')}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0221] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

          {/* Text Content con Glassmorphism asimétrico */}
          <div className="lg:w-3/5 flex flex-col justify-center relative">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-16 rounded-[2rem] lg:-ml-20 z-30 shadow-2xl relative">
              {/* Badge de Acento Amarillo */}
              <div className="w-12 h-1 bg-yellow-400 mb-6" />
              
              <p className="text-magenta-400 font-bold uppercase tracking-[0.4em] text-xs mb-4 drop-shadow-[0_0_8px_rgba(255,0,255,0.4)]">
                {t('upper_subtitle')}
              </p>
              
              <h3 className="font-anton text-white text-4xl lg:text-6xl mb-8 leading-tight">
                {t('notice_title')}
              </h3>
              
              <div className="space-y-4">
                <p className="text-white/80 text-lg lg:text-xl leading-relaxed font-light">
                  {t.rich('notice_description', {
                    bold: (chunks) => (
                      <span className="font-bold text-yellow-400 border-b border-yellow-400/30">
                        {chunks}
                      </span>
                    )
                  })}
                </p>
              </div>

              {/* Decoración geométrica */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <div className="w-24 h-24 border-t-2 border-right-2 border-white rounded-tr-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-magenta-500 { background-color: #ff00ff; }
        .text-magenta-400 { color: #ff4dff; }
        .from-magenta-500 { --tw-gradient-from: #ff00ff; --tw-gradient-to: rgb(255 0 255 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      `}</style>
    </section>
  );
}