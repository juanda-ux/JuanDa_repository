export interface ProjectProps {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  templateId: string;
  locale: string;
  status: 'draft' | 'published';
  content: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectEntity {
  constructor(private readonly props: ProjectProps) {}

  get id() {
    return this.props.id;
  }

  get tenantId() {
    return this.props.tenantId;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  get templateId() {
    return this.props.templateId;
  }

  get locale() {
    return this.props.locale;
  }

  get status() {
    return this.props.status;
  }

  get content() {
    return this.props.content;
  }

  toJSON() {
    return {
      ...this.props,
      createdAt: this.props.createdAt.toISOString(),
      updatedAt: this.props.updatedAt.toISOString(),
    };
  }
}
