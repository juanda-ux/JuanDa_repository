import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

describe('HomePage', () => {
  it('shows features and CTA', () => {
    render(<HomePage />);
    expect(screen.getByText('Diseña, genera y publica sitios modernos')).toBeInTheDocument();
    expect(screen.getByText('Editor visual accesible')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Comenzar gratis' })).toBeInTheDocument();
  });
});
