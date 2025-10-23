import { clientEnv } from "@/config/env";
import { useOnboardingStore } from "@/store";
import { createClient } from "@supabase/supabase-js";

class SupabaseService {
  private supabase;
  constructor() {
    this.supabase = createClient(
      clientEnv.VITE_SUPABASE_URL,
      clientEnv.VITE_SUPABASE_ANON_KEY,
    );
  }

  public async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  public async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  public async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  public async getUserOnboardingStatus(): Promise<boolean> {
    const { data, error } = await this.supabase
      .from("users")
      .select("onboardingComplete")
      .single();

    const res = await this.supabase.from("users").select("*");

    console.log({ res });

    if (error) {
      return false;
    }
    return data.onboardingComplete as boolean;
  }

  public async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      return null;
      // throw new Error(error.message);
    }
    return data.session;
  }

  public async getUser() {
    const { error, data } = await this.supabase
      .from("users")
      .select("*")
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  public async insertUser() {
    const {
      email,
      dateOfBirth,
      achievements,
      baseLineWPM,
      badges,
      goals,
      contentTypes,
      challenges,
      currentComprehensionScore,
      focusScore,
      dailyReminder,
      weeklyProgress,
      streakDays,
      xpEarned,
      currentWPM,
      level,
      baselineComprehension,
      currentComprehension,
      onboardingComplete,
    } = useOnboardingStore.getState();

    const { error, data } = await this.supabase.from("users").insert({
      email,
      dateOfBirth,
      achievements,
      baseLineWPM,
      badges,
      goals,
      contentTypes,
      challenges,
      currentComprehensionScore,
      focusScore,
      dailyReminder,
      weeklyProgress,
      streakDays,
      xpEarned,
      currentWPM,
      level,
      baselineComprehension,
      currentComprehension,
      onboardingComplete,
    });

    if (error) {
      console.log({ error });
      throw new Error(error.message);
    }
    return data;
  }
}

export const supabaseService = new SupabaseService();
