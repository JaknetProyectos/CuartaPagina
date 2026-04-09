"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ nombre: "", email: "", mensaje: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(t('error_message'));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t('connection_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contactanos" className="relative bg-[#0d0221] py-24 overflow-hidden">
      {/* Fondo decorativo con Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff00ff]/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header con Estilo Tipográfico Fuerte */}
          <div className="text-center mb-16">
            <h2 className="font-anton text-5xl md:text-7xl text-white uppercase tracking-tighter mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-[#ff00ff] to-violet-500">
                {t('title')}
              </span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Info con Glassmorphism */}
            <div className="space-y-8">
              {[
                { icon: Phone, label: t('info.phone.label'), val: "+52 55 1234 1234", sub: t('info.phone.hours'), color: "bg-yellow-400" },
                { icon: Mail, label: t('info.email.label'), val: "info@tripcraftmx.com", sub: t('info.email.response'), color: "bg-[#ff00ff]" },
                { icon: MapPin, label: t('info.location.label'), val: t('info.location.city'), sub: t('info.location.appointment'), color: "bg-violet-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-[#0d0221]" />
                  </div>
                  <div>
                    <h3 className="font-anton text-white text-xl uppercase tracking-wider">{item.label}</h3>
                    <p className="text-white/90 font-medium text-lg">{item.val}</p>
                    <p className="text-sm text-white/40">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulario con Efecto Neón y Cristal */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-[#ff00ff] to-violet-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                      <Check className="w-10 h-10 text-[#0d0221]" />
                    </div>
                    <h3 className="font-anton text-white text-3xl uppercase mb-2">
                      {t('success.title')}
                    </h3>
                    <p className="text-white/60">
                      {t('success.description')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-yellow-400 uppercase tracking-widest ml-1">
                        {t('form.name_label')}
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-[#ff00ff]/50 focus:bg-white/10 transition-all"
                        placeholder={t('form.name_placeholder')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#ff00ff] uppercase tracking-widest ml-1">
                        {t('form.email_label')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-[#ff00ff]/50 focus:bg-white/10 transition-all"
                        placeholder={t('form.email_placeholder')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-violet-400 uppercase tracking-widest ml-1">
                        {t('form.message_label')}
                      </label>
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-[#ff00ff]/50 focus:bg-white/10 transition-all resize-none"
                        rows={4}
                        placeholder={t('form.message_placeholder')}
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-[#ff00ff] p-[2px] transition-all hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] disabled:opacity-50"
                    >
                      <div className="flex h-full w-full items-center justify-center bg-[#0d0221] py-4 rounded-[10px] transition-all group-hover:bg-transparent">
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin text-white" />
                        ) : (
                          <div className="flex items-center gap-3">
                            <Send className="w-4 h-4 text-yellow-400 group-hover:text-white transition-colors" />
                            <span className="font-anton text-white uppercase tracking-widest">
                              {t('form.submit_button')}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}