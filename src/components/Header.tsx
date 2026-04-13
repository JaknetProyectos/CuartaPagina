"use client";

import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, AtSign, Plane, Volleyball, Home } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();

  // Efecto para cambiar el estilo al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { href: "/", label: t('nav.about'), icon: Home },
    { href: "/experiencias", label: t('nav.experiences'), icon: Plane },
    { href: "/pasion-futbolera", label: t('nav.football_passion'), icon: Volleyball },
    { href: "/armatuaventura", label: t('nav.build_adventure'), icon: AtSign },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${
          scrolled 
          ? "py-2 bg-[#0d0221] border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]" 
          : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="relative z-[120] hover:scale-105 transition-transform" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={45}
                className="relative brightness-0 invert w-auto h-8 md:h-11"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 lg:px-5 py-2.5 flex gap-2 items-center text-white/70 hover:text-white transition-all font-anton uppercase text-[10px] lg:text-xs tracking-[0.15em]"
                >
                  <item.icon size={16} className="text-[#D1127C] group-hover:text-yellow-400 transition-colors" />
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>

            {/* Right side: Cart & Mobile Toggle */}
            <div className="flex items-center gap-3 md:gap-4 relative z-[120]">
              <Link
                href="/cart"
                className="group relative p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all"
              >
                <ShoppingCart className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#D1127C] to-violet-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="md:hidden p-2.5 bg-[#D1127C] rounded-xl text-white hover:bg-yellow-400 transition-colors shadow-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Corregido para scroll y visibilidad */}
      <div 
        className={`fixed inset-0 bg-[#0d0221] z-[105] md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 p-6 overflow-y-auto">
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`group flex flex-col items-center gap-3 transition-all duration-500 transform ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-yellow-400/50 transition-all">
                <item.icon size={28} className="text-[#D1127C] group-hover:text-yellow-400" />
              </div>
              <span className="font-anton text-2xl text-white uppercase tracking-wider group-hover:text-yellow-400 transition-colors text-center">
                {item.label}
              </span>
            </Link>
          ))}
          
          <div className="mt-10 flex gap-4">
            <div className="w-10 h-1 bg-[#D1127C] rounded-full" />
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
            <div className="w-10 h-1 bg-violet-600 rounded-full" />
          </div>
        </nav>
      </div>
    </>
  );
}