import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "jsr:@zod/zod";
import { zValidator } from "jsr:@hono/zod-validator";
import { Database } from "../../supabase_types.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabase_anon_key = Deno.env.get("SUPABASE_ANON_KEY")!;
// const supabase_service_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient<Database>(supabaseUrl, supabase_anon_key);

// const supabaseAdmin = createClient<Database>(supabaseUrl, supabase_service_key);

const schema = z.object({
  passage_id: z.string(),
  exercise_id: z.string(),
  wpm: z.number(),
  comprehension: z.number(),
  duration: z.number(),
  total_words: z.number(),
  correct_answers: z.number(),
  total_questions: z.number(),
  start_time: z.number(),
  elapsed_time: z.number(),
});

type schema = z.infer<typeof schema>;

function updateStreak(lastDate: string | null, currentStreak: number) {
  const today = new Date();
  const last = lastDate ? new Date(lastDate) : null;

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const startOfLast = last
    ? new Date(last.getFullYear(), last.getMonth(), last.getDate())
    : null;

  if (!last) {
    // first time
    return { streak: 1, date: startOfToday };
  }

  const diffDays = (startOfToday.getTime() - startOfLast!.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays === 0) {
    // already logged today
    return { streak: currentStreak, date: startOfToday };
  }

  if (diffDays === 1) {
    // continued streak
    return { streak: currentStreak + 1, date: startOfToday };
  }

  // broke streak
  return { streak: 1, date: startOfToday };
}

const app = new Hono();

app.get("/practice", async (c) => {
  try {
    const { data, error } = await supabase.from("exercises").select("*");
    if (error) throw error;
    return c.json({ success: true, data, message: "Successfully retrieved" });
  } catch (error) {
    console.log({ error });
    return c.json(
      { success: true, data: null, message: "Failed retrieved" },
      500,
    );
  }
});

app.get("/practice/passage", async (c) => {
  try {
    const { data: passageIds, error } = await supabase.from("passages").select(
      "id",
    );
    if (error) {
      throw new Error(error.message);
    }

    if (!passageIds || passageIds.length === 0) {
      throw new Error("No passages available");
    }

    const randomId = passageIds[Math.floor(Math.random() * passageIds.length)];

    const { data: passage } = await supabase.from("passages").select("*").eq(
      "id",
      randomId.id,
    ).single();

    if (!passage) {
      throw new Error("Passage not found");
    }
    return c.json({
      success: true,
      data: passage,
      message: "Successfully retrieved passage",
    });
  } catch (error) {
    console.error("Error fetching passage:", error);
    if (error instanceof Error) {
      return c.json({
        success: false,
        data: null,
        message: `Error fetching passage: ${error.message}`,
      }, 500);
    }

    return c.json({
      success: false,
      data: null,
      message: `Error fetching passage`,
    }, 500);
  }
});

app.post("/practice/session", zValidator("json", schema), async (c) => {
  try {
    const vettedData = c.req.valid("json");

    const { data: user, error } = await supabase.from("users").select(
      "id, total_sessions, streak_days, xp_earned, current_wpm, current_comprehension_score, last_active_date",
    ).single();
    if (error || !user) throw error;

    const res = await supabase.from("practice_sessions").insert({
      ...vettedData,
      user_id: user?.id,
    });

    const { data, error: avgError } = await supabase.rpc("update_avg_scores", {
      uid: user.id,
    });

    console.log({ data });

    if (avgError) throw avgError;

    const streakTracker = updateStreak(
      user.last_active_date,
      user.streak_days!,
    );

    await supabase.from("users").update({
      total_sessions: (user.total_sessions! + 1) || 1,
      last_active_date: streakTracker.date.toISOString(),
      streak_days: streakTracker.streak,
    });

    if (res.error) throw res.error;

    return c.json({ success: true, message: "Session successfully recorded" });
  } catch (error) {
    console.log(error);
    return c.json({ success: false, message: "Something went wrong" }, 500);
  }
});

Deno.serve(app.fetch);
