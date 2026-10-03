import type { Program } from './types';
import { aiFoundation } from './foundation';
import { dataScienceAi } from './dataScienceAi';
import { cybersecurity } from './cybersecurity';
import { productUx } from './productUx';

export type { Program } from './types';

export const programs: Program[] = [aiFoundation, dataScienceAi, cybersecurity, productUx];

export const foundationProgram = aiFoundation;
export const professionalPrograms: Program[] = [dataScienceAi, cybersecurity, productUx];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export interface ComparisonRow {
  label: string;
  values: string[];
}

export const comparisonRows: ComparisonRow[] = [
  { label: 'Duration', values: programs.map((p) => p.duration) },
  { label: 'Total Hours', values: programs.map((p) => p.hours) },
  { label: 'Weekly Commitment', values: programs.map((p) => p.weekly) },
  { label: 'Entry Level', values: programs.map((p) => p.entry) },
  {
    label: 'Focus',
    values: [
      'AI literacy, responsible AI, generative AI, no-code automation, Python basics',
      'Python, SQL, statistics, machine learning, data engineering, deep learning, MLOps',
      'Networking, Linux, security operations, ethical testing, SOC engineering, cloud security',
      'Design fundamentals, UX research, UI, product thinking, AI product design',
    ],
  },
  { label: 'Progression', values: programs.map((p) => p.progression.join(' \u2192 ')) },
  {
    label: 'Projects',
    values: [
      'No-code AI agent, prompt library, RAG exercise, capstone',
      '36 monthly artifacts + end-to-end data platforms + final capstone',
      '36 lab artifacts + SOC simulations + final enterprise capstone',
      'Research studies, design systems, AI prototypes + final AI product capstone',
    ],
  },
  {
    label: 'Certification Preparation',
    values: programs.map((p) => p.certifications.map((c) => c.name.replace(/ \(.*\)/, '')).join(' \u00b7 ')),
  },
  { label: 'Assessment', values: programs.map((p) => p.assessmentModel[0]) },
];
