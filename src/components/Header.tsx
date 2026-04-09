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

  const navItems = [
    { href: "/", label: t('nav.about'), icon: Home },
    { href: "/experiencias", label: t('nav.experiences'), icon: Plane },
    { href: "/pasion", label: t('nav.football_passion'), icon: Volleyball },
    { href: "/armatuaventura", label: t('nav.build_adventure'), icon: AtSign },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
        ? "py-2 bg-[#0d0221]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]" 
        : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo con Resplandor sutil */}
          <Link href="/" className="relative z-10 hover:scale-105 transition-transform">
            <div className="absolute -inset-2 bg-magenta-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={45}
              className="relative brightness-0 invert" // Forzamos el logo a blanco para el fondo oscuro
              priority
            />
          </Link>

          {/* Desktop Navigation - Estilo Futurista */}
          <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-5 py-2.5 flex gap-2 items-center text-white/70 hover:text-white transition-all font-anton uppercase text-xs tracking-[0.15em]"
              >
                <item.icon size={16} className="text-magenta-500 group-hover:text-yellow-400 transition-colors" />
                <span className="relative z-10">{item.label}</span>
                {/* Indicador de Hover */}
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* Right side: Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="group relative p-3 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all"
            >
              <ShoppingCart className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-magenta-500 to-violet-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_15px_rgba(255,0,255,0.5)] animate-pulse">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-3 bg-magenta-500 rounded-xl text-[#0d0221] hover:bg-yellow-400 transition-colors shadow-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0d0221]/95 backdrop-blur-2xl z-[-1] md:hidden transition-all duration-500 ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 p-4">
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="group flex flex-col items-center gap-2"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <item.icon size={32} className="text-magenta-500 group-hover:text-yellow-400 transition-colors" />
              <span className="font-anton text-3xl text-white uppercase tracking-tighter group-hover:scale-110 transition-transform">
                {item.label}
              </span>
            </Link>
          ))}
          
          {/* Decoración inferior menú móvil */}
          <div className="mt-8 flex gap-4">
            <div className="w-12 h-1 bg-magenta-500 rounded-full" />
            <div className="w-12 h-1 bg-yellow-400 rounded-full" />
            <div className="w-12 h-1 bg-violet-600 rounded-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}