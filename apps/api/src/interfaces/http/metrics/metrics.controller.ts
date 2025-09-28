import { Controller, Get, Header } from '@nestjs/common';

@Controller('metrics')
export class MetricsController {
  private readonly metrics = new Map<string, number>();

  constructor() {
    this.metrics.set('http_requests_total', 1);
  }

  @Get()
  @Header('Content-Type', 'text/plain')
  getMetrics(): string {
    return Array.from(this.metrics.entries())
      .map(([key, value]) => `# TYPE ${key} counter\n${key} ${value}`)
      .join('\n');
  }
}
