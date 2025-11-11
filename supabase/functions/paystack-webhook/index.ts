import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/hono/cors";
import crypto from "node:crypto";
import { createClient } from "jsr:@supabase/supabase-js@2";
import type { Database } from "../../supabase_types.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabase_service_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const secret = Deno.env.get("PAYSTACK_SECRET_KEY")!;

const supabaseAdmin = createClient<Database>(supabaseUrl, supabase_service_key);

const app = new Hono();
app.use("*", cors());

app.post("/paystack-webhook", async (c) => {
  const payload = await c.req.json();
  const signature = c.req.header("x-paystack-signature");

  const hash = crypto.createHmac("sha512", secret).update(
    JSON.stringify(payload),
  ).digest("hex");
  if (hash !== signature) {
    c.json({ success: false, message: "Not authorized" }, 401);
  }

  const { data: customer, error: customerError } = await supabaseAdmin
    .from("users")
    .select("id").eq("email", payload.data.customer.email)
    .single();

  if (customerError || !customer) {
    return new Response("user not found", { status: 400 });
  }

  const is_subscribed = payload.event === "charge.success";

  await supabaseAdmin.from("paystack_payloads").insert([
    {
      payload,
      user_id: customer.id,
    },
  ]);

  await supabaseAdmin.from("users").update({ is_subscribed }).eq(
    "id",
    customer.id,
  );

  return new Response("got it", { status: 200 });
});

Deno.serve(app.fetch);
