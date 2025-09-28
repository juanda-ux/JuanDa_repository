import type { ProjectEntity, ProjectProps } from './project.entity';

export interface ProjectRepository {
  findByTenant(tenantId: string): Promise<ProjectEntity[]>;
  create(data: Omit<ProjectProps, 'id'>): Promise<ProjectEntity>;
}
