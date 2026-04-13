"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export default function ArmaAventuraSection() {
  const t = useTranslations('CustomAdventure');

  return (
    <section id="arma-aventura" className="relative min-h-screen bg-[#0d0221] overflow-hidden flex items-center">
      
      {/* Background Image con Mix-Blend-Mode y Gradiente */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat opacity-40 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-1000"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1697729995893-524dc0b91ecb?q=80&w=1032&auto=format&fit=crop')",
          }}
        />
        {/* Capas de color para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0221] via-violet-950/80 to-[#ff00ff]/10" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        
        {/* Titular Radical: Estilo Background-Text */}
        <div className="relative mb-[-4rem] lg:mb-[-8rem] pointer-events-none select-none">
          <h2 className="font-anton text-transparent stroke-text leading-none text-[15vw] lg:text-[18rem] uppercase opacity-20 whitespace-nowrap">
            {t('hero_title_line1')}
          </h2>
          <h2 className="font-anton text-white/10 leading-none text-[15vw] lg:text-[18rem] uppercase -mt-[5vw] lg:-mt-[8rem] ml-[10%]">
            {t('hero_title_line2')}
          </h2>
        </div>

        {/* Content Layout: Deconstruido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Imagen Flotante con Glassmorphism */}
          <div className="lg:col-span-5 lg:col-start-2 group">
            <div className="relative p-2 rounded-[2.5rem] bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <div className="relative w-full h-[350px] lg:h-[450px] rounded-[2rem] overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1679669192872-1733bfda6df2?q=80&w=387&auto=format&fit=crop"
                  alt={t('image_alt')}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent" />
              </div>
              
              {/* Badge Amarilla Flotante */}
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-[#0d0221] p-6 rounded-full font-anton text-2xl rotate-12 shadow-lg">
                EXPLORA
              </div>
            </div>
          </div>

          {/* Bloque de Información Desplazado */}
          <div className="lg:col-span-5 lg:pb-12">
            <div className="space-y-6">
              <div>
                <p className="text-yellow-400 font-bold uppercase tracking-[0.3em] text-sm mb-4">
                  {t('upper_subtitle')}
                </p>
                <h3 className="font-anton text-white text-5xl lg:text-7xl mb-6 uppercase leading-tight drop-shadow-2xl">
                  {t('main_subtitle')}
                </h3>
              </div>

              <div className="backdrop-blur-xl bg-violet-900/20 p-8 rounded-tr-[3rem] rounded-bl-[3rem] border-r-2 border-b-2 border-magenta-500/50 relative">
                <p className="text-white text-xl font-medium mb-4 italic">
                  "{t('question')}"
                </p>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  {t.rich('contact_text', {
                    contact: (chunks) => (
                      <span className="text-magenta-400 font-bold underline decoration-yellow-400 decoration-2 underline-offset-4 cursor-pointer hover:text-white transition-colors">
                        {chunks}
                      </span>
                    )
                  })}
                </p>

                <Link
                  href="/armatuaventura"
                  className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-violet-600 to-magenta-600 rounded-xl hover:from-magenta-600 hover:to-violet-600 shadow-[0_0_30px_rgba(255,0,255,0.3)] hover:shadow-yellow-400/20 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 uppercase tracking-widest text-sm group-hover:text-[#0d0221]">
                    {t('cta_button')}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .bg-magenta-600 { background-color: #d100d1; }
        .from-magenta-600 { --tw-gradient-from: #d100d1; --tw-gradient-to: rgb(209 0 209 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .text-magenta-400 { color: #ff4dff; }
        .border-magenta-500 { border-color: #ff00ff; }
      `}</style>
    </section>
  );
}