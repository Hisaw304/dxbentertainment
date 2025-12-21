import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

/* Disable bodyParser for file upload */
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(400).json({ error: "Invalid form data" });
      }

      const {
        name,
        email,
        phone,
        danceStyle,
        classType,
        groupDay,
        privatePackage,
        preferredDay,
        preferredTime,
        location,
        price,
      } = fields;

      /* ---------- BASIC VALIDATION ---------- */
      if (!name || !email || !phone || !danceStyle || !classType || !price) {
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

      /* ---------- RECEIPT ATTACHMENT ---------- */
      let attachments = [];

      if (files?.receipt?.filepath) {
        attachments.push({
          filename: files.receipt.originalFilename || "payment-receipt",
          content: fs.readFileSync(files.receipt.filepath),
        });
      }

      /* ---------- CLIENT EMAIL ---------- */
      const clientMail = {
        from: `"DXB Dance Studio" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Dance Class Booking — DXB Dance Studio",
        html: clientEmailTemplate({
          name,
          danceStyle,
          classType,
          groupDay,
          privatePackage,
          preferredDay,
          preferredTime,
          location,
          price,
        }),
      };

      /* ---------- STUDIO EMAIL ---------- */
      const studioMail = {
        from: `"New Dance Booking" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: "New Dance Class Booking (Payment Receipt Attached)",
        html: studioEmailTemplate({
          name,
          email,
          phone,
          danceStyle,
          classType,
          groupDay,
          privatePackage,
          preferredDay,
          preferredTime,
          location,
          price,
        }),
        attachments,
      };

      await transporter.sendMail(clientMail);
      await transporter.sendMail(studioMail);

      return res.status(200).json({ success: true });
    });
  } catch (err) {
    console.error("Contact class error:", err);
    return res.status(500).json({ error: "Email sending failed" });
  }
}
function clientEmailTemplate({
  name,
  danceStyle,
  classType,
  groupDay,
  privatePackage,
  preferredDay,
  preferredTime,
  location,
  price,
}) {
  return `
    <div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px; color:#000;">
      <h2 style="color:#ff2d84;">Hi ${name},</h2>

      <p>Thank you for booking a dance class with <strong>DXB Dance Studio</strong>.</p>

      <p>We’ve received your booking request and payment receipt with the following details:</p>

      <ul style="line-height:1.6;">
        <li><strong>Dance Style:</strong> ${danceStyle}</li>
        <li><strong>Class Type:</strong> ${classType}</li>
      ${
        classType === "Group" && groupDay
          ? `<li><strong>Day & Time:</strong> ${groupDay}</li>`
          : ""
      }

${
  classType === "Private"
    ? `
    <li><strong>Package:</strong> ${privatePackage}</li>
    <li><strong>Preferred Time:</strong> ${preferredDay} – ${preferredTime}</li>
  `
    : ""
}

        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Total Price:</strong> ${price}</li>
      </ul>

      <p>
        Our team will review your payment and contact you shortly to confirm
        your booking.
      </p>

      <p style="margin-top:24px;">
        💃🖤<br/>
        <strong>DXB Dance Studio</strong><br/>
        Dubai
      </p>
    </div>
  `;
}
function studioEmailTemplate({
  name,
  email,
  phone,
  danceStyle,
  classType,
  groupDay,
  privatePackage,
  preferredDay,
  preferredTime,
  location,
  price,
}) {
  return `
    <div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px; color:#000;">
      <h2 style="color:#ff2d84;">New Dance Class Booking</h2>

      <ul style="line-height:1.6;">
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Dance Style:</strong> ${danceStyle}</li>
        <li><strong>Class Type:</strong> ${classType}</li>
      ${
        classType === "Group" && groupDay
          ? `<li><strong>Day & Time:</strong> ${groupDay}</li>`
          : ""
      }

${
  classType === "Private"
    ? `
    <li><strong>Package:</strong> ${privatePackage}</li>
    <li><strong>Preferred Time:</strong> ${preferredDay} – ${preferredTime}</li>
  `
    : ""
}

        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Price:</strong> ${price}</li>
      </ul>

      <p><strong>Payment receipt is attached to this email.</strong></p>
    </div>
  `;
}
