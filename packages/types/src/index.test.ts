import { describe, expect, it } from 'vitest';
import type { AiGenerationResponse } from './index';

describe('types', () => {
  it('allows creating generation response shape', () => {
    const response: AiGenerationResponse = {
      sections: [
        {
          id: 'hero',
          type: 'hero',
          props: { alignment: 'center' },
          content: 'Hello world',
        },
      ],
      seo: {
        title: 'Demo',
        description: 'Demo site',
        keywords: ['demo'],
      },
    };

    expect(response.sections[0].id).toBe('hero');
  });
});
