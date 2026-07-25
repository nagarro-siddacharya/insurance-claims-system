import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    {
      name: 'ADMIN',
      description: 'System Administrator',
    },
    {
      name: 'CUSTOMER',
      description: 'Insurance Customer',
    },
    {
      name: 'SURVEYOR',
      description: 'Vehicle Surveyor',
    },
    {
      name: 'ADJUSTER',
      description: 'Claims Adjustor',
    },
    {
      name: 'CASE_MANAGER',
      description: 'Case Manager',
    },
    {
      name: 'AUDITOR',
      description: 'Auditor',
    },
    {
      name: 'WORKSHOP',
      description: 'Partner Workshop',
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {},
      create: role,
    });
  }

  console.log('Roles seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
