import { describe, expect, it } from 'vitest';
import { loadConfig } from './index';

describe('loadConfig', () => {
  it('parses environment variables and feature flags', () => {
    const config = loadConfig({
      NODE_ENV: 'test',
      LOG_LEVEL: 'debug',
      APP_DOMAIN: 'http://localhost:3000',
      API_URL: 'http://localhost:4000',
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
      REDIS_URL: 'redis://localhost:6379',
      S3_ENDPOINT: 'http://localhost:4566',
      S3_REGION: 'us-east-1',
      S3_BUCKET_ASSETS: 'bucket',
      JWT_ACCESS_SECRET: 'a'.repeat(32),
      JWT_REFRESH_SECRET: 'b'.repeat(32),
      JWT_ACCESS_EXPIRES_IN: '15m',
      JWT_REFRESH_EXPIRES_IN: '7d',
      EMAIL_PROVIDER: 'resend',
      EMAIL_FROM: 'test@example.com',
      STRIPE_API_KEY: 'sk_test',
      STRIPE_WEBHOOK_SECRET: 'whsec',
      STRIPE_PRICE_FREE: 'price_free',
      STRIPE_PRICE_PRO: 'price_pro',
      FEATURE_FLAGS_DEFAULT: 'multiTenant:true,aiGeneration:false',
      HCAPTCHA_SITE_KEY: 'site',
      HCAPTCHA_SECRET_KEY: 'secret',
      CSRF_SECRET: 'c'.repeat(16),
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://localhost:4318',
    } as any);

    expect(config.featureFlags.multiTenant).toBe(true);
    expect(config.featureFlags.aiGeneration).toBe(false);
  });
});
