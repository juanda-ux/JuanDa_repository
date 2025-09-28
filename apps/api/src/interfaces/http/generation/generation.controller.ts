import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const generateSchema = z.object({
  prompt: z.string(),
  templateId: z.string().optional(),
  brandColors: z.array(z.string()).optional(),
  locale: z.string().optional(),
});

const jobStore = new Map<string, any>();

@Controller('generate')
export class GenerationController {
  @Post()
  async generate(@Body() body: unknown) {
    const parsed = generateSchema.parse(body);
    const jobId = randomUUID();
    jobStore.set(jobId, { status: 'processing', prompt: parsed.prompt });
    setTimeout(() => {
      jobStore.set(jobId, {
        status: 'done',
        outputUrl: `https://cdn.websmith.dev/${jobId}.zip`,
      });
    }, 100);
    return { jobId };
  }

  @Get(':id')
  async getStatus(@Param('id') id: string) {
    return { job: jobStore.get(id) ?? { status: 'queued' } };
  }
}
