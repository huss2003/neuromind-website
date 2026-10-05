import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Accordion from './Accordion';
import { ArrowRight, Close } from './Icons';
import { ProjectThumb, type ProjectThumbKind } from './program-visuals';
import type { FaqItem, ProjectExample, RoleArea, SkillGroup } from '../data/types';

const thumbKind = (p: ProjectExample): ProjectThumbKind =>
  (p.thumb as ProjectThumbKind | undefined) || 'dashboard';

const yearTag = (p: ProjectExample) => (p.year != null ? `Year ${p.year}` : null);

const splitSkills = (s: string): string[] =>
  s.split(',').map((x) => x.trim()).filter(Boolean);

/* ---------------- SpecStrip ---------------- */

export function SpecStrip({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="ps-spec-strip">
      {items.map((item) => (
        <div key={item.label} className="ps-spec">
          <dt className="mono-label">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------- ProgressionTrack ---------------- */

const NODE_TONES = ['var(--th-node-1)', 'var(--th-node-2)', 'var(--th-node-3)'];
const toneFor = (i: number, n: number) =>
  NODE_TONES[Math.min(2, Math.floor((i / Math.max(1, n - 1)) * 3))];

/* Dev-only: a bad index would render an undefined CSS var (invisible dots). */
if (import.meta.env.DEV) {
  for (let n = 1; n <= 8; n++)
    for (let i = 0; i < n; i++)
      if (!NODE_TONES.includes(toneFor(i, n))) throw new Error(`toneFor out of range: i=${i} n=${n}`);
}

export function ProgressionTrack({ steps }: { steps: string[] }) {
  return (
    <ol className="ps-track">
      {steps.map((label, i) => (
        <li key={i} className="ps-step" style={{ '--ps-node': toneFor(i, steps.length) } as CSSProperties}>
          <span className="ps-node" aria-hidden="true" />
          <span className="ps-step-label">{label}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- ProjectFeatured ---------------- */

export function ProjectFeatured({ project, kicker }: { project: ProjectExample; kicker: string }) {
  const year = yearTag(project);
  return (
    <div className="ps-feat">
      <div className="ps-feat-body">
        <p className="ps-feat-kicker">
          <span className="mono-label">{kicker}</span>
          {year && <span className="ps-tag">{year}</span>}
        </p>
        <h3 className="ps-feat-title">{project.title}</h3>
        <p className="ps-feat-skills">{project.skills}</p>
        <div className="ps-feat-proves">
          <span className="mono-label">What it proves</span>
          <p>{project.produces}</p>
        </div>
        {project.evidence && (
          <div className="ps-feat-proves">
            <span className="mono-label">Portfolio evidence</span>
            <p>{project.evidence}</p>
          </div>
        )}
      </div>
      <div className="ps-feat-frame">
        <ProjectThumb kind={thumbKind(project)} className="ps-thumb" />
      </div>
    </div>
  );
}

/* ---------------- ProjectRail ---------------- */

export function ProjectRail({ projects }: { projects: ProjectExample[] }) {
  const dlgRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [active, setActive] = useState<ProjectExample | null>(null);

  /* Native <dialog>: focus trap, Escape close and focus return to the opened card
     are platform behavior; state only mirrors what is shown. */
  useEffect(() => {
    const dlg = dlgRef.current;
    if (!dlg) return;
    if (active && !dlg.open) dlg.showModal();
    else if (!active && dlg.open) dlg.close();
  }, [active]);

  return (
    <div className="ps-rail-wrap">
      <ul className="ps-rail" aria-label="Projects">
        {projects.map((project) => {
          const skills = splitSkills(project.skills);
          const shown = skills.slice(0, 3);
          const year = yearTag(project);
          return (
            <li key={project.title} className="ps-rail-item">
              <button
                type="button"
                className="ps-rail-card"
                aria-haspopup="dialog"
                onClick={() => setActive(project)}
              >
                <span className="ps-rail-thumb">
                  <ProjectThumb kind={thumbKind(project)} className="ps-thumb" />
                </span>
                {year && <span className="ps-tag">{year}</span>}
                <span className="ps-rail-title">{project.title}</span>
                <span className="ps-rail-chips">
                  {shown.map((s) => (
                    <span key={s} className="ps-skill-chip">
                      {s}
                    </span>
                  ))}
                  {skills.length > shown.length && (
                    <span className="ps-skill-chip ps-skill-more">+{skills.length - shown.length}</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dlgRef}
        className="ps-modal"
        aria-labelledby={titleId}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dlgRef.current) dlgRef.current?.close();
        }}
      >
        {active && (
          <div className="ps-modal-body">
            <div className="ps-modal-head">
              <div>
                {yearTag(active) && <span className="ps-tag">{yearTag(active)}</span>}
                <h3 id={titleId}>{active.title}</h3>
              </div>
              <button
                type="button"
                className="ps-modal-close"
                aria-label="Close"
                onClick={() => dlgRef.current?.close()}
              >
                <Close />
              </button>
            </div>
            <div className="ps-modal-lines">
              <div>
                <span className="mono-label">Skills</span>
                <p>{active.skills}</p>
              </div>
              <div>
                <span className="mono-label">What it proves</span>
                <p>{active.produces}</p>
              </div>
              {active.evidence && (
                <div>
                  <span className="mono-label">Portfolio evidence</span>
                  <p>{active.evidence}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

/* ---------------- TabbedSkillsRoles ---------------- */

const TABS = ['Skills', 'Possible roles'] as const;

export function TabbedSkillsRoles({
  skills,
  roles,
  roleTiers,
}: {
  skills: SkillGroup[];
  roles: RoleArea[];
  roleTiers?: { strong: string[]; possible: string[] };
}) {
  const [tab, setTab] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = TABS.length - 1;
    let next = -1;
    if (e.key === 'ArrowRight') next = tab === last ? 0 : tab + 1;
    else if (e.key === 'ArrowLeft') next = tab === 0 ? last : tab - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next < 0) return;
    e.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="ps-tabs-root">
      <div className="ps-tablist" role="tablist" aria-label="Skills and roles">
        {TABS.map((t, i) => (
          <button
            key={t}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={tab === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={tab === i ? 0 : -1}
            className="ps-tab"
            onClick={() => setTab(i)}
            onKeyDown={onTabKey}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-0`}
        aria-labelledby={`${baseId}-tab-0`}
        tabIndex={0}
        hidden={tab !== 0}
        className="ps-panel"
      >
        {skills.map((g) => {
          const shown = g.items.slice(0, 8);
          return (
            <div key={g.group} className="ps-skill-group">
              <h4 className="mono-label">{g.group}</h4>
              <div className="ps-chips">
                {shown.map((s) => (
                  <span key={s} className="ps-skill-chip">
                    {s}
                  </span>
                ))}
                {g.items.length > shown.length && (
                  <span className="ps-skill-chip ps-skill-more">+{g.items.length - shown.length}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-1`}
        aria-labelledby={`${baseId}-tab-1`}
        tabIndex={0}
        hidden={tab !== 1}
        className="ps-panel"
      >
        {roleTiers ? (
          <>
            {roleTiers.strong.length > 0 && (
              <div className="ps-skill-group">
                <h4 className="mono-label">Strong alignment</h4>
                <div className="ps-chips">
                  {roleTiers.strong.map((r) => (
                    <span key={r} className="ps-role-chip">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {roleTiers.possible.length > 0 && (
              <div className="ps-skill-group">
                <h4 className="mono-label">Possible with further work</h4>
                <div className="ps-chips">
                  {roleTiers.possible.map((r) => (
                    <span key={r} className="ps-role-chip">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <ul className="ps-roles">
            {roles.map((r) => (
              <li key={r.role} className="ps-role">
                <b>{r.role}</b>
                <span>{r.note}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="ps-note">Illustrative directions only — NeuroMind does not guarantee employment.</p>
    </div>
  );
}

/* ---------------- FAQSplit ---------------- */

export function FAQSplit({ faqs, contactHref }: { faqs: FaqItem[]; contactHref: string }) {
  return (
    <div className="ps-faq">
      <div className="ps-faq-list">
        {faqs.slice(0, 6).map((f) => (
          <Accordion key={f.q} title={f.q}>
            {f.a}
          </Accordion>
        ))}
      </div>
      <aside className="ps-faq-card">
        <h3>Still have questions?</h3>
        <p>Not covered above? Send us your question and we&rsquo;ll get back to you.</p>
        <a className="btn btn-secondary ps-cta" href={contactHref}>
          Talk to Us <ArrowRight />
        </a>
      </aside>
    </div>
  );
}
