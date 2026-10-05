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
  /** Program-page redesign: year the project belongs to (1|2|3 — always 1 for the foundation). */
  year?: number;
  /** Program-page redesign: capstone flag — true on exactly one project (the final capstone). */
  featured?: boolean;
  /** Program-page redesign: card thumb kind — one of 'notebook'|'chart'|'dashboard'|'terminal'|'siem'|'wireframe'|'prototype'. */
  thumb?: string;
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
  /** Program-page redesign signature: 'ai' (foundation) | 'ds' | 'cyber' | 'ux'. */
  signature: 'ai' | 'ds' | 'cyber' | 'ux';
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
  /** Next intake — 'To be announced' until the owner confirms dates (no fake dates). */
  nextBatch: string;
  progression: string[];
  cardChips: string[];
  areas: string[];
  suitableFor: string[];
  /** 3–4 "A good fit if…" statements for the program page. */
  fitGood: string[];
  /** 2–3 "Probably not for you if…" statements, derived honestly from the program's own caveats. */
  fitNot: string[];
  beforeYouChoose: string;
  whereYouStart: string;
  whereYouProgress: string;
  years: Year[];
  projects: ProjectExample[];
  certifications: Cert[];
  /** Gantt windows mapped from certifications[].window (foundation: 1–12 scale; professional: 1–36 scale). */
  certWindows: { name: string; startMonth: number; months: number }[];
  certNote?: string;
  assessmentModel: string[];
  portfolioJourney: { milestone: string; output: string }[];
  skills: SkillGroup[];
  roles: RoleArea[];
  hardware?: string;
  /** Spec table split from the existing hardware text; 'recommended' only where the text states one. */
  hardwareSpecs?: { item: string; min: string; recommended?: string }[];
  notes: string[];
  faqs: FaqItem[];
}
