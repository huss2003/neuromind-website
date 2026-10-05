import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { programs } from '../data';
import type { Program } from '../data/types';
import { Close, ArrowRight, Compass } from './Icons';

interface Question {
  q: string;
  hint?: string;
  options: { label: string; slugs: string[] }[];
}

const questions: Question[] = [
  {
    q: 'What interests you most?',
    hint: 'Pick whatever feels closest — there is no wrong answer.',
    options: [
      { label: 'AI & Data', slugs: ['ai-foundation', 'data-science-ai'] },
      { label: 'Security & Technology', slugs: ['cybersecurity'] },
      { label: 'Design & Products', slugs: ['product-ux-ai-design'] },
      { label: "I'm not sure yet", slugs: ['ai-foundation', 'data-science-ai', 'cybersecurity', 'product-ux-ai-design'] },
    ],
  },
  {
    q: 'How far along are you in school?',
    hint: 'This helps us respect each program\'s entry requirement.',
    options: [
      { label: 'Standard 8 or 9', slugs: ['ai-foundation'] },
      { label: 'Class 10 or above', slugs: ['ai-foundation', 'data-science-ai', 'cybersecurity', 'product-ux-ai-design'] },
      { label: 'Higher education or working', slugs: ['ai-foundation', 'data-science-ai', 'cybersecurity', 'product-ux-ai-design'] },
    ],
  },
  {
    q: 'What do you enjoy most?',
    options: [
      { label: 'Working with data', slugs: ['data-science-ai'] },
      { label: 'Building technology', slugs: ['data-science-ai', 'cybersecurity'] },
      { label: 'Finding security problems', slugs: ['cybersecurity'] },
      { label: 'Designing experiences', slugs: ['product-ux-ai-design'] },
      { label: 'Using AI', slugs: ['ai-foundation', 'data-science-ai'] },
      { label: 'Not sure yet', slugs: ['ai-foundation', 'data-science-ai', 'cybersecurity', 'product-ux-ai-design'] },
    ],
  },
  {
    q: 'How comfortable are you with technology?',
    options: [
      { label: 'Complete beginner', slugs: ['ai-foundation', 'data-science-ai', 'cybersecurity', 'product-ux-ai-design'] },
      { label: 'Some experience', slugs: ['data-science-ai', 'cybersecurity', 'product-ux-ai-design'] },
      { label: 'Already technical', slugs: ['data-science-ai', 'cybersecurity', 'product-ux-ai-design'] },
    ],
  },
];

interface Result {
  program: Program;
  reason: string;
}

export interface Scored {
  program: Program;
  score: number;
  reason: string;
}

/**
 * Pure scoring — no React state, no side effects, nothing sent or stored.
 * Every answer contributes: Q2 (education) gates eligibility, Q1 (interest)
 * and Q3 (enjoyment) carry equal weight and drive the reason text, Q4
 * (tech comfort) is a light tiebreaker. Reasons are built from the visitor's
 * actual selected labels, so a card can never quote the wrong answer, and
 * conflicting answers surface BOTH programs, each credited to its own answer.
 */
export function scoreAnswers(ans: number[]): Scored[] {
  const interestIdx = ans[0];
  const eduIdx = ans[1];
  const enjoyIdx = ans[2];
  const techIdx = ans[3];
  const interest = questions[0].options[interestIdx];
  const enjoyment = questions[2].options[enjoyIdx];
  // 3 = "I'm not sure yet", 5 = "Not sure yet" — those carry no directional weight.
  const interestLabel = interestIdx !== 3 ? interest.label : null;
  const enjoyLabel = enjoyIdx !== 5 ? enjoyment.label : null;
  const underage = eduIdx === 0; // Standard 8 or 9

  // Education gating: Standard 8 meets only the foundation entry requirement.
  const eligible = underage
    ? programs.filter((p) => p.slug === 'ai-foundation')
    : programs;

  // ponytail: flat 2-point weights, fine for 4 programs; revisit only if options grow.
  const scored: Scored[] = eligible.map((p) => {
    const interestMatch = interestLabel !== null && interest.slugs.includes(p.slug);
    const enjoyMatch = enjoyLabel !== null && enjoyment.slugs.includes(p.slug);
    let score = 0;
    if (interestMatch) score += 2;
    if (enjoyMatch) score += 2;
    // Complete beginner → the gentler 2 hrs/week foundation pace gets a nudge;
    // otherwise professional programs nudge ahead of the 1-year literacy course.
    if (techIdx === 0) {
      if (p.slug === 'ai-foundation') score += 1;
    } else if (p.slug !== 'ai-foundation') {
      score += 1;
    }

    let reason: string;
    if (interestMatch && enjoyMatch) {
      reason = `Matches your interest in ${interestLabel}, and you said you enjoy ${enjoyLabel}.`;
    } else if (interestMatch) {
      reason = `Matches your interest in ${interestLabel}.`;
    } else if (enjoyMatch) {
      reason = `Because you said you enjoy ${enjoyLabel}.`;
    } else if (underage) {
      reason =
        'Your starting point from Standard 8 — professional programs open after Class 10 passed.';
    } else if (p.slug === 'ai-foundation') {
      reason =
        'A short, beginner-friendly year to explore AI before choosing a longer specialization.';
    } else {
      reason = 'One of the full professional pathways — explore the curriculum to see if it fits.';
    }
    return { program: p, score, reason };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

/**
 * Dev-only assert self-test: fails loudly (throws at import) if a reason ever
 * mislabels an answer, if underage gating breaks, or if conflicting answers
 * stop surfacing both programs. Not shipped in production builds.
 */
function selfTestScoreAnswers(): void {
  const fail = (m: string): never => {
    throw new Error(`scoreAnswers self-test failed: ${m}`);
  };
  const labels = questions.flatMap((q) => q.options.map((o) => o.label));

  // Every reason must quote only labels the visitor actually selected, and
  // Standard 8 or 9 must yield only the foundation program.
  for (let a = 0; a < 4; a++)
    for (let e = 0; e < 3; e++)
      for (let j = 0; j < 6; j++)
        for (let t = 0; t < 3; t++) {
          const ans = [a, e, j, t];
          const chosen = ans.map((oi, qi) => questions[qi].options[oi].label);
          for (const s of scoreAnswers(ans)) {
            for (const label of labels) {
              if (s.reason.includes(label) && !chosen.includes(label)) {
                fail(`reason "${s.reason}" quotes unselected label "${label}" for answers ${JSON.stringify(ans)}`);
              }
            }
          }
          if (e === 0) {
            const res = scoreAnswers(ans);
            if (res.length !== 1 || res[0].program.slug !== 'ai-foundation') {
              fail(`Standard 8 or 9 must return only the foundation program for ${JSON.stringify(ans)}`);
            }
          }
        }

  // The reported bug: interest 'AI & Data' + enjoyment 'Designing experiences'.
  // Both programs must appear, each reason quoting its own answer.
  const conflict = scoreAnswers([0, 1, 3, 1]);
  const slugs = conflict.map((s) => s.program.slug);
  if (!slugs.includes('data-science-ai') || !slugs.includes('product-ux-ai-design')) {
    fail('conflicting answers must show both the interest and the enjoyment program');
  }
  const dsai = conflict.find((s) => s.program.slug === 'data-science-ai');
  const pux = conflict.find((s) => s.program.slug === 'product-ux-ai-design');
  if (!dsai || !dsai.reason.includes('AI & Data')) {
    fail('data-science-ai reason must quote the interest answer');
  }
  if (!pux || !pux.reason.includes('Designing experiences')) {
    fail('product-ux reason must quote the enjoyment answer');
  }
}
if (import.meta.env.DEV) selfTestScoreAnswers();

export default function HelpMeChoose({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result[] | null>(null);
  const [underage, setUnderage] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  // Native <dialog>: focus trap, Escape close, focus return to trigger — all platform behavior.
  // A closed <dialog> is display:none, so it is absent from the accessibility tree until opened.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      setStep(0);
      setAnswers([]);
      setResult(null);
      setUnderage(false);
      dlg.showModal();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  const answer = (qIndex: number, oIndex: number) => {
    const next = [...answers];
    next[qIndex] = oIndex;
    setAnswers(next);

    if (qIndex < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    // All scoring, gating, and reason text live in the pure scoreAnswers().
    const scored = scoreAnswers(next);
    setResult(scored.map((s) => ({ program: s.program, reason: s.reason })));
    setUnderage(next[1] === 0);
  };

  return (
    <dialog
      ref={ref}
      className="hmc-modal"
      aria-labelledby="hmc-title"
      onClose={() => onClose()}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="hmc-head">
        <div>
          <h2 id="hmc-title">{result ? 'Your Path Suggestions' : 'Help Me Choose'}</h2>
          <p>{result ? 'Guidance based on your answers' : 'Answer 4 short questions'}</p>
        </div>
        <button className="hmc-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <Close />
        </button>
      </div>

      {!result && (
        <div className="hmc-progress" aria-hidden="true">
          {questions.map((_, i) => (
            <span key={i} className={i <= step ? 'on' : undefined} />
          ))}
        </div>
      )}

      <div className="hmc-body">
        {!result ? (
          <>
            <p className="hmc-q">
              {step + 1}. {questions[step].q}
            </p>
            {questions[step].hint && <p className="hmc-hint">{questions[step].hint}</p>}
            <div className="hmc-options" role="radiogroup" aria-label={questions[step].q}>
              {questions[step].options.map((opt, oi) => (
                <button
                  key={opt.label}
                  className={`hmc-option${answers[step] === oi ? ' selected' : ''}`}
                  role="radio"
                  aria-checked={answers[step] === oi}
                  onClick={() => answer(step, oi)}
                >
                  <span className="radio" aria-hidden="true" />
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="hmc-result-intro">
              Based on your answers, you may want to explore the following programs. This is
              guidance for exploration — not a formal admissions decision or eligibility check.
              {underage && (
                <>
                  {' '}
                  The three-year professional programs require Class 10 passed, so they are not
                  shown yet — they open up once you reach that level.
                </>
              )}
            </div>

            {answers[0] === 3 && answers[2] === 5 && (
              <div className="hmc-result-intro" style={{ marginTop: 12 }}>
                <b>You are still exploring — that is completely fine.</b> Two good starting
                points: try the one-year AI Foundations program to sample AI broadly, or compare
                all four programs side by side before deciding. You can also ask a question
                directly.
              </div>
            )}

            <div className="hmc-result-cards">
              {result.map(({ program: p, reason }) => (
                <Link
                  key={p.slug}
                  to={`/programs/${p.slug}`}
                  className="hmc-result-card"
                  onClick={() => ref.current?.close()}
                >
                  <span>
                    <span className="rc-title">{p.cardTitle}</span>
                    <span className="rc-meta">
                      {p.category === 'foundation' ? '1-year foundation' : '3-year specialization'} ·{' '}
                      {p.duration} · {p.hours} · Entry: {p.entry}
                    </span>
                    <span className="rc-reason">{reason}</span>
                  </span>
                  <ArrowRight />
                </Link>
              ))}
            </div>

            <p style={{ marginTop: 18, fontSize: '0.8125rem', color: 'var(--ink-3)', lineHeight: 1.6 }}>
              Every NeuroMind program starts from absolute beginner level — no prior technical
              knowledge is needed for any pathway you are eligible for.
            </p>
          </>
        )}
      </div>

      <div className="hmc-foot">
        <div style={{ display: 'flex', gap: 10 }}>
          {!result && step > 0 && (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {result && (
            <button
              className="btn btn-ghost"
              onClick={() => {
                setStep(0);
                setAnswers([]);
                setResult(null);
                setUnderage(false);
              }}
            >
              Start Over
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {result ? (
            <>
              <button className="btn btn-secondary" onClick={() => ref.current?.close()}>
                Close
              </button>
              <Link
                to="/contact"
                className="btn btn-secondary"
                onClick={() => ref.current?.close()}
              >
                Ask a Question
              </Link>
              <Link
                to="/programs"
                className="btn btn-primary"
                onClick={() => ref.current?.close()}
              >
                Compare All Programs <ArrowRight />
              </Link>
            </>
          ) : (
            <span style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', alignSelf: 'center' }}>
              <Compass size={14} /> Question {step + 1} of {questions.length}
            </span>
          )}
        </div>
      </div>
    </dialog>
  );
}
