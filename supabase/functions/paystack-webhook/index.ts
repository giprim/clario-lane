import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/hono/cors";
import { createClient } from "jsr:@supabase/supabase-js@2";
import type { Database } from "../../supabase_types.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabase_service_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabaseAdmin = createClient<Database>(supabaseUrl, supabase_service_key);

const app = new Hono();
app.use("*", cors());
// app.use(
//   "*",
//   ipRestriction(getConnInfo, {
//     denyList: [],
//     allowList: ["52.31.139.75", "52.49.173.169", "52.214.14.220"],
//   }),
// );

const subscriptionEvents = {
  "charge.success": async (data?: any, userId?: string) => {
    await supabaseAdmin
      .from("users")
      .update({
        subscriptions: data,
        is_subscribed: true,
      })
      .eq("id", userId);

    await supabaseAdmin.from("subscribers").insert([
      {
        reference_id: data.data.reference,
        user_id: userId,
      },
    ]);
  },
  "subscription.disable": (data: any, userId?: string) => {
    console.log(data, userId);
  },
  "subscription.not_renew": (data: any, userId?: string) => {
    console.log(data, userId);
  },
  "subscription.create": (data: any, userId?: string) => {
    console.log(data, userId);
  },
  "invoice.update": (data: any, userId?: string) => {
    console.log(data, userId);
  },
  "invoice.payment_failed": (data: any, userId?: string) => {
    console.log(data, userId);
  },
  "invoice.create": (data: any, userId?: string) => {
    console.log(data, userId);
  },
};

type events = keyof typeof subscriptionEvents;

app.post("/paystack-webhook", async (c) => {
  const data = await c.req.json();

  // fetch the user id (single response) and validate
  const { data: customer, error: customerError } = await supabaseAdmin
    .from("users")
    .select("id").eq("email", data.data.customer.email)
    .single();

  if (customerError || !customer) {
    return new Response("user not found", { status: 400 });
  }

  subscriptionEvents[data.event as events](data, customer.id);

  return new Response("got it", { status: 200 });
});

Deno.serve(app.fetch);
