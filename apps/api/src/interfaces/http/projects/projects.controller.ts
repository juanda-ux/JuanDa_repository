import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProjectService } from '../../../application/projects/project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectService) {}

  @Get()
  async list(@Req() req: any) {
    const tenantId = req.tenant?.id ?? req.user?.tenantId ?? 'demo-tenant';
    const projects = await this.service.listProjects(tenantId);
    return { data: projects.map((project) => project.toJSON()) };
  }

  @Post()
  async create(@Req() req: any, @Body() body: CreateProjectDto) {
    const tenantId = req.tenant?.id ?? req.user?.tenantId ?? 'demo-tenant';
    const project = await this.service.createProject({ ...body, tenantId });
    return { data: project.toJSON() };
  }
}
