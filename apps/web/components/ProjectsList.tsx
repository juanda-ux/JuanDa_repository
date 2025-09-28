'use client';

import { useEffect } from 'react';
import { Button, Card } from '@websmith/ui';
import { useProjectStore } from '@/store/useProjectStore';

const mockProjects = [
  { id: '1', name: 'Demo Café', slug: 'demo-cafe', status: 'draft' },
  { id: '2', name: 'Portfolio UX', slug: 'portfolio-ux', status: 'published' },
];

export const ProjectsList = () => {
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  useEffect(() => {
    if (!projects.length) {
      setProjects(mockProjects as any);
    }
  }, [projects.length, setProjects]);

  return (
    <Card
      title="Proyectos"
      description="Gestiona tus landing pages, blogs y portfolios."
      actions={<Button href="/projects/new">Nuevo proyecto</Button>}
    >
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">{project.name}</p>
              <p className="text-sm text-slate-500">/{project.slug}</p>
            </div>
            <Button href={`/projects/${project.slug}`}>Abrir</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};
