import { z } from 'zod';

const urlLike = () =>
  z
    .string()
    .refine((value) => /^(https?:|postgres(ql)?:|redis:|s3:)/.test(value) || value.startsWith('http'), {
      message: 'Invalid URL format',
    });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.string().default('info'),
  APP_DOMAIN: z.string().url(),
  API_URL: z.string().url(),
  CDN_URL: z.string().url().optional(),
  DATABASE_URL: z.string().refine((value) => value.startsWith('postgres'), 'Invalid database URL'),
  SHADOW_DATABASE_URL: z
    .string()
    .optional()
    .refine((value) => !value || value.startsWith('postgres'), 'Invalid database URL'),
  REDIS_URL: z.string().refine((value) => value.startsWith('redis'), 'Invalid redis URL'),
  S3_ENDPOINT: urlLike(),
  S3_REGION: z.string(),
  S3_BUCKET_ASSETS: z.string(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
  EMAIL_PROVIDER: z.enum(['resend', 'sendgrid']),
  EMAIL_FROM: z.string(),
  RESEND_API_KEY: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  STRIPE_API_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  STRIPE_PRICE_FREE: z.string(),
  STRIPE_PRICE_PRO: z.string(),
  FEATURE_FLAGS_DEFAULT: z.string().default(''),
  HCAPTCHA_SITE_KEY: z.string(),
  HCAPTCHA_SECRET_KEY: z.string(),
  CSRF_SECRET: z.string().min(16),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url(),
  WORKER_MODE: z.string().optional(),
});

export type AppConfig = z.infer<typeof envSchema> & {
  featureFlags: Record<string, boolean>;
};

export const loadConfig = (env: NodeJS.ProcessEnv = process.env): AppConfig => {
  const parsed = envSchema.parse(env);
  const featureFlags = Object.fromEntries(
    parsed.FEATURE_FLAGS_DEFAULT.split(',')
      .filter(Boolean)
      .map((flag) => {
        const [key, value] = flag.split(':');
        return [key, value === 'true'];
      }),
  );

  return {
    ...parsed,
    featureFlags,
  };
};
