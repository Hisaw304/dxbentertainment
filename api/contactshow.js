import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      clientName,
      email,
      phone,
      location,
      datetime,
      services,
      quantity,
      message,
    } = req.body;

    /* ---------- BASIC VALIDATION ---------- */
    if (
      !clientName ||
      !email ||
      !phone ||
      !location ||
      !datetime ||
      !services?.length
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    /* ---------- EMAIL TRANSPORT ---------- */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* ---------- CLIENT EMAIL ---------- */
    const clientMail = {
      from: `"DXB Entertainment" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Performance Request — DXB Entertainment",
      html: clientEmailTemplate({
        clientName,
        location,
        datetime,
        services,
        quantity,
      }),
    };

    /* ---------- STUDIO EMAIL ---------- */
    const studioMail = {
      from: `"New Booking Request" <${process.env.SMTP_USER}>`,
      to: process.env.STUDIO_EMAIL,
      subject: "New Performance / Costume Booking",
      html: studioEmailTemplate({
        clientName,
        email,
        phone,
        location,
        datetime,
        services,
        quantity,
        message,
      }),
    };

    await transporter.sendMail(clientMail);
    await transporter.sendMail(studioMail);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact show error:", err);
    return res.status(500).json({ error: "Email sending failed" });
  }
}
function clientEmailTemplate({
  clientName,
  location,
  datetime,
  services,
  quantity,
}) {
  return `
    <div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px; color:#000;">
      <h2 style="color:#ff2d84;">Hi ${clientName},</h2>

      <p>Thank you for contacting <strong>DXB Entertainment</strong>.</p>

      <p>We’ve received your request with the following details:</p>

      <ul style="line-height:1.6;">
        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Date & Time:</strong> ${datetime}</li>
        <li><strong>Services:</strong> ${services.join(", ")}</li>
        ${
          quantity
            ? `<li><strong>Quantity / Performers:</strong> ${quantity}</li>`
            : ""
        }
      </ul>

      <p>
        Our bookings team will contact you shortly to confirm availability,
        pricing, and performance details.
      </p>

      <p style="margin-top:24px;">
        🎭🥁<br/>
        <strong>DXB Entertainment</strong><br/>
        Dubai
      </p>
    </div>
  `;
}
function studioEmailTemplate({
  clientName,
  email,
  phone,
  location,
  datetime,
  services,
  quantity,
  message,
}) {
  return `
    <div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px; color:#000;">
      <h2 style="color:#ff2d84;">New Booking Request</h2>

      <ul style="line-height:1.6;">
        <li><strong>Name:</strong> ${clientName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Date & Time:</strong> ${datetime}</li>
        <li><strong>Services:</strong> ${services.join(", ")}</li>
        ${quantity ? `<li><strong>Quantity:</strong> ${quantity}</li>` : ""}
      </ul>

      ${message ? `<p><strong>Client Message:</strong><br/>${message}</p>` : ""}
    </div>
  `;
}
