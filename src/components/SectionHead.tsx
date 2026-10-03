import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}

export default function SectionHead({ eyebrow, title, sub, center }: Props) {
  return (
    <div className={`section-head${center ? ' center' : ''} reveal`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}
