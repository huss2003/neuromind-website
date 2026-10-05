import type { CSSProperties, JSX } from 'react';

/* Program-page extras: CertGantt (certification prep timeline) + PortfolioStairs
   (portfolio journey as a rising staircase). Inline styles carry only
   data-driven percentages (bar windows) and the step index (--i); every colour
   comes from the --th-* theme vars set on .program-detail-page in styles.css. */

const monthRange = (startMonth: number, months: number) => {
  const end = startMonth + Math.max(months, 1) - 1;
  return end > startMonth ? `M${startMonth}\u2013M${end}` : `M${startMonth}`;
};

export function CertGantt({ certs, certWindows, totalMonths }: {
  certs: { name: string; role: string }[];
  certWindows: { name: string; startMonth: number; months: number }[];
  totalMonths: number;
}): JSX.Element {
  const total = totalMonths > 0 ? totalMonths : 1; // guard: keeps every % finite
  const ticks = [1];
  for (let m = 6; m < total; m += 6) ticks.push(m);
  if (total > 1) ticks.push(total);

  return (
    <div className="px-gantt" role="group" aria-label="Certification preparation timeline">
      <div className="px-gantt-axis-row" aria-hidden="true">
        <span />
        <div className="px-gantt-axis">
          {ticks.map((m, i) => (
            <span
              key={m}
              className="mono-label px-gantt-tick"
              style={{
                left: `${((m - 1) / total) * 100}%`,
                transform: i === 0 ? 'none' : i === ticks.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
              }}
            >
              M{m}
            </span>
          ))}
        </div>
      </div>
      <ul className="px-gantt-rows">
        {certWindows.map((w) => {
          const role = certs.find((c) => c.name === w.name)?.role;
          const left = Math.min(Math.max(((w.startMonth - 1) / total) * 100, 0), 100);
          const width = Math.min(Math.max((w.months / total) * 100, 0), 100 - left);
          return (
            <li key={w.name} className="px-gantt-row">
              <div className="px-gantt-info">
                <span className="mono-label px-gantt-range">{monthRange(w.startMonth, w.months)}</span>
                <span className="px-gantt-name">{w.name}</span>
                {role && <span className="px-gantt-role">{role}</span>}
              </div>
              <div className="px-gantt-track">
                <span
                  className="px-gantt-bar"
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${w.name}: ${monthRange(w.startMonth, w.months)}`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PortfolioStairs({ journey }: { journey: { milestone: string; output: string }[] }): JSX.Element {
  return (
    <ol className="px-stairs" aria-label="Portfolio development journey">
      {journey.map((step, i) => (
        <li key={step.milestone} className="px-stair" style={{ '--i': i } as CSSProperties}>
          <span className="mono-label px-stair-milestone">{step.milestone}</span>
          <span className="px-stair-output">{step.output}</span>
        </li>
      ))}
    </ol>
  );
}
