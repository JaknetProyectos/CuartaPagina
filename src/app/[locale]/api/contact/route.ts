import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje, sendToCustomer = true } = await req.json();

    // 1. EMAIL PARA EL ADMINISTRADOR (Notificación de Prospecto)
    // Estilo Dark Luxury con degradado Magenta-Violeta
    const adminEmail = resend.emails.send({
      from: "Sistema Trip Craft MX <info@tripcraftmx.com>",
      to: "info@tripcraftmx.com",
      replyTo: email,
      subject: `NUEVO MENSAJE: ${nombre}`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 20px; overflow: hidden; background-color: #0d0221; color: #ffffff;">
          <div style="background: linear-gradient(135deg, #ff00ff 0%, #7022ff 100%); padding: 40px; text-align: center;">
            <span style="font-size: 10px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; color: #ffffff; opacity: 0.8;">SISTEMA DE GESTIÓN</span>
            <h2 style="margin: 15px 0 0 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; color: #ffffff;">NUEVO PROSPECTO</h2>
          </div>
          <div style="padding: 45px; background-color: #0d0221;">
            <table style="width: 100%; font-size: 14px; margin-bottom: 35px; border-collapse: collapse;">
              <tr>
                <td style="color: #ff00ff; padding: 12px 0; text-transform: uppercase; font-size: 10px; font-weight: 900; width: 30%; letter-spacing: 1px;">CLIENTE:</td>
                <td style="font-weight: bold; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 0; font-size: 16px;">${nombre}</td>
              </tr>
              <tr>
                <td style="color: #7022ff; padding: 12px 0; text-transform: uppercase; font-size: 10px; font-weight: 900; letter-spacing: 1px;">EMAIL:</td>
                <td style="font-weight: bold; color: #ffcc00; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 0; font-size: 16px;">${email}</td>
              </tr>
            </table>

            <div style="background: rgba(255,255,255,0.03); padding: 30px; border-radius: 15px; border-left: 4px solid #ffcc00; margin: 25px 0;">
              <span style="font-size: 10px; color: #ffcc00; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">MENSAJE RECIBIDO:</span>
              <p style="margin-top: 20px; font-style: italic; color: #e0e0e0; line-height: 1.8; font-size: 15px;">"${mensaje}"</p>
            </div>

            <a href="mailto:${email}" style="display: block; text-align: center; background: #ffffff; color: #0d0221; padding: 22px; text-decoration: none; border-radius: 12px; font-weight: 900; font-size: 12px; letter-spacing: 3px; margin-top: 40px; text-transform: uppercase;">ATENDER AHORA</a>
          </div>
          <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; font-size: 10px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">
            Generado automáticamente por tripcraftmx.com | Internal Log ID
          </div>
        </div>
      `,
    });

    // 2. EMAIL PARA EL CLIENTE (Confirmación de Recepción)
    // Diseño Premium con degradado Violeta-Magenta y acento Amarillo
    let customerEmail = null;
    if (sendToCustomer) {
      customerEmail = resend.emails.send({
        from: "Trip Craft MX <info@tripcraftmx.com>",
        to: email,
        subject: `¡Hola ${nombre.split(' ')[0]}! Recibimos tu mensaje`,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 20px; overflow: hidden; background-color: #ffffff; border: 1px solid #f0f0f0;">
            <div style="background: linear-gradient(135deg, #7022ff 0%, #ff00ff 100%); padding: 50px; text-align: center;">
              <h1 style="margin: 0; font-size: 18px; font-weight: 900; letter-spacing: 6px; text-transform: uppercase; color: #ffffff;">TRIP CRAFT MX</h1>
            </div>
            <div style="padding: 50px; text-align: center; background-color: #ffffff;">
              <div style="display: inline-block; background: #fff9e6; color: #ffcc00; padding: 10px 20px; border-radius: 50px; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 30px; letter-spacing: 2px; border: 1px solid #ffcc00;">Solicitud Recibida</div>
              <h2 style="color: #0d0221; margin: 0 0 20px 0; font-size: 28px; font-weight: 800; letter-spacing: -1px; text-transform: uppercase;">¡Tu aventura comienza aquí!</h2>
              <p style="color: #666666; font-size: 16px; line-height: 1.8; margin-bottom: 35px; font-weight: 400;">Hola <strong>${nombre}</strong>, es un placer saludarte. Hemos recibido tu mensaje correctamente. Un experto de nuestro equipo concierge revisará tus detalles para contactarte personalmente.</p>
              
              <div style="margin: 35px 0; padding: 30px; background-color: #fafafa; border-radius: 15px; text-align: left; border: 1px solid #f0f0f0;">
                <span style="font-size: 9px; color: #bbbbbb; text-transform: uppercase; font-weight: 900; letter-spacing: 2px; display: block; margin-bottom: 10px;">RESUMEN DE TU CONSULTA:</span>
                <p style="color: #444444; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">"${mensaje}"</p>
              </div>

              <p style="font-size: 11px; color: #999999; border-top: 1px solid #f0f0f0; margin-top: 40px; padding-top: 25px; letter-spacing: 1px;">Si requieres atención inmediata prioritaria, escríbenos a <a href="mailto:atencion@tripcraftmx.com" style="color: #ff00ff; text-decoration: none; font-weight: bold;">atencion@tripcraftmx.com</a></p>
            </div>
            <div style="background: #0d0221; padding: 40px; text-align: center; font-size: 11px; color: #ffffff;">
              <p style="margin: 0; letter-spacing: 2px; font-weight: 900; text-transform: uppercase; opacity: 0.6;">&copy; ${new Date().getFullYear()} TRIP CRAFT MX</p>
              <p style="margin-top: 10px;"><a href="https://tripcraftmx.com" style="color: #ffcc00; font-weight: bold; text-decoration: none; font-size: 12px;">tripcraftmx.com</a></p>
            </div>
          </div>
        `,
      });
    }

    await Promise.all([adminEmail, customerEmail].filter(Boolean));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando contacto:", error);
    return NextResponse.json({ error: "Error al enviar mensaje" }, { status: 500 });
  }
}