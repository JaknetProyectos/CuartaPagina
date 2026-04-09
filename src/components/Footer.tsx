"use client";
import visa from "@/public/visa.png"
import mastercard from "@/public/mastercard.png"
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <footer className="relative bg-[#0d0221] text-white overflow-hidden border-t border-white/10">
      {/* Línea de gradiente superior */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-magenta-500 to-transparent opacity-50" />
      
      {/* Blurs decorativos */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 lg:gap-12">
          
          {/* Brand & Language Switcher */}
          <div className="md:col-span-1 space-y-8">
            <div className="flex items-center gap-2 group cursor-default">
              <span className="font-anton italic uppercase tracking-tighter text-3xl transition-transform group-hover:skew-x-[-10deg] duration-300">
                Trip <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-500 to-yellow-400">Craft MX</span>
              </span>
            </div>
            <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-bold">
              {t('brand_description')}
            </p>
            
            {/* SELECTOR DE IDIOMA REDISEÑADO */}
            <div className="pt-2">
              <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit backdrop-blur-md">
                <button 
                  onClick={() => handleLocaleChange('es')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500 ${locale === 'es' ? 'bg-gradient-to-r from-magenta-600 to-violet-600 text-white shadow-[0_0_15px_rgba(255,0,255,0.4)]' : 'hover:bg-white/5 text-white/30'}`}
                >
                  <span className="text-sm">🇲🇽</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">ES</span>
                </button>
                <button 
                  onClick={() => handleLocaleChange('en')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500 ${locale === 'en' ? 'bg-gradient-to-r from-magenta-600 to-violet-600 text-white shadow-[0_0_15px_rgba(255,0,255,0.4)]' : 'hover:bg-white/5 text-white/30'}`}
                >
                  <span className="text-sm">🇺🇸</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">EN</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pagos */}
          <div className="flex flex-col">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-400 mb-8 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-yellow-400" /> {t('sections.payments')}
            </h4>
            <div className="flex flex-row md:flex-col gap-6 items-start">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-magenta-500/50 transition-colors group">
                  <Image src={visa} alt="visa" width={55} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-magenta-500/50 transition-colors group">
                  <Image src={mastercard} alt="mastercard" width={55} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-magenta-500 mb-8 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-magenta-500" /> {t('sections.contact')}
            </h4>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-[0.2em]">
              <li>
                <Link href="/#contactanos" className="text-white/60 hover:text-yellow-400 transition-colors block">
                  contacto@vivatrip.com
                </Link>
              </li>
              <li>
                <Link href="/#contactanos" className="text-white/60 hover:text-yellow-400 transition-colors block">
                  + 52 1 55 1234 1234
                </Link>
              </li>
              <li className="pt-2">
                <span className="text-white/20 italic text-[10px]">CDMX, {t('country')}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-violet-400 mb-8 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-violet-400" /> {t('sections.legal')}
            </h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em]">
              {[
                { href: "/legal/terminos", label: t('legal_links.terms') },
                { href: "/legal/reembolsos", label: t('legal_links.refunds') },
                { href: "/legal/privacidad", label: t('legal_links.privacy') },
                { href: "/legal/consumidor", label: t('legal_links.consumer') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            {t('copyright', { year: 2026 })}
          </p>
          <div className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-magenta-500/40 hover:text-magenta-500 transition-colors cursor-default">
            <Globe size={14} className="group-hover:rotate-180 transition-transform duration-1000" />
            <span>{t('made_with_love')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}