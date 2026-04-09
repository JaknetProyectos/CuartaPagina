import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, email, telefono, personas, experiencia_title, detalles, id } = data;

    const shortId = id ? id.substring(0, 8).toUpperCase() : "TRIP CRAFT MX";
    // Enlaces mantenidos para funcionalidad futura o actual
    const statusLink = `https://tripcraftmx.com/pagatuaventura?quoteId=${id}`;
    const adminEditLink = `https://tripcraftmx.com/admin/cotizaciones/${id}`;

    // 1. Correo para el Cliente (Estilo Cyber-Luxury: Magenta-Violeta-Amarillo)
    await resend.emails.send({
      from: "Trip Craft MX <info@tripcraftmx.com>",
      to: email,
      subject: `Solicitud Recibida: ${experiencia_title}`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 30px; overflow: hidden; background-color: #ffffff; border: 1px solid #f0f0f0;">
          <div style="background: linear-gradient(135deg, #7022ff 0%, #ff00ff 100%); padding: 50px; text-align: center;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 50px; font-size: 10px; font-weight: 900; text-transform: uppercase; color: #ffffff; letter-spacing: 3px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.4);">Concierge Service</div>
            <h1 style="margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 5px; text-transform: uppercase; color: #ffffff;">PETICIÓN REGISTRADA</h1>
          </div>
          
          <div style="padding: 50px; text-align: center; background-color: #ffffff;">
            <p style="color: #0d0221; font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Hola <strong>${nombre}</strong>,</p>
            <p style="color: #666666; font-size: 15px; line-height: 1.8; margin-bottom: 30px;">
              Hemos recibido tu interés en la experiencia <span style="color: #7022ff; font-weight: 800; text-transform: uppercase;">${experiencia_title}</span>. 
              Nuestro equipo está diseñando tu propuesta personalizada con los estándares más altos de exclusividad.
            </p>

            <div style="margin: 35px 0; padding: 30px; background-color: #fafafa; border-radius: 20px; text-align: left; border: 1px solid #f0f0f0; position: relative;">
                <div style="width: 4px; height: 30px; background: #ffcc00; position: absolute; left: 0; top: 30px;"></div>
                <span style="font-size: 9px; color: #bbbbbb; text-transform: uppercase; font-weight: 900; letter-spacing: 2px; display: block; margin-bottom: 12px;">RESUMEN DE TU SOLICITUD:</span>
                <p style="color: #444444; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">"${detalles}"</p>
                <div style="margin-top: 15px; font-size: 11px; color: #7022ff; font-weight: bold;">Pax: ${personas}</div>
            </div>

            <p style="font-size: 11px; color: #999999; border-top: 1px solid #f0f0f0; margin-top: 40px; padding-top: 30px; letter-spacing: 1px;">
              Recibirás noticias nuestras en menos de 24 horas hábiles.
            </p>
          </div>

          <div style="background: #0d0221; padding: 40px; text-align: center;">
            <p style="margin: 0; font-size: 10px; letter-spacing: 2px; font-weight: 900; text-transform: uppercase; color: rgba(255,255,255,0.4);">
              &copy; ${new Date().getFullYear()} TRIP CRAFT MX
            </p>
            <a href="https://tripcraftmx.com" style="display: inline-block; margin-top: 15px; color: #ffcc00; font-weight: bold; text-decoration: none; font-size: 12px; letter-spacing: 1px;">tripcraftmx.com</a>
          </div>
        </div>
      `
    });

    // 2. Correo para el Admin (Estilo Dark High-Alert con Magenta/Amarillo)
    await resend.emails.send({
      from: "Sistema Trip Craft MX <info@tripcraftmx.com>",
      to: "info@tripcraftmx.com",
      subject: `🚨 NUEVA COTIZACIÓN: ${nombre} - ${experiencia_title}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; background-color: #0d0221; color: #ffffff; padding: 40px; border-radius: 20px; border: 2px solid #ff00ff; max-width: 600px; margin: auto;">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 25px;">
            <h2 style="color: #ffcc00; margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">NUEVA SOLICITUD DE COTIZACIÓN</h2>
            <p style="font-size: 10px; color: #ff00ff; font-weight: bold; margin-top: 5px;">ID: ${shortId}</p>
          </div>
          
          <div style="space-y: 15px;">
            <p style="margin: 10px 0;"><strong style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; letter-spacing: 1px; display: block;">Cliente:</strong> <span style="font-size: 16px;">${nombre}</span></p>
            <p style="margin: 10px 0;"><strong style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; letter-spacing: 1px; display: block;">Email:</strong> <span style="font-size: 16px; color: #7022ff;">${email}</span></p>
            <p style="margin: 10px 0;"><strong style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; letter-spacing: 1px; display: block;">Teléfono:</strong> <span style="font-size: 16px;">${telefono}</span></p>
            <p style="margin: 10px 0;"><strong style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; letter-spacing: 1px; display: block;">Experiencia:</strong> <span style="font-size: 16px; font-weight: bold;">${experiencia_title}</span></p>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin-top: 25px;">
              <strong style="color: #ffcc00; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Detalles del Viaje:</strong>
              <p style="font-style: italic; color: #e0e0e0; margin-top: 10px; font-size: 14px;">"${detalles}"</p>
            </div>
          </div>

          <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
             <p style="font-size: 12px; color: #ffcc00; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Acción Requerida: Generar y enviar folio de pago.</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}