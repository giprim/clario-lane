export type ChallengesType = {
  challenge: string;
  description: string;
  id?: string;
  create_at?: string;
  updated_at?: string;
};

export type ContentTypesType = {
  content: string;
  description: string;
  id?: string;
  create_at?: string;
  updated_at?: string;
};

export type GoalsType = {
  goal: string;
  description: string;
  id?: string;
  create_at?: string;
  updated_at?: string;
};

export type OnboardingPreferences = {
  challenges: ChallengesType[];
  contentTypes: ContentTypesType[];
  goals: GoalsType[];
};
