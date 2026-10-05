import { useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Month, Year } from '../data/types';

/**
 * CurriculumRoadmap — year tabs + month timeline (master) with a sticky detail
 * panel on >=1024px; month accordion (native <details>) below that.
 *
 * Keyboard choices (documented per spec):
 * - Year tabs: ARIA tablist with AUTOMATIC activation — ArrowLeft/ArrowRight
 *   (wrapping), Home/End move selection and focus the newly selected tab.
 *   Roving tabindex; Enter/Space use the button's native click.
 * - Month rows: plain buttons — a nested tablist would be wrong at two levels.
 *   Selected row gets aria-current="true"; ArrowUp/ArrowDown move selection,
 *   Home/End jump; roving tabindex; Enter/Space via native click.
 * - Mobile: native <details>/<summary> = free keyboard + semantics. 'Expand all'
 *   is mobile-only (desktop panel shows one month, so bulk expansion is noise).
 *
 * All copy comes from the Month/Year data — nothing is invented here.
 */

const MAX_CHIPS = 6;
const pad = (n: number) => `M${String(n).padStart(2, '0')}`;

/** Node depth 1..3: stage string wins; unknown stage falls back to position thirds. */
function tierOf(stage: string | undefined, i: number, count: number): 1 | 2 | 3 {
  const s = (stage ?? '').toLowerCase();
  if (s.includes('advanced') || s.includes('professional')) return 3;
  if (s.includes('beginner') || s.includes('intermediate')) return s.includes('absolute') ? 1 : 2;
  return i < count / 3 ? 1 : i < (2 * count) / 3 ? 2 : 3;
}

const chipsOf = (core: string) =>
  core
    .split(/[;,]/)
    .map((c) => c.trim())
    .filter(Boolean);

const hoursOf = (months: Month[]) => months.reduce((sum, m) => sum + (m.hours ?? 0), 0);

export default function CurriculumRoadmap({
  years,
  programTitle,
}: {
  years: Year[];
  programTitle: string;
}) {
  const uid = useId();
  const [yearIdx, setYearIdx] = useState(0);
  const [monthIdx, setMonthIdx] = useState(0);
  const [expandedKey, setExpandedKey] = useState<string | null>(null); // chips '+N more', per month
  const [allOpen, setAllOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const monthRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const accRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  if (!years.length) return null;
  const year = years[Math.min(yearIdx, years.length - 1)];
  const months = year.months;
  if (!months.length) return null;
  const month = months[Math.min(monthIdx, months.length - 1)];

  const yearTotal = hoursOf(months);
  const doneHours = hoursOf(months.slice(0, Math.min(monthIdx, months.length - 1) + 1));
  const pct = yearTotal > 0 ? Math.round((doneHours / yearTotal) * 100) : 0;

  const selectYear = (i: number) => {
    setYearIdx(i);
    setMonthIdx(0);
    setExpandedKey(null);
  };

  const onTabKey = (e: ReactKeyboardEvent, i: number) => {
    const last = years.length - 1;
    let next = -1;
    if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next < 0) return;
    e.preventDefault();
    selectYear(next);
    tabRefs.current[next]?.focus();
  };

  const onMonthKey = (e: ReactKeyboardEvent, i: number) => {
    const last = months.length - 1;
    let next = -1;
    if (e.key === 'ArrowDown') next = Math.min(i + 1, last);
    else if (e.key === 'ArrowUp') next = Math.max(i - 1, 0);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next < 0) return;
    e.preventDefault();
    setMonthIdx(next);
    monthRefs.current[next]?.focus();
  };

  // Native details toggling is uncontrolled; 'Expand all' drives the DOM directly
  // so React never fights the user's manual open/close on re-render.
  const toggleAll = () => {
    const next = !allOpen;
    setAllOpen(next);
    accRefs.current.forEach((d) => {
      if (d) d.open = next;
    });
  };

  /** The five detail blocks — identical order on desktop and mobile. */
  const renderFields = (m: Month) => {
    const key = `m${m.n}`;
    const chips = chipsOf(m.core);
    const chipsOpen = expandedKey === key;
    const shown = chipsOpen ? chips : chips.slice(0, MAX_CHIPS);
    return (
      <>
        <div className="cr-sec">
          <p className="mono-label cr-label">What you'll learn</p>
          <ul className="cr-chips">
            {shown.map((c, i) => (
              <li key={`${key}-${i}`} className="cr-chip">
                {c}
              </li>
            ))}
          </ul>
          {chips.length > MAX_CHIPS && (
            <button
              type="button"
              className="cr-more"
              aria-expanded={chipsOpen}
              onClick={() => setExpandedKey(chipsOpen ? null : key)}
            >
              {chipsOpen ? 'Show less' : `+${chips.length - MAX_CHIPS} more`}
            </button>
          )}
        </div>
        {m.labs && (
          <div className="cr-sec">
            <p className="mono-label cr-label">What you'll do</p>
            <p className="cr-text">{m.labs}</p>
          </div>
        )}
        <div className="cr-sec">
          <p className="mono-label cr-label">What you'll build</p>
          <p className="cr-build">{m.portfolio}</p>
        </div>
        <div className="cr-sec">
          <p className="mono-label cr-label">How you're assessed</p>
          <p className="cr-text">{m.assessment}</p>
        </div>
        <div className="cr-foot">
          {m.hours !== undefined && <span className="mono-label">{m.hours} hours</span>}
          {m.weeks !== undefined && <span className="mono-label">{m.weeks} weeks</span>}
        </div>
      </>
    );
  };

  return (
    <section className="cr-root" aria-label={`${programTitle} — curriculum roadmap`}>
      <div className="cr-years" role="tablist" aria-label="Program years">
        {years.map((y, i) => (
          <button
            key={y.n}
            type="button"
            role="tab"
            id={`${uid}-t${i}`}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            aria-selected={i === yearIdx}
            aria-controls={i === yearIdx ? `${uid}-p${i}` : undefined}
            tabIndex={i === yearIdx ? 0 : -1}
            className="cr-year"
            onClick={() => selectYear(i)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <span className="cr-year-name">
              Year {y.n} · {y.label}
            </span>
            <span className="cr-year-hours mono-label">{hoursOf(y.months)} h</span>
          </button>
        ))}
      </div>

      <div
        className="cr-panel"
        role="tabpanel"
        id={`${uid}-p${yearIdx}`}
        aria-labelledby={`${uid}-t${yearIdx}`}
      >
        {/* Desktop (>=1024px): timeline master + sticky detail panel */}
        <div className="cr-desk">
          {yearTotal > 0 && (
            <div className="cr-progress">
              <div
                className="cr-progress-bar"
                role="progressbar"
                aria-label={`Hours covered in Year ${year.n}`}
                aria-valuemin={0}
                aria-valuemax={yearTotal}
                aria-valuenow={doneHours}
              >
                <span className="cr-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="cr-progress-label mono-label">
                {doneHours} of {yearTotal} hours
              </span>
            </div>
          )}

          <div className="cr-timeline" role="group" aria-label={`Year ${year.n} months`}>
            {months.map((m, i) => (
              <button
                key={m.n}
                type="button"
                ref={(el) => {
                  monthRefs.current[i] = el;
                }}
                className={`cr-row cr-tier-${tierOf(m.stage, i, months.length)}`}
                aria-current={i === monthIdx ? 'true' : undefined}
                tabIndex={i === monthIdx ? 0 : -1}
                onClick={() => setMonthIdx(i)}
                onKeyDown={(e) => onMonthKey(e, i)}
              >
                <span className="cr-node" aria-hidden="true" />
                <span className="cr-row-top">
                  <span className="mono-label cr-row-n">{pad(m.n)}</span>
                  {m.hours !== undefined && <span className="mono-label">{m.hours} h</span>}
                </span>
                <span className="cr-row-title">{m.title}</span>
                {m.stage && <span className="cr-row-stage mono-label">{m.stage}</span>}
              </button>
            ))}
          </div>

          <div className="cr-detail-col">
            <div className="cr-detail">
              <div className="cr-detail-kicker">
                <span className="mono-label cr-detail-n">{pad(month.n)}</span>
                {month.stage && <span className="mono-label cr-detail-stage">{month.stage}</span>}
              </div>
              <h3 className="cr-detail-title">{month.title}</h3>
              {renderFields(month)}
            </div>
          </div>
        </div>

        {/* Mobile (<1024px): month accordion */}
        <div className="cr-mobile">
          <div className="cr-expand-row">
            <button type="button" className="cr-expand" aria-expanded={allOpen} onClick={toggleAll}>
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
          {months.map((m, i) => (
            <details
              key={m.n}
              ref={(el) => {
                accRefs.current[i] = el;
              }}
              open={i === 0}
              className={`cr-acc cr-tier-${tierOf(m.stage, i, months.length)}`}
            >
              <summary className="cr-sum">
                <span className="cr-sum-node" aria-hidden="true" />
                <span className="mono-label cr-sum-n">{pad(m.n)}</span>
                <span className="cr-sum-title">{m.title}</span>
                {m.hours !== undefined && <span className="mono-label cr-sum-h">{m.hours} h</span>}
              </summary>
              <div className="cr-acc-body">{renderFields(m)}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
