import type { Program } from './types';

export const aiFoundation: Program = {
  slug: 'ai-foundation',
  title: '1-Year AI Literacy & AI Foundations Professional Foundation Program',
  shortTitle: 'AI Foundations',
  cardTitle: 'AI Literacy & AI Foundations',
  category: 'foundation',
  accent: '#7C3AED',
  accentStrong: '#6D28D9',
  accentInk: '#6D28D9',
  accentSoft: '#F5F3FF',
  tagline: 'From absolute beginner to AI-literate in one structured academic year.',
  description:
    'A one-year, 104-hour foundation program designed for students entering after Standard 8 with no assumed technical background. The program moves from what AI is and how it affects daily life, through safety and responsible use, machine learning fundamentals, computer vision, NLP, generative AI, prompting, context engineering and no-code automation — ending with Python foundations and certification preparation for Microsoft AI-901 and AWS AIF-C01.',
  duration: '1 Academic Year',
  hours: '104 Hours',
  weekly: '2 Hours/Week',
  entry: 'Standard 8',
  calendar: '52 Weeks · 104 One-Hour Lectures',
  progression: ['Absolute Beginner', 'AI-Literate', 'AI Builder', 'AI Creator'],
  cardChips: ['104 HOURS', '52 WEEKS', '2 HRS/WEEK', 'STANDARD 8'],
  areas: ['AI Foundations', 'Responsible AI', 'Machine Learning Basics', 'Generative AI & LLMs', 'Prompt Engineering', 'No-Code Automation'],
  suitableFor: [
    'School students in Standard 8 or above who are curious about AI',
    'Complete beginners with no programming or technical background',
    'Students who want to understand AI safely and responsibly before specialising',
    'Anyone who wants a structured first year before choosing a longer professional pathway',
  ],
  beforeYouChoose:
    'This is a foundation program, not a substitute for the 3-year professional specializations. It is designed as a strong starting point — students who complete it are prepared to enter a professional pathway at a confident level.',
  whereYouStart:
    'Absolute beginner. No programming, no AI knowledge and no prior technical coursework is assumed. Every lecture begins from zero.',
  whereYouProgress:
    'AI-literate and AI-creator capable: able to explain how AI systems work, use AI tools responsibly, build no-code AI projects, write basic Python, and prepare for entry-level AI certification exams.',
  years: [
    {
      n: 1,
      label: 'The Foundation Year',
      focus: 'Understand AI, use it safely, build with it, and prepare for certification.',
      months: [
        { n: 1, title: 'AI Foundations & History', hours: 8, core: 'AI vs ML vs DL vs GenAI; AI history; predictive, generative and agentic AI.', portfolio: 'AI family-tree poster + AI journal', assessment: 'Unit 1 exam' },
        { n: 2, title: 'Safety, Tools & Responsible AI', hours: 10, core: 'Deepfakes, misinformation, privacy, safe use, bias, fairness and responsible AI.', portfolio: 'AI Use Promise + product audit', assessment: 'Unit 2 exam' },
        { n: 3, title: 'Machine Learning Fundamentals', hours: 8, core: 'Data, features, labels, regression, classification, clustering, train/test, overfitting and accuracy.', portfolio: 'No-code classifier', assessment: 'Unit 3 exam' },
        { n: 4, title: 'Computer Vision + NLP', hours: 8, core: 'Pixels, classification, OCR, sentiment, entities, speech-to-text and text-to-speech.', portfolio: 'Vision project + chatbot flow', assessment: 'Units 4–5 exams' },
        { n: 5, title: 'Generative AI & LLMs', hours: 8, core: 'Tokens, transformers, foundation models, hallucinations, embeddings, copilots and RAG.', portfolio: 'Fact-check / hallucination log', assessment: 'Unit 6 exam' },
        { n: 6, title: 'Prompt Engineering', hours: 8, core: 'Prompt structure, roles, constraints, examples, decomposition, iteration and evaluation.', portfolio: 'Personal prompt library', assessment: 'Unit 7 exam' },
        { n: 7, title: 'Context Engineering & RAG', hours: 8, core: 'Context, retrieval, knowledge bases, grounding, chunking concepts and citations.', portfolio: 'Study-buddy / RAG exercise', assessment: 'Unit 8 exam' },
        { n: 8, title: 'Automation & No-Code AI Agents', hours: 10, core: 'Automation triggers and actions; workflow thinking; n8n, Make and Zapier; connecting AI to workflows; no-code agent instructions, tools and guardrails; testing AI workflows.', portfolio: 'Working no-code AI agent', assessment: 'Unit 9 exam' },
        { n: 9, title: 'Responsible AI, Careers & Capstone', hours: 8, core: 'Responsible AI in real projects; choosing a real problem; requirements and success criteria; capstone architecture; knowledge base and grounding; guardrails, safety tests and measurement.', portfolio: 'AI capstone project', assessment: 'Unit 10 exam' },
        { n: 10, title: 'Python Foundations', hours: 8, core: 'Python setup and Jupyter; variables, conditions, loops, functions, lists and dictionaries; files, errors and modules; APIs and a Python mini utility.', portfolio: 'Python mini utility', assessment: 'Unit 11 exam' },
        { n: 11, title: 'Microsoft Azure AI Fundamentals Preparation', hours: 10, core: 'AI workloads; ML, computer vision, NLP and generative AI concepts for AI-901; Azure AI services; responsible AI and security concepts; scenario practice and mock preparation.', portfolio: 'AI-901 practice lab + readiness review', assessment: 'Unit 12 exam + AI-901 readiness review' },
        { n: 12, title: 'AWS AI Practitioner + Graduation', hours: 10, core: 'AWS AI and ML foundations; generative AI and foundation models; AWS AI services and use cases; responsible AI on AWS; security, privacy and compliance; AI/ML lifecycle thinking; AIF-C01 scenario practice.', portfolio: 'Final creator capstone + certification showcase', assessment: 'Graduation review + AIF-C01 readiness' },
      ],
    },
  ],
  projects: [
    { title: 'No-Code AI Classifier', skills: 'Machine learning basics, data, accuracy', produces: 'A working classifier built without code, with an explanation of how it decides.', evidence: 'A documented classifier build with accuracy notes and an explanation of how it decides.' },
    { title: 'Personal Prompt Library', skills: 'Prompt engineering, evaluation, iteration', produces: 'A curated set of tested prompts with notes on what worked and why.', evidence: 'A curated prompt collection with evaluation notes showing what worked and why.' },
    { title: 'Study-Buddy RAG Exercise', skills: 'Context engineering, retrieval, grounding, citations', produces: 'An AI assistant grounded in supplied documents with traceable citations.', evidence: 'A grounded Q&A exercise with citations showing how each answer was supported.' },
    { title: 'Working No-Code AI Agent', skills: 'Automation workflows, agent instructions, guardrails', produces: 'A functional agent built on n8n/Make/Zapier with tested guardrails.', evidence: 'A working agent with written notes on instructions, guardrails and test results.' },
    { title: 'AI Family Tree + Journal', skills: 'AI history, AI vs ML vs DL vs GenAI, communication', produces: 'A visual map of the AI family and a journal of AI concepts learned.', evidence: 'A visual AI family-tree poster plus a journal of concepts learned.' },
    { title: 'Creator Capstone + Certification Showcase', skills: 'End-to-end AI project, responsible AI, presentation', produces: 'A complete AI portfolio piece presented alongside AI-901 and AIF-C01 readiness evidence.', evidence: 'A capstone AI project presented with AI-901 and AIF-C01 readiness evidence.' },
  ],
  certifications: [
    { name: 'Microsoft Azure AI Fundamentals (AI-901)', window: 'Month 11', role: 'Certification preparation built into the Azure AI fundamentals module.' },
    { name: 'AWS Certified AI Practitioner (AIF-C01)', window: 'Month 12', role: 'Certification preparation built into the AWS AI module and graduation showcase.' },
  ],
  certNote:
    'Certification preparation is embedded inside the program. External certification exams are optional, are conducted by the issuing organisation, and carry separate fees. Completing the program does not automatically award external credentials.',
  assessmentModel: [
    'Each month ends with a major-topic examination.',
    'Practical projects accompany every unit.',
    'A capstone project is completed in Month 9.',
    'Certification-readiness reviews close the program in Months 11 and 12.',
  ],
  portfolioJourney: [
    { milestone: 'Month 1', output: 'First artifact — AI family-tree poster and journal' },
    { milestone: 'Months 2–6', output: 'Safety audit, no-code classifier, vision project, prompt library' },
    { milestone: 'Months 7–9', output: 'RAG exercise, working AI agent, capstone project' },
    { milestone: 'Months 10–12', output: 'Python utility, certification labs, final creator capstone' },
  ],
  skills: [
    { group: 'AI Foundations', items: ['AI vs ML vs DL vs GenAI', 'Predictive, generative and agentic AI', 'How AI systems learn and decide'] },
    { group: 'Responsible AI', items: ['Safety and misinformation', 'Privacy and personal data', 'Bias, fairness and human oversight'] },
    { group: 'Generative AI', items: ['LLMs, tokens and context', 'Prompt engineering', 'Context engineering and RAG'] },
    { group: 'Building', items: ['No-code automation (n8n, Make, Zapier)', 'No-code AI agents', 'Python foundations'] },
    { group: 'Certification Prep', items: ['Microsoft AI-901 concepts', 'AWS AIF-C01 concepts'] },
  ],
  roles: [
    { role: 'AI-literate student ready for a professional pathway', note: 'Foundation graduates can enter any NeuroMind 3-year specialization with confidence.' },
    { role: 'Entry-level AI tooling and automation roles', note: 'With further professional training and portfolio evidence.' },
  ],
  notes: [
    'All 104 hours include learning, practical work, projects, assignments and unit examinations.',
    'The program starts from absolute zero and assumes no prior knowledge of programming, AI or technology.',
    'Each lecture follows a standard 60-minute format: theory, MCQ checks, instructor demonstration and an independent student challenge.',
    'AI tools may assist the work, but students must verify outputs — a principle taught throughout the program.',
    'This program is a foundation, not a substitute for the 3-year professional specializations.',
  ],
  faqs: [
    { q: 'Do I need any technical knowledge to start?', a: 'No. The program is designed for absolute beginners entering after Standard 8. Every lecture starts from zero.' },
    { q: 'Is this the same as the 3-year professional programs?', a: 'No. This is a one-year foundation program. It builds AI literacy and practical basics; the 3-year programs are deep professional specializations in Data Science & AI, Cybersecurity, or Product & UX / AI Design.' },
    { q: 'Are the certifications awarded by NeuroMind?', a: 'No. NeuroMind provides certification preparation inside the program. External exams (Microsoft AI-901, AWS AIF-C01) are optional, are booked with the issuing organisation, and have separate fees.' },
    { q: 'What will I be able to build by the end?', a: 'A no-code AI agent, a prompt library, a RAG exercise, a Python mini utility, a capstone AI project and a certification showcase — all documented in a portfolio.' },
    { q: 'What is the weekly commitment?', a: 'Two hours per week across 52 weeks, totalling 104 hours including examinations.' },
  ],
};
