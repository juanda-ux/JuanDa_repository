import type { ReactNode } from 'react';
import { Section } from './section';
import { clsx } from 'clsx';

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  media?: ReactNode;
}

const linkButtonClass = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';

export const Hero = ({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
}: HeroProps) => (
  <Section background="muted" className="relative overflow-hidden">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{eyebrow}</p>
        )}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">{description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {primaryAction && (
            <a
              data-testid="hero-primary"
              href={primaryAction.href}
              className={clsx(linkButtonClass, 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300')}
            >
              {primaryAction.label}
            </a>
          )}
          {secondaryAction && (
            <a
              data-testid="hero-secondary"
              href={secondaryAction.href}
              className={clsx(
                linkButtonClass,
                'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-200',
              )}
            >
              {secondaryAction.label}
            </a>
          )}
        </div>
      </div>
      {media && <div aria-hidden="true">{media}</div>}
    </div>
  </Section>
);
