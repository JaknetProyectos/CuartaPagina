"use client";

import { useCart } from "@/context/cartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkout } from "@/lib/cart";
import { useState, useMemo } from "react";
import { CreditCard, CheckCircle, MapPin, AlertTriangle, X, Trash2, Calendar, Users, ShieldCheck, Loader2, Beaker } from "lucide-react";
import etominLogo from "@/public/etomin.png"
import securePayment from "@/public/secure-payment.png"
import Image from "next/image";
import { EmptyCart } from "@/components/EmptyCart";
import { useTranslations } from 'next-intl';

export default function CartPage() {
    const t = useTranslations('Cart');
    const { cart, updateItem, removeItem, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<any[] | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const [form, setForm] = useState({
        nombre: "", email: "", telefono: "", pais: "México",
        calle: "", apartamento: "", ciudad: "", estado: "", cp: "",
    });

    const [card, setCard] = useState({
        number: "", name: "", month: "", year: "", cvv: "",
    });

    // --- FUNCIÓN DE DATOS DEMO ---
    const fillDemoData = () => {
        setForm({
            nombre: "Fernando Test",
            email: "fer@example.com",
            telefono: "5512345678",
            pais: "México",
            calle: "Av. Reforma 123",
            apartamento: "Piso 5",
            ciudad: "CDMX",
            estado: "CDMX",
            cp: "06500"
        });
        setCard({
            number: "4242 4242 4242 4242",
            name: "FERNANDO TEST",
            month: "12",
            year: "28",
            cvv: "123"
        });
    };

    const total = useMemo(() =>
        cart.reduce((acc, item) => acc + item.price * (item.personas || 1), 0),
        [cart]);

    // --- VALIDACIONES CORREGIDAS (MENOS ESTRICTAS) ---
    const isFormValid = useMemo(() => (
        form.nombre.trim().length >= 2 &&
        form.email.includes("@") &&
        form.telefono.trim().length >= 8 &&
        form.calle.trim().length >= 3 &&
        form.ciudad.trim().length >= 2 &&
        form.cp.trim().length >= 4
    ), [form]);

    const isCardValid = useMemo(() => {
        const cleanNumber = card.number.replace(/\s/g, "");
        return (
            cleanNumber.length >= 15 &&
            card.month.length === 2 &&
            card.year.length === 2 &&
            card.cvv.length >= 3 &&
            card.name.length > 2
        );
    }, [card]);

    const areItemsValid = useMemo(() => (
        cart.length > 0 && cart.every(item => item.fecha && (item.personas ?? 0) > 0)
    ), [cart]);

    const canCheckout = isFormValid && isCardValid && areItemsValid;

    // --- FEEDBACK DE VALIDACIÓN PARA EL USUARIO ---
    const getValidationMessage = () => {
        if (cart.length === 0) return "El carrito está vacío";
        if (!areItemsValid) return "Faltan fechas o número de personas";
        if (!isFormValid) return "Faltan datos de envío o contacto";
        if (!isCardValid) return "Datos de tarjeta incompletos";
        return null;
    };

    const handleCheckout = async () => {
        if (!canCheckout) return;
        try {
            setLoading(true);
            setPaymentError(null);
            const direccionCompleta = `${form.calle} ${form.apartamento ? `, Apt/Int: ${form.apartamento}` : ""} , ${form.ciudad}, ${form.estado}, ${form.pais}`.replace(/\s+/g, ' ').trim();
            const result = await checkout(cart, { ...form, direccion: direccionCompleta }, card);
            clearCart();
            setTicket(result);
        } catch (err: any) {
            setPaymentError(err.message || "Error en el pago");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !ticket && !paymentError) return <EmptyCart />;

    return (
        <div className="bg-[#0d0221] min-h-screen text-white">
            <Header />

            {/* BOTÓN FLOTANTE PARA DEMO */}
            {/* <button 
                onClick={fillDemoData}
                className="fixed bottom-6 right-6 z-[100] bg-yellow-400 text-black px-4 py-2 rounded-full font-anton text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
            >
                <Beaker size={14} /> Llenar Datos Demo
            </button> */}

            {/* MODAL DE ÉXITO (INALTERADO) */}
            {ticket && (
                <div className="fixed inset-0 bg-[#0d0221]/95 backdrop-blur-xl flex items-center justify-center z-[200] p-4">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl text-center border-t-[12px] border-green-500">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-anton uppercase text-[#0d0221] mb-2">{t('success.title')}</h2>
                        <p className="text-gray-500 font-medium mb-8">{t('success.message', { email: form.email })}</p>
                        <button onClick={() => window.location.href = "/"} className="w-full py-4 bg-[#0d0221] text-white rounded-2xl font-anton uppercase tracking-widest hover:bg-magenta-600 transition-all shadow-xl">
                            {t('success.back_home')}
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL DE ERROR (INALTERADO) */}
            {paymentError && (
                <div className="fixed inset-0 bg-[#0d0221]/90 backdrop-blur-md flex items-center justify-center z-[210] p-4">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl text-center border-t-[12px] border-red-500">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-anton uppercase tracking-tighter text-[#0d0221] mb-2">Error en el Pago</h2>
                        <p className="text-gray-500 text-sm mb-8 font-medium">{paymentError}</p>
                        <button onClick={() => setPaymentError(null)} className="w-full py-4 bg-red-500 text-white rounded-2xl font-anton uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-2">
                            <X size={18} /> Reintentar
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl pt-32 mx-auto p-6 grid lg:grid-cols-12 gap-12 pb-24">

                {/* IZQUIERDA: PRODUCTOS */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-end gap-4">
                        <h1 className="text-6xl font-anton uppercase tracking-tighter">{t('summary.title')}</h1>
                        <div className="h-1 flex-grow bg-gradient-to-r from-magenta-500 to-transparent mb-3 rounded-full opacity-30" />
                    </div>

                    <div className="space-y-6">
                        {cart.map(item => (
                            <div key={item.experienceId} className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-[2rem] p-6 transition-all hover:bg-white/10">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="font-anton text-2xl uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                                    <button onClick={() => removeItem(item.experienceId)} className="p-2 text-white/20 hover:text-red-500 transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-anton text-magenta-500 uppercase tracking-[0.2em]"><Calendar size={12} /> {t('summary.date_label')}</label>
                                        <input type="date" value={item.fecha || ""} onChange={e => updateItem(item.experienceId, { fecha: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-magenta-500 transition-all color-scheme-dark" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-anton text-magenta-500 uppercase tracking-[0.2em]"><Users size={12} /> {t('summary.travelers_label')}</label>
                                        <input type="number" min={1} value={item.personas || 1} onChange={e => updateItem(item.experienceId, { personas: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-magenta-500 transition-all font-anton" />
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/5 flex justify-end items-baseline gap-2">
                                    <span className="text-[10px] font-anton text-white/30 uppercase tracking-widest">SUBTOTAL:</span>
                                    <p className="font-anton text-3xl text-yellow-400 tracking-tighter">${(item.price * (item.personas || 1)).toLocaleString()}</p>
                                    <span className="text-xs font-anton text-white/20">MXN</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-gradient-to-r from-magenta-600 to-violet-700 rounded-[2rem] flex justify-between items-center shadow-2xl">
                        <span className="font-anton uppercase tracking-[0.3em] text-sm text-white/80">{t('summary.total_label')}:</span>
                        <div className="text-right">
                            <span className="text-5xl font-anton tracking-tighter block leading-none">${total.toLocaleString()}</span>
                            <span className="text-[10px] font-anton tracking-widest text-white/60 uppercase">IVA Incluido</span>
                        </div>
                    </div>
                </div>

                {/* DERECHA: FORMULARIO Y PAGO */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                        <h2 className="text-xl font-anton uppercase tracking-widest mb-8 flex items-center gap-3 text-yellow-400">
                            <MapPin size={22} /> {t('billing.title')}
                        </h2>

                        <div className="space-y-4">
                            <input type="text" placeholder={t('billing.placeholders.name')} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-magenta-500" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                            <input type="email" placeholder={t('billing.placeholders.email')} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-magenta-500" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-anton text-white/30 uppercase tracking-widest ml-1">{t('billing.labels.country')}</label>
                                    <select className="w-full bg-[#0d0221] border border-white/10 rounded-2xl p-4 text-sm font-anton uppercase outline-none focus:border-magenta-500" value={form.pais} onChange={e => setForm({ ...form, pais: e.target.value })}>
                                        <option value="México">México</option>
                                        <option value="Estados Unidos">USA</option>
                                        <option value="España">España</option>
                                        <option value="Colombia">Colombia</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-anton text-white/30 uppercase tracking-widest ml-1">Teléfono</label>
                                    <input type="tel" placeholder="+52..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-magenta-500" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
                                </div>
                            </div>

                            <input type="text" placeholder={t('billing.placeholders.address')} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-magenta-500" value={form.calle} onChange={e => setForm({ ...form, calle: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder={t('billing.placeholders.city')} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-magenta-500" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} />
                                <input type="text" placeholder={t('billing.placeholders.zip')} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-mono outline-none focus:border-magenta-500" value={form.cp} onChange={e => setForm({ ...form, cp: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="relative backdrop-blur-md bg-white/15 border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-anton uppercase tracking-widest flex items-center gap-3 text-magenta-500">
                                <CreditCard size={22} /> {t('payment.title')}
                            </h2>
                            <Image src={etominLogo} alt="Etomin"  className="brightness-200" width={120} height={40} />
                        </div>

                        <div className="space-y-4">
                            <input type="text" placeholder={t('payment.placeholders.card_name')} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-magenta-500 text-sm font-anton uppercase" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                            <input type="text" placeholder={t('payment.placeholders.card_number')} maxLength={19} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-magenta-500 font-mono tracking-widest text-sm" value={card.number} onChange={e => {
                                const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                setCard({ ...card, number: val });
                            }} />
                            <div className="grid grid-cols-3 gap-3">
                                <input type="text" placeholder="MM" maxLength={2} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center outline-none focus:border-magenta-500 text-sm font-anton" value={card.month} onChange={e => setCard({ ...card, month: e.target.value })} />
                                <input type="text" placeholder="YY" maxLength={2} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center outline-none focus:border-magenta-500 text-sm font-anton" value={card.year} onChange={e => setCard({ ...card, year: e.target.value })} />
                                <input type="password" placeholder="CVV" maxLength={4} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center outline-none focus:border-magenta-500 text-sm font-anton" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading || !canCheckout}
                            className={`mt-8 w-full py-6 rounded-2xl font-anton text-2xl uppercase tracking-tighter flex flex-col items-center justify-center transition-all shadow-xl
                                ${canCheckout
                                    ? 'bg-white text-[#0d0221] hover:bg-magenta-600 hover:text-white cursor-pointer'
                                    : 'bg-white/10 text-white/20 cursor-not-allowed grayscale'}
                                ${loading ? 'opacity-70 pointer-events-none' : ''}
                            `}
                        >
                            {loading ? (
                                <div className="flex items-center gap-3"><Loader2 className="animate-spin" /> {t('payment.processing')}</div>
                            ) : (
                                <>
                                    <span>{t('payment.pay_button')} ${total.toLocaleString()}</span>
                                </>
                            )}
                        </button>

                        {!canCheckout && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-yellow-500 animate-pulse">
                                <AlertTriangle size={12} />
                                <p className="text-[10px] font-anton uppercase tracking-widest">
                                    {getValidationMessage()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}