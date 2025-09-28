import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './hero';

describe('Hero component', () => {
  it('renders headline and actions', () => {
    render(
      <Hero
        eyebrow="New"
        title="Test hero"
        description="Description"
        primaryAction={{ label: 'Start', href: '#start' }}
        secondaryAction={{ label: 'Learn more', href: '#learn' }}
      />,
    );

    expect(screen.getByText('Test hero')).toBeInTheDocument();
    expect(screen.getByTestId('hero-primary')).toHaveAttribute('href', '#start');
    expect(screen.getByTestId('hero-secondary')).toHaveAttribute('href', '#learn');
  });
});
