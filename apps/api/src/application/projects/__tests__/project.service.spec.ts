import { describe, expect, it, vi } from 'vitest';
import { ProjectService } from '../project.service';

const repository = {
  findByTenant: vi.fn(async () => []),
  create: vi.fn(async (data) => ({ toJSON: () => ({ ...data, id: 'mock' }) })),
};

describe('ProjectService', () => {
  const service = new ProjectService(repository as any);

  it('lists projects for tenant', async () => {
    await service.listProjects('tenant-1');
    expect(repository.findByTenant).toHaveBeenCalledWith('tenant-1');
  });

  it('creates project with draft status', async () => {
    const project = await service.createProject({
      tenantId: 'tenant-1',
      name: 'Demo',
      slug: 'demo',
      templateId: 'tpl',
      locale: 'es',
    });
    expect(repository.create).toHaveBeenCalled();
    expect(project.toJSON()).toMatchObject({
      tenantId: 'tenant-1',
      status: 'draft',
    });
  });
});
