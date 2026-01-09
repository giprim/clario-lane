import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "npm:hono";
import { corsMiddleware } from "../_shared/cors-middleware.ts";
import {
  getPasswordChangedEmail,
  getSubscriptionCancelledEmail,
  getSubscriptionCreatedEmail,
  getWelcomeEmail,
} from "./templates.ts";

const app = new Hono();

// Apply CORS middleware globally
app.use("/*", corsMiddleware);

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface EmailRequest {
  type:
    | "WELCOME"
    | "PASSWORD_CHANGED"
    | "SUBSCRIPTION_CANCELLED"
    | "SUBSCRIPTION_CREATED";
  email: string;
  data?: any;
}

app.post("/send-email", async (c) => {
  try {
    const { type, email, data } = await c.req.json<EmailRequest>();

    if (!email || !type) {
      return c.json(
        { success: false, message: "Missing required fields" },
        400,
      );
    }

    let subject = "";
    let html = "";

    switch (type) {
      case "WELCOME":
        subject = "Welcome to ClarioLane!";
        html = getWelcomeEmail(data?.name || "there");
        break;
      case "PASSWORD_CHANGED":
        subject = "Security Alert: Password Changed";
        html = getPasswordChangedEmail(data?.name || "there");
        break;
      case "SUBSCRIPTION_CANCELLED":
        subject = "Subscription Cancelled";
        html = getSubscriptionCancelledEmail(data?.name || "there");
        break;
      case "SUBSCRIPTION_CREATED":
        subject = "Subscription Confirmed";
        html = getSubscriptionCreatedEmail(
          data?.name || "there",
          data?.planName,
        );
        break;
      default:
        return c.json({ success: false, message: "Invalid email type" }, 400);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ClarioLane <noreply@clariolane.com>",
        to: [email],
        subject: subject,
        html: html,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API Error:", error);
      return c.json({ success: false, message: "Failed to send email" }, 500);
    }

    const result = await res.json();
    return c.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Error sending email:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);
