import { DragDropCanvas } from '@/components/DragDropCanvas';
import type { AiGenerationResponse } from '@websmith/types';
import { Section, Card, Button } from '@websmith/ui';

const mockGeneration: AiGenerationResponse = {
  sections: [
    { id: 'hero-1', type: 'Hero', props: {}, content: '' },
    { id: 'features-1', type: 'Features', props: {}, content: '' },
    { id: 'pricing-1', type: 'Pricing', props: {}, content: '' },
  ],
  seo: {
    title: 'Demo proyecto',
    description: 'Un proyecto demo generado vía IA.',
    keywords: ['demo'],
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-12 py-10">
      <Section>
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <Card
            title="Lienzo"
            description="Reordena secciones y edita propiedades en tiempo real."
            actions={<Button href="/preview/demo-cafe">Previsualizar</Button>}
          >
            <DragDropCanvas initialSections={mockGeneration.sections} />
          </Card>
          <Card title="SEO" description="Metadatos optimizados">
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-semibold text-slate-700 dark:text-slate-200">Título</dt>
                <dd>{mockGeneration.seo.title}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700 dark:text-slate-200">Descripción</dt>
                <dd>{mockGeneration.seo.description}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </Section>
    </div>
  );
}
