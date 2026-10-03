import { useId, useState, type ReactNode } from 'react';
import { Plus } from './Icons';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  meta?: ReactNode;
  level?: 'year' | 'month';
  onOpenChange?: (open: boolean) => void;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  meta,
  level = 'year',
  onOpenChange,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={level === 'month' ? 'month-card' : 'acc-item'} data-open={open}>
      <button
        type="button"
        className="acc-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
      >
        {level === 'month' && <span className="month-num">{meta}</span>}
        <span className={level === 'month' ? 'month-title' : undefined}>
          {level === 'year' ? (
            <span className="acc-year-meta">
              {title}
              {meta}
            </span>
          ) : (
            title
          )}
        </span>
        {level !== 'month' && meta === undefined && (
          <span className="acc-icon" aria-hidden="true">
            <Plus />
          </span>
        )}
        {level === 'month' && (
          <span className="acc-icon" aria-hidden="true" style={{ width: 24, height: 24 }}>
            <Plus size={12} />
          </span>
        )}
      </button>
      <div className="acc-body" id={id} role="region">
        <div className="acc-body-inner">
          <div className="acc-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
