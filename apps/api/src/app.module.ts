import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './interfaces/http/auth/auth.module';
import { ProjectsModule } from './interfaces/http/projects/projects.module';
import { GenerationModule } from './interfaces/http/generation/generation.module';
import { FormsModule } from './interfaces/http/forms/forms.module';
import { HealthModule } from './interfaces/http/health/health.module';
import { MetricsModule } from './interfaces/http/metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    GenerationModule,
    FormsModule,
    HealthModule,
    MetricsModule,
  ],
})
export class AppModule {}
