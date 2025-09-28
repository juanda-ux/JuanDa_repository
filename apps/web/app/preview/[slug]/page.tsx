import { Hero, Section, Card } from '@websmith/ui';

interface PreviewPageProps {
  params: { slug: string };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  return (
    <div className="space-y-12 py-10">
      <Hero
        eyebrow="Vista previa"
        title={`Proyecto ${params.slug}`}
        description="Vista previa generada con tokens accesibles y componentes responsivos."
        primaryAction={{ label: 'Comprar ahora', href: '#pricing' }}
        secondaryAction={{ label: 'Contáctanos', href: '#contact' }}
      />
      <Section id="pricing">
        <Card title="Plan Barista" description="Perfecto para cafeterías modernas.">
          <p className="text-slate-600 dark:text-slate-300">
            Incluye menú digital, reseñas y blog. Optimizado para SEO y velocidad.
          </p>
        </Card>
      </Section>
    </div>
  );
}
