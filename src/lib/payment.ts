'use server';

import axios from 'axios';

interface PaymentData {
    amount: number;
    cardData: {
        number: string;
        name: string;
        month: string;
        year: string;
        cvv: string;
    };
    customer: {
        nombre: string;
        email: string;
        telefono: string;
        direccion: string;
        cp: string;
    };
    orderId: string;
    redirectUrl?: string; // Opcional por si lo necesitas más adelante
}

const API_URL = "https://pagos.keycop.com.mx/api/v1";

async function getAuthToken() {
    const { data } = await axios.post(`${API_URL}/signin`, {
        email: process.env.KEYCOP_EMAIL || process.env.ETOMIN_USER,
        password: process.env.KEYCOP_PASSWORD || process.env.ETOMIN_PASSWORD
    });

    return data.authToken;
}

async function tokenizeCard(token: string, payment: PaymentData) {
    const card = payment.cardData;

    const { data } = await axios.post(`${API_URL}/card/tokenizer`, {
        cardData: {
            cardNumber: card.number.replace(/\s/g, ''),
            cardholderName: card.name,
            expirationYear: card.year,
            expirationMonth: card.month
        }
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return data.cardNumberToken;
}

export async function processEtominPayment(payment: PaymentData) {
    try {
        const authToken = await getAuthToken();
        const cardToken = await tokenizeCard(authToken, payment);

        // Separar nombre y apellido del formato de Etomin
        const nameParts = payment.customer.nombre.trim().split(' ');
        const firstName = nameParts[0] || 'Cliente';
        const lastName = nameParts.slice(1).join(' ') || 'N/A';

        const salePayload = {
            amount: Number(payment.amount),
            currency: "484", // Pesos mexicanos (MXN)
            reference: payment.orderId,
            redirectUrl: payment.redirectUrl || "",

            customerInformation: {
                firstName,
                lastName,
                email: payment.customer.email,
                phone1: payment.customer.telefono,
                address1: payment.customer.direccion,
                address2: "",
                city: "Ciudad de México",
                state: "CDMX",
                postalCode: payment.customer.cp,
                country: "MX",
                company: "",
                ip: "127.0.0.1",
            },

            cardData: {
                cardNumberToken: cardToken,
                cvv: payment.cardData.cvv,
            },
        };

        const { data } = await axios.post(`${API_URL}/sale`, salePayload, {
            headers: { Authorization: `Bearer ${authToken}` }
        });

        console.log("Keycop Response:", data);

        // Validar si fue aprobado directo o si requiere redirección 3DS
        const isApproved = data.status === "APPROVED";
        const needsRedirect = data.redirectTo && data.redirectTo !== "";

        return {
            success: isApproved,
            needsRedirect,
            redirectUrl: data.redirectTo || null,
            orderId: data.orderId || data.reference,
            reference: data.reference,
            status: data.status,
            data: data
        };

    } catch (error: any) {
        console.error("Keycop Payment Error (via Etomin wrapper):", error.response?.data || error.message);
        return {
            success: false,
            needsRedirect: false,
            status: "error",
            error: error.response?.data?.message || "Error procesando el pago"
        };
    }
}