// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY")!;

// For user-facing operations (respects RLS)
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

// For admin operations (bypasses RLS)
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// url="https://api.paystack.co/subscription/enable"
// authorization="Authorization: Bearer YOUR_SECRET_KEY"
// content_type="Content-Type: application/json"
// data='{
//   "code": "SUB_vsyqdmlzble3uii",
//   "token": "d7gofp6yppn3qz7"
// }'
// url="https://api.paystack.co/subscription/{id_or_code}"
// authorization="Authorization: Bearer YOUR_SECRET_KEY"

const initateTransactionUrl = "https://api.paystack.co/transaction/initialize";

Deno.serve(async (req) => {
  try {
    const ip = req.headers.get("x-forwarded-for");
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const ipInfo = await response.json();
    console.log({ ipInfo });
  } catch (error) {
    console.log(error);
  }

  const userEmail = await supabase.auth.getUser().then(({ data }) =>
    data.user?.email
  ) ||
    "darkness@gmail.com";
  console.log({ userEmail });

  const res = await fetch(initateTransactionUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${paystackSecretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      amount: 5000,
    }),
  });

  const paystackData = await res.json();
  console.log({ paystackData });

  return new Response(
    JSON.stringify(paystackData),
    { headers: { "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/subscription' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
