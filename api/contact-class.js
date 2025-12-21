import nodemailer from "nodemailer";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

/* ================= CLOUDINARY CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ================= NEXT CONFIG ================= */
export const config = {
  api: { bodyParser: false },
};

// normalize formidable values
const getValue = (v) => (Array.isArray(v) ? v[0] : v);

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

      /* ---------- FIELDS ---------- */
      const studentName = getValue(fields.name);
      const studentEmail = getValue(fields.email);
      const phone = getValue(fields.phone);
      const danceStyle = getValue(fields.danceStyle);
      const classType = getValue(fields.classType);
      const groupDay = getValue(fields.groupDay);
      const privatePackage = getValue(fields.privatePackage);
      const preferredDay = getValue(fields.preferredDay);
      const preferredTime = getValue(fields.preferredTime);
      const location = getValue(fields.location);
      const amount = getValue(fields.price);

      /* ---------- VALIDATION ---------- */
      if (
        !studentName ||
        !studentEmail ||
        !phone ||
        !danceStyle ||
        !classType ||
        !amount
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (classType === "Group" && !groupDay) {
        return res.status(400).json({ error: "Missing group schedule" });
      }

      if (
        classType === "Private" &&
        (!privatePackage || !preferredDay || !preferredTime)
      ) {
        return res.status(400).json({ error: "Missing private class details" });
      }

      /* ---------- CLOUDINARY UPLOAD ---------- */
      const getFile = (f) => (Array.isArray(f) ? f[0] : f);

      let receiptUrl = null;

      const receiptFile = getFile(files?.receipt);

      if (receiptFile?.filepath) {
        const upload = await cloudinary.uploader.upload(receiptFile.filepath, {
          folder: process.env.CLOUDINARY_FOLDER || "payment-receipts",
          resource_type: "auto", // supports image + pdf
        });

        receiptUrl = upload.secure_url;
      }

      /* ---------- SMTP ---------- */
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      /* ---------- SEND EMAILS ---------- */
      await sendEmails({
        transporter,
        studentEmail,
        studentName,
        phone,
        danceStyle,
        classType,
        groupDay,
        privatePackage,
        preferredDay,
        preferredTime,
        location,
        amount,
        receiptUrl,
      });

      return res.status(200).json({ success: true });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Email sending failed" });
  }
}
/* ===================================================== */
/* ================= EMAIL SENDER ====================== */
/* ===================================================== */

async function sendEmails({
  transporter,
  studentEmail,
  studentName,
  phone,
  danceStyle,
  classType,
  groupDay,
  privatePackage,
  preferredDay,
  preferredTime,
  location,
  amount,
  receiptUrl, // 👈 Cloudinary URL
}) {
  /* ---------- STUDENT EMAIL (UNCHANGED) ---------- */
  const studentMail = {
    from: `"DXB Entertainment" <${process.env.SMTP_USER}>`,
    to: studentEmail,
    subject: "Your Dance Class Booking Confirmation",
    html: `
<div style="background:#ffffff;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#000;">
  <div style="max-width:600px;margin:auto;border-radius:18px;box-shadow:0 14px 40px rgba(0,0,0,.08);overflow:hidden;">
    <div style="background:#ff2d84;color:#fff;padding:20px;">
      <h2 style="margin:0;">Booking Received 💃</h2>
    </div>

    <div style="padding:24px;">
      <p>Hi <strong>${studentName}</strong>,</p>

      <table width="100%" cellpadding="6" style="font-size:14px;">
        <tr><td><strong>Dance Style</strong></td><td align="right">${danceStyle}</td></tr>
        <tr><td><strong>Class Type</strong></td><td align="right">${classType}</td></tr>

        ${
          classType === "Group"
            ? `<tr><td><strong>Schedule</strong></td><td align="right">${groupDay}</td></tr>`
            : `
              <tr><td><strong>Package</strong></td><td align="right">${privatePackage}</td></tr>
              <tr><td><strong>Preferred Time</strong></td><td align="right">${preferredDay} – ${preferredTime}</td></tr>
              <tr><td><strong>Location</strong></td><td align="right">${location}</td></tr>
            `
        }

        <tr>
          <td style="border-top:1px solid #ddd;"><strong>Total Paid</strong></td>
          <td align="right" style="border-top:1px solid #ddd;color:#ff2d84;"><strong>${amount}</strong></td>
        </tr>
      </table>

      <p style="margin-top:16px;">We’ll confirm your schedule shortly.</p>
    </div>
  </div>
</div>
`,
  };

  /* ---------- STUDIO EMAIL (SAME DESIGN, LINK INSTEAD OF ATTACHMENT) ---------- */
  const studioMail = {
    from: `"Booking Notification" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: "New Class Booking Received",
    html: `
<div style="font-family:Arial;background:#fff;padding:20px;">
  <h2 style="color:#ff2d84;">New Booking</h2>

  <table width="100%" cellpadding="6" style="font-size:14px;">
    <tr><td><strong>Name</strong></td><td>${studentName}</td></tr>
    <tr><td><strong>Email</strong></td><td>${studentEmail}</td></tr>
    <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
    <tr><td><strong>Dance Style</strong></td><td>${danceStyle}</td></tr>
    <tr><td><strong>Class Type</strong></td><td>${classType}</td></tr>

    ${
      classType === "Group"
        ? `<tr><td><strong>Schedule</strong></td><td>${groupDay}</td></tr>`
        : `
          <tr><td><strong>Package</strong></td><td>${privatePackage}</td></tr>
          <tr><td><strong>Preferred Time</strong></td><td>${preferredDay} – ${preferredTime}</td></tr>
          <tr><td><strong>Location</strong></td><td>${location}</td></tr>
        `
    }

    <tr>
      <td><strong>Total Paid</strong></td>
      <td style="color:#ff2d84;"><strong>${amount}</strong></td>
    </tr>
  </table>

  ${
    receiptUrl
      ? `
        <p style="margin-top:16px;">
          <strong>Payment Receipt:</strong><br/>
          <a href="${receiptUrl}" target="_blank"
             style="display:inline-block;margin-top:8px;padding:10px 14px;
                    background:#ff2d84;color:#fff;text-decoration:none;
                    border-radius:6px;font-size:14px;">
            View Receipt
          </a>
        </p>
      `
      : `<p><strong>No receipt uploaded</strong></p>`
  }
</div>
`,
  };

  await transporter.sendMail(studentMail);
  await transporter.sendMail(studioMail);
}
