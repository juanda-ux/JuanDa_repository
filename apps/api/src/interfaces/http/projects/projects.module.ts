import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from '../../../application/projects/project.service';
import { PrismaProjectRepository } from '../../../infrastructure/projects/prisma-project.repository';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectService, { provide: 'ProjectRepository', useClass: PrismaProjectRepository }],
})
export class ProjectsModule {}
