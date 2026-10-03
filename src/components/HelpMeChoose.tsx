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

    // Education answer (question 2) decides entry-level eligibility.
    // Standard 8 or 9 meets only the foundation entry requirement (Standard 8).
    const eduIndex = next[1];
    const eligible = new Set(
      eduIndex === 0
        ? ['ai-foundation']
        : programs.map((p) => p.slug),
    );

    const interestIdx = next[0];
    const enjoyIdx = next[2];
    const interestLabel = questions[0].options[interestIdx].label;
    const enjoyLabel = questions[2].options[enjoyIdx].label;
    const exploring = interestIdx === 3 && enjoyIdx === 5;

    const scored = programs
      .filter((p) => eligible.has(p.slug))
      .map((p) => {
        const primary = questions[0].options[interestIdx].slugs[0];
        const interestMatch =
          interestIdx !== 3 && questions[0].options[interestIdx].slugs.includes(p.slug);
        const enjoyMatch =
          enjoyIdx !== 5 && questions[2].options[enjoyIdx].slugs.includes(p.slug);
        const score =
          (p.slug === primary ? 10 : 0) + (interestMatch ? 6 : 0) + (enjoyMatch ? 4 : 0);

        let reason: string;
        if (exploring) {
          reason =
            p.category === 'foundation'
              ? 'A short, beginner-friendly year to explore AI before choosing a longer specialization.'
              : 'One of the full professional pathways — explore the curriculum to see if it fits.';
        } else if (interestMatch && enjoyMatch) {
          reason = `Matches your interest in ${interestLabel.toLowerCase()} and what you enjoy — ${enjoyLabel.toLowerCase()}.`;
        } else if (interestMatch) {
          reason = `Matches your interest in ${interestLabel.toLowerCase()}.`;
        } else if (enjoyMatch) {
          reason = `Builds on what you enjoy most — ${enjoyLabel.toLowerCase()}.`;
        } else {
          reason = 'Shares core topics with your stated interests.';
        }
        return { p, score, reason };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setResult(scored.map((s) => ({ program: s.p, reason: s.reason })));
    setUnderage(eduIndex === 0);
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
            {questions[step].hint && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', margin: '-10px 0 16px' }}>
                {questions[step].hint}
              </p>
            )}
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
