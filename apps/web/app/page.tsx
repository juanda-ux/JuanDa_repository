import { Button, Card, Hero, Section } from '@websmith/ui';

const features = [
  {
    title: 'Editor visual accesible',
    description: 'Construye secciones con drag & drop, grid y árbol de capas con soporte teclado.',
  },
  {
    title: 'Generación asistida por IA',
    description: 'Describe tu idea y genera estructura, copy y assets listos para producción.',
  },
  {
    title: 'Deploy con un clic',
    description: 'Exporta a HTML/CSS/JS optimizado o publica en Vercel/Netlify sin salir de la app.',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero
        eyebrow="Lanza tu sitio hoy"
        title="Diseña, genera y publica sitios modernos"
        description="WebSmith Studio combina IA, un editor visual responsivo y automatización de despliegues para que tu equipo lance experiencias web accesibles en minutos."
        primaryAction={{ label: 'Comenzar gratis', href: '/signup' }}
        secondaryAction={{ label: 'Ver demo', href: '/demo' }}
      />
      <Section id="features">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title} description={feature.description}>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                <li>Componentes hero, pricing, FAQ y más.</li>
                <li>Tokens de diseño compartidos.</li>
                <li>WCAG 2.1 AA de base.</li>
              </ul>
            </Card>
          ))}
        </div>
      </Section>
      <Section id="cta" background="accent">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Construye tu primer proyecto en menos de 5 minutos
          </h2>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Regístrate, crea un proyecto multi-tenant, genera contenido con IA y despliega en tu hosting favorito.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/signup">Crear cuenta</Button>
            <Button href="/docs" variant="ghost">
              Leer documentación
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
