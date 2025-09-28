import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button component', () => {
  it('renders as a button by default', () => {
    render(<Button>Click</Button>);
    const button = screen.getByRole('button', { name: 'Click' });
    expect(button).toBeInTheDocument();
  });

  it('renders as anchor when href provided', () => {
    render(
      <Button href="#demo" variant="ghost">
        Demo
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Demo' });
    expect(link).toHaveAttribute('href', '#demo');
  });
});
