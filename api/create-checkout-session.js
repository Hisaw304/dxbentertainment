import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PRICE IDS
const PRICE_GROUP_80 = process.env.PRICE_GROUP_80;
const PRICE_GROUP_90 = process.env.PRICE_GROUP_90;

const PRICE_PRIVATE_1 = process.env.PRICE_PRIVATE_1;
const PRICE_PRIVATE_3 = process.env.PRICE_PRIVATE_3;
const PRICE_PRIVATE_6 = process.env.PRICE_PRIVATE_6;

const PRICE_PREMIUM_1 = process.env.PRICE_PREMIUM_1;
const PRICE_PREMIUM_3 = process.env.PRICE_PREMIUM_3;
const PRICE_PREMIUM_6 = process.env.PRICE_PREMIUM_6;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
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
    } = req.body;

    /* ---------------- VALIDATION ---------------- */
    if (!name || !email || !danceStyle || !classType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    /* ---------------- PRICE LOGIC ---------------- */
    let priceId = null;
    let location = "";

    const premiumStyles = ["Contemporary", "Samba"];

    if (classType === "Group") {
      if (!groupDay) {
        return res.status(400).json({ error: "Group day required" });
      }

      priceId =
        danceStyle === "Afro Sexy Ladies Heels"
          ? PRICE_GROUP_90
          : PRICE_GROUP_80;

      if (groupDay.includes("Sunday")) {
        location = "Dubai Marina";
      } else if (groupDay.includes("Monday") || groupDay.includes("Thursday")) {
        location = "Dubai JVC";
      }
    }

    if (classType === "Private") {
      if (!privatePackage || !preferredDay || !preferredTime) {
        return res.status(400).json({ error: "Private class details missing" });
      }

      const isPremium = premiumStyles.includes(danceStyle);

      if (privatePackage === "1 Class") {
        priceId = isPremium ? PRICE_PREMIUM_1 : PRICE_PRIVATE_1;
      }

      if (privatePackage === "3 Classes") {
        priceId = isPremium ? PRICE_PREMIUM_3 : PRICE_PRIVATE_3;
      }

      if (privatePackage === "Monthly (6 Classes)") {
        priceId = isPremium ? PRICE_PREMIUM_6 : PRICE_PRIVATE_6;
      }

      location = "JLT, Cluster C, Dubai";
    }

    if (!priceId) {
      return res.status(400).json({ error: "Invalid booking selection" });
    }

    /* ---------------- STRIPE SESSION ---------------- */
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.SITE_URL}?payment=success`,
      cancel_url: `${process.env.SITE_URL}?payment=cancel`,

      metadata: {
        name,
        email,
        phone: phone || "",
        danceStyle,
        classType,
        groupDay: groupDay || "",
        privatePackage: privatePackage || "",
        preferredDay: preferredDay || "",
        preferredTime: preferredTime || "",
        location,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Stripe session failed" });
  }
}
