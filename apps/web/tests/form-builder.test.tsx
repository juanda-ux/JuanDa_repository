import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormBuilder } from '../components/FormBuilder';

describe('FormBuilder', () => {
  it('submits valid data', async () => {
    const onSubmit = vi.fn();
    render(<FormBuilder onSubmit={onSubmit} />);

    fireEvent.input(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar formulario' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: 'Ana', email: 'ana@example.com', message: undefined });
    });
  });
});
