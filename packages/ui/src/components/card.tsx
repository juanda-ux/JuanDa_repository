import type { PropsWithChildren, ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps extends PropsWithChildren {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const Card = ({ title, description, actions, className, children }: CardProps) => (
  <section
    className={clsx(
      'rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900',
      className,
    )}
    role="region"
    aria-label={typeof title === 'string' ? title : undefined}
  >
    {(title || description) && (
      <header className="mb-4">
        {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
        {description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>}
      </header>
    )}
    <div className="text-slate-700 dark:text-slate-200">{children}</div>
    {actions && <footer className="mt-4 flex gap-2">{actions}</footer>}
  </section>
);
