import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { users } from './data/users';
import { workshops } from './data/workshops';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
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

  const hashedPassword = await bcrypt.hash('Password@123', 10);

  console.log('Password hash generated');

  for (const user of users) {
    const role = await prisma.role.findUnique({
      where: {
        name: user.role,
      },
    });

    if (!role) {
      throw new Error(`Role not found: ${user.role}`);
    }

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        roleId: role.id,
      },
    });
  }
  console.log('Users seeded successfully');

  for (const workshop of workshops) {
    await prisma.workshop.upsert({
      where: {
        name: workshop.name,
      },
      update: {},
      create: {
        name: workshop.name,
        address: workshop.address,
        city: workshop.city,
        state: workshop.state,
        phoneNumber: workshop.phoneNumber,
        email: workshop.email,
      },
    });
  }
  console.log('Workshops seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
