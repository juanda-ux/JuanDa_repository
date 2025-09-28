import type { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

interface SectionProps extends PropsWithChildren {
  id?: string;
  background?: 'default' | 'muted' | 'accent';
  className?: string;
}

const backgroundStyles = {
  default: 'bg-white dark:bg-slate-950',
  muted: 'bg-slate-50 dark:bg-slate-900',
  accent: 'bg-blue-50 dark:bg-blue-950',
};

export const Section = ({ id, background = 'default', className, children }: SectionProps) => (
  <section
    id={id}
    className={clsx('py-16 transition-colors duration-300', backgroundStyles[background], className)}
  >
    <div className="mx-auto max-w-6xl px-6">{children}</div>
  </section>
);
