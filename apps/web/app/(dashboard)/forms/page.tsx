import { Section } from '@websmith/ui';
import { FormBuilder } from '@/components/FormBuilder';

export default function FormsPage() {
  return (
    <Section>
      <FormBuilder onSubmit={async () => {}} />
    </Section>
  );
}
