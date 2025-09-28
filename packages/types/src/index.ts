export type Locale = 'en' | 'es';

export type PlanTier = 'free' | 'pro';

export interface Tenant {
  id: string;
  name: string;
  plan: PlanTier;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  templateId: string;
  locale: Locale;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface GenerationJob {
  id: string;
  projectId: string;
  prompt: string;
  status: 'queued' | 'processing' | 'done' | 'failed';
  outputUrl?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeploymentStatus {
  provider: 'vercel' | 'netlify';
  status: 'queued' | 'deploying' | 'success' | 'failed';
  url?: string;
  logsUrl?: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  payload: Record<string, unknown>;
  createdAt: string;
  metadata: {
    ip: string;
    userAgent: string;
  };
}

export interface AiGenerationRequest {
  prompt: string;
  templateId?: string;
  brandColors?: string[];
  locale?: Locale;
}

export interface AiGenerationResponse {
  sections: Array<{
    id: string;
    type: string;
    props: Record<string, unknown>;
    content: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
