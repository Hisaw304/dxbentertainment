import Stripe from "stripe";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false, // REQUIRED for Stripe webhooks
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Only react to successful payments
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const data = session.metadata;

    try {
      await sendEmails({
        studentEmail: data.email,
        studentName: data.name,
        phone: data.phone,
        danceStyle: data.danceStyle,
        classType: data.classType,
        groupDay: data.groupDay,
        privatePackage: data.privatePackage,
        preferredDay: data.preferredDay,
        preferredTime: data.preferredTime,
        location: data.location,
        amount: session.amount_total / 100,
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }
  }

  res.json({ received: true });
}

async function sendEmails({
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
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // ---------- STUDENT EMAIL ----------
  const studentMail = {
    from: `"DXB Entertainment" <${process.env.SMTP_USER}>`,
    to: studentEmail,
    subject: "Your Dance Class Booking Confirmation",
    html: `
  <div style="background:#ffffff;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#000000;">
    
    <div style="max-width:600px;margin:0 auto;border-radius:18px;box-shadow:0 14px 40px rgba(10,10,12,0.08);overflow:hidden;">
      
      <!-- HEADER -->
      <div style="background:#ff2d84;color:#ffffff;padding:20px 24px;">
        <h2 style="margin:0;font-size:22px;">Booking Confirmed 💃</h2>
      </div>

      <!-- BODY -->
      <div style="padding:24px;">
        <p style="margin:0 0 16px;font-size:15px;">
          Hi <strong>${studentName}</strong>,
        </p>

        <p style="margin:0 0 20px;font-size:14px;">
          Thank you for booking your dance class with us! Here are your details:
        </p>

        <div style="background:#f9f9f9;border-radius:14px;padding:16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
            <tr>
              <td><strong>Dance Style</strong></td>
              <td align="right">${danceStyle}</td>
            </tr>
            <tr>
              <td><strong>Class Type</strong></td>
              <td align="right">${classType}</td>
            </tr>

            ${
              classType === "Group"
                ? `
                <tr>
                  <td><strong>Schedule</strong></td>
                  <td align="right">${groupDay}</td>
                </tr>
              `
                : `
                <tr>
                  <td><strong>Package</strong></td>
                  <td align="right">${privatePackage}</td>
                </tr>
                <tr>
                  <td><strong>Preferred Time</strong></td>
                  <td align="right">${preferredDay} – ${preferredTime}</td>
                </tr>
                <tr>
                  <td><strong>Location</strong></td>
                  <td align="right">${location}</td>
                </tr>
              `
            }

            <tr>
              <td colspan="2" style="padding-top:12px;border-top:1px solid #ddd;"></td>
            </tr>

            <tr>
              <td style="font-size:15px;"><strong>Total Paid</strong></td>
              <td align="right" style="font-size:15px;color:#ff2d84;">
                <strong>AED ${amount}</strong>
              </td>
            </tr>
          </table>
        </div>

        <p style="margin:20px 0 0;font-size:14px;">
          We’ll confirm your schedule shortly by email.
        </p>

        <p style="margin:12px 0 0;font-size:14px;">
          See you in class 🕺✨
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#000000;color:#ffffff;padding:14px 24px;text-align:center;font-size:12px;">
        © ${new Date().getFullYear()} Dance Studio
      </div>

    </div>
  </div>
  `,
  };

  // ---------- STUDIO EMAIL ----------
  const studioMail = {
    from: `"Booking Notification" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: "New Class Booking Received",
    html: `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#ffffff;padding:20px;color:#000000;">
    <h2 style="color:#ff2d84;">New Booking Received</h2>

    <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
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
        <td style="color:#ff2d84;"><strong>AED ${amount}</strong></td>
      </tr>
    </table>
  </div>
  `,
  };

  await transporter.sendMail(studentMail);
  await transporter.sendMail(studioMail);
}
