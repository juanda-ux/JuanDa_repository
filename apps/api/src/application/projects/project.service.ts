import { Inject, Injectable } from '@nestjs/common';
import type { ProjectRepository } from '../../domain/projects/project.repository';
import type { ProjectEntity } from '../../domain/projects/project.entity';

interface CreateProjectInput {
  tenantId: string;
  name: string;
  slug: string;
  templateId: string;
  locale: string;
  content?: Record<string, unknown>;
}

@Injectable()
export class ProjectService {
  constructor(@Inject('ProjectRepository') private readonly repository: ProjectRepository) {}

  async listProjects(tenantId: string): Promise<ProjectEntity[]> {
    return this.repository.findByTenant(tenantId);
  }

  async createProject(input: CreateProjectInput): Promise<ProjectEntity> {
    return this.repository.create({
      tenantId: input.tenantId,
      name: input.name,
      slug: input.slug,
      templateId: input.templateId,
      locale: input.locale,
      status: 'draft',
      content: input.content ?? {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
