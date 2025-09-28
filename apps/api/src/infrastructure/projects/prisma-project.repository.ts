import { Injectable } from '@nestjs/common';
import type { ProjectRepository } from '../../domain/projects/project.repository';
import { ProjectEntity, type ProjectProps } from '../../domain/projects/project.entity';
import { PrismaService } from '../prisma/prisma.service';

const mapProject = (project: any): ProjectEntity =>
  new ProjectEntity({
    id: project.id,
    tenantId: project.tenantId,
    name: project.name,
    slug: project.slug,
    templateId: project.templateId,
    locale: project.locale,
    status: project.status.toLowerCase() as 'draft' | 'published',
    content: project.content ?? {},
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  } as ProjectProps);

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByTenant(tenantId: string): Promise<ProjectEntity[]> {
    const projects = await this.prisma.project.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
    return projects.map(mapProject);
  }

  async create(data: Omit<ProjectProps, 'id'>): Promise<ProjectEntity> {
    const project = await this.prisma.project.create({
      data: {
        tenantId: data.tenantId,
        name: data.name,
        slug: data.slug,
        templateId: data.templateId,
        locale: data.locale,
        status: data.status.toUpperCase() as any,
        content: data.content,
      },
    });
    return mapProject(project);
  }
}
