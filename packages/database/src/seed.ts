import { PrismaClient, PlanTier, ProjectStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const tenantId = randomUUID();
  await prisma.tenant.upsert({
    where: { slug: 'acme' },
    update: {},
    create: {
      id: tenantId,
      name: 'Acme Inc',
      slug: 'acme',
      plan: PlanTier.PRO,
      users: {
        create: [
          {
            email: 'founder@acme.test',
            passwordHash: await argon2.hash('P@ssw0rd!'),
            role: 'ADMIN',
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Demo Cafe',
            slug: 'demo-cafe',
            templateId: 'modern-cafe',
            locale: 'es',
            status: ProjectStatus.DRAFT,
            content: {
              sections: [],
            },
            versions: {
              create: [{
                label: 'v1',
                data: { sections: [] },
              }],
            },
          },
        ],
      },
    },
  });

  await prisma.featureFlag.upsert({
    where: { tenantId_key: { tenantId, key: 'multiTenant' } },
    update: { enabled: true },
    create: { tenantId, key: 'multiTenant', enabled: true },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
