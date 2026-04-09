import { CheckoutInfo } from "@/interfaces/CheckoutInfo";
import { Reservation } from "@/interfaces/Reservations";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      reservations,
      checkoutInfo
    }: { reservations: Reservation[], checkoutInfo: CheckoutInfo } = await req.json();

    const customerEmail = checkoutInfo.billingAddress.email;

    await resend.emails.send({
      from: "Trip Craft MX <info@tripcraftmx.com>",
      to: [customerEmail, "info@tripcraftmx.com"],
      subject: `¡Gracias por tu compra!`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; line-height: 1.6; margin: 0; background-color: #0d0221; }
        .main-container { max-width: 600px; margin: 20px auto; background-color: #0d0221; border-radius: 30px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        
        /* Header Cyber-Luxury */
        .header { background: linear-gradient(135deg, #7022ff 0%, #ff00ff 100%); color: white; text-align: center; padding: 60px 20px; position: relative; }
        .header h1 { margin: 0; font-size: 18px; letter-spacing: 6px; font-weight: 900; text-transform: uppercase; }
        .header .check-icon { 
          font-size: 50px; 
          margin-bottom: 15px; 
          display: inline-block; 
          background: rgba(255,255,255,0.2); 
          width: 80px; 
          height: 80px; 
          line-height: 80px; 
          border-radius: 50%; 
          border: 2px solid #ffcc00;
        }

        .content { padding: 45px; background-color: #0d0221; }
        
        /* Info de Orden */
        .order-status { text-align: center; margin-bottom: 40px; }
        .order-status h2 { font-size: 28px; margin: 0; color: #ffffff; font-weight: 800; letter-spacing: -1px; text-transform: uppercase; }
        .order-status p { color: #ffcc00; font-size: 11px; margin: 10px 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 700; }

        /* Tabla de Productos High-Tech */
        .ticket-table { width: 100%; border-collapse: collapse; margin-bottom: 35px; }
        .ticket-table th { text-align: left; font-size: 10px; text-transform: uppercase; color: #7022ff; padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); letter-spacing: 2px; }
        .ticket-table td { padding: 25px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; vertical-align: top; }
        
        .item-title { font-weight: 800; color: #ffffff; display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; }
        .item-meta { font-size: 11px; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 1px; }
        .price-text { font-weight: 800; color: #ffffff; text-align: right; font-size: 16px; }

        /* Totales */
        .summary-box { background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 20px; margin-bottom: 35px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .summary-row { display: table; width: 100%; margin-bottom: 12px; }
        .summary-label { display: table-cell; font-size: 11px; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 1px; }
        .summary-value { display: table-cell; text-align: right; font-weight: 700; color: #ffffff; }
        .total-row { border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 15px; padding-top: 15px; }
        .total-price { font-size: 24px; color: #ffcc00; font-weight: 900; }

        /* Tarjetas de Información */
        .info-grid { width: 100%; margin-top: 20px; border-collapse: separate; border-spacing: 10px 0; }
        .info-col { width: 50%; vertical-align: top; }
        .card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); padding: 20px; border-radius: 15px; min-height: 120px; }
        .card h3 { font-size: 9px; text-transform: uppercase; color: #ff00ff; margin: 0 0 12px 0; letter-spacing: 2px; font-weight: 900; }
        .card p { font-size: 12px; margin: 0; color: rgba(255, 255, 255, 0.6); line-height: 1.8; }

        .footer { background: #000000; padding: 40px; text-align: center; font-size: 10px; color: rgba(255, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 2px; }
        .support-link { color: #ffcc00; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="main-container">
        <div class="header">
          <div class="check-icon">✓</div>
          <h1>Reserva Confirmada</h1>
        </div>
        
        <div class="content">
          <div class="order-status">
            <h2>¡Tu viaje está listo!</h2>
            <p>${checkoutInfo.orderDate}</p>
          </div>

          <table class="ticket-table">
            <thead>
              <tr>
                <th>Experiencia</th>
                <th style="text-align: center;">Pax</th>
                <th style="text-align: right;">Monto</th>
              </tr>
            </thead>
            <tbody>
              ${reservations.map(res => `
                <tr>
                  <td>
                    <span class="item-title">${res.activityTitle ?? res?.activity_title}</span>
                    <span class="item-meta">📅 ${res.fecha}</span>
                  </td>
                  <td style="text-align: center; font-weight: 800; color: #ffcc00;">${res.personas}</td>
                  <td class="price-text">$${Number(res.price).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="summary-box">
            <div class="summary-row">
              <span class="summary-label">Método de pago</span>
              <span class="summary-value" style="font-weight: 400; color: #ff00ff;">${checkoutInfo.metodoPago}</span>
            </div>
            <div class="summary-row total-row">
              <span class="summary-label" style="font-weight: 900; color: #ffffff;">Total Pagado</span>
              <span class="summary-value total-price">${checkoutInfo.subtotal} MXN</span>
            </div>
          </div>

          <table class="info-grid">
            <tr>
              <td class="info-col">
                <div class="card">
                  <h3>Cliente VIP</h3>
                  <p>
                    <strong style="color: #ffffff;">${checkoutInfo.billingAddress.nombre}</strong><br>
                    ${checkoutInfo.billingAddress.email}<br>
                    Tel: ${checkoutInfo.billingAddress.telefono}
                  </p>
                </div>
              </td>
              <td class="info-col">
                <div class="card">
                  <h3>Facturación</h3>
                  <p>
                    ${checkoutInfo.billingAddress.calle}<br>
                    ${checkoutInfo.billingAddress.ciudad}, CP ${checkoutInfo.billingAddress.codigoPostal}
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div class="footer">
          &copy; ${new Date().getFullYear()} TRIP CRAFT MX | <a href="https://tripcraftmx.com" class="support-link">tripcraftmx.com</a><br>
          <p style="margin-top: 15px; font-size: 8px; opacity: 0.5;">Este es un comprobante oficial de tu reserva digital.</p>
        </div>
      </div>
    </body>
    </html>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error enviando ticket" }, { status: 500 });
  }
}