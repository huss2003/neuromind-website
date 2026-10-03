export interface Month {
  n: number;
  title: string;
  stage?: string;
  weeks?: number;
  hours?: number;
  core: string;
  labs?: string;
  portfolio: string;
  assessment: string;
}

export interface Year {
  n: number;
  label: string;
  focus: string;
  months: Month[];
}

export interface Cert {
  name: string;
  window: string;
  role: string;
  note?: string;
}

export interface ProjectExample {
  title: string;
  skills: string;
  produces: string;
  evidence?: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface RoleArea {
  role: string;
  note: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Program {
  slug: string;
  title: string;
  shortTitle: string;
  cardTitle: string;
  category: 'foundation' | 'professional';
  accent: string;
  accentSoft: string;
  /** AA-safe darker accent for button backgrounds (white text) */
  accentStrong: string;
  /** AA-safe darker accent for small text on soft/white backgrounds */
  accentInk: string;
  tagline: string;
  description: string;
  duration: string;
  hours: string;
  weekly: string;
  entry: string;
  calendar: string;
  progression: string[];
  cardChips: string[];
  areas: string[];
  suitableFor: string[];
  beforeYouChoose: string;
  whereYouStart: string;
  whereYouProgress: string;
  years: Year[];
  projects: ProjectExample[];
  certifications: Cert[];
  certNote?: string;
  assessmentModel: string[];
  portfolioJourney: { milestone: string; output: string }[];
  skills: SkillGroup[];
  roles: RoleArea[];
  hardware?: string;
  notes: string[];
  faqs: FaqItem[];
}
