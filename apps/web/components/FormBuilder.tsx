'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card } from '@websmith/ui';

const formSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  message: z.string().optional(),
});

export type FormBuilderValues = z.infer<typeof formSchema>;

interface FormBuilderProps {
  onSubmit: (values: FormBuilderValues) => Promise<void> | void;
}

export const FormBuilder = ({ onSubmit }: FormBuilderProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormBuilderValues>({ resolver: zodResolver(formSchema) });

  return (
    <Card title="Formulario de contacto" description="Personaliza campos y validaciones accesibles.">
      <form className="space-y-4" onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <label className="block">
              <span className="text-sm font-semibold">Nombre</span>
              <input
                {...field}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {errors.name && (
                <span id="name-error" className="mt-1 block text-sm text-red-600">
                  {errors.name.message}
                </span>
              )}
            </label>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <label className="block">
              <span className="text-sm font-semibold">Email</span>
              <input
                {...field}
                type="email"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && (
                <span id="email-error" className="mt-1 block text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}
            </label>
          )}
        />
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <label className="block">
              <span className="text-sm font-semibold">Mensaje</span>
              <textarea
                {...field}
                rows={4}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Guardar formulario
        </Button>
      </form>
    </Card>
  );
};
