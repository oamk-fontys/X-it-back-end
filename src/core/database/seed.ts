import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create 5 companies
  const companies = await Promise.all(
    Array(5)
      .fill(null)
      .map(async () => {
        return await prisma.company.create({
          data: {
            name: faker.company.name(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            vat: faker.string.alphanumeric({ length: 10 }).toUpperCase(),
            postalCode: faker.location.zipCode(),
            description: faker.company.catchPhrase(),
            verified: faker.datatype.boolean(),
          },
        });
      }),
  );

  // Create 5 admin users (one for each company)
  const adminUsers = await Promise.all(
    companies.map(async (company) => {
      const password = await hash('admin123', 10);
      return await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: password,
          username: faker.internet.username(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number(),
          dateOfBirth: faker.date.past({ years: 30 }),
          role: 'ADMIN',
          companyId: company.id,
          accessCode: faker.string.numeric({ length: 6 }),
        },
      });
    }),
  );

  // Create 5 regular users
  const regularUsers = await Promise.all(
    Array(5)
      .fill(null)
      .map(async () => {
        const password = await hash('user123', 10);
        return await prisma.user.create({
          data: {
            email: faker.internet.email(),
            password: password,
            username: faker.internet.username(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phoneNumber: faker.phone.number(),
            dateOfBirth: faker.date.past({ years: 30 }),
            role: 'USER',
          },
        });
      }),
  );

  // Create 5 company users
  const companyUsers = await Promise.all(
    Array(5)
      .fill(null)
      .map(async () => {
        const password = await hash('company123', 10);
        const randomCompany =
          companies[Math.floor(Math.random() * companies.length)];
        return await prisma.user.create({
          data: {
            email: faker.internet.email(),
            password: password,
            username: faker.internet.username(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phoneNumber: faker.phone.number(),
            dateOfBirth: faker.date.past({ years: 30 }),
            role: 'COMPANY',
            companyId: randomCompany.id,
            accessCode: faker.string.numeric({ length: 6 }),
          },
        });
      }),
  );

  // Create 5 rooms for each company
  const rooms = await Promise.all(
    companies.flatMap(async (company) => {
      return Promise.all(
        Array(5)
          .fill(null)
          .map(async () => {
            return await prisma.room.create({
              data: {
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                companyId: company.id,
                duration: faker.number.int({ min: 30, max: 180 }), // Duration in minutes (30min to 3h)
                cleanUpTime: faker.number.int({ min: 5, max: 30 }), // Cleanup time in minutes
              },
            });
          }),
      );
    }),
  );

  console.log({
    companiesCount: companies.length,
    adminUsersCount: adminUsers.length,
    regularUsersCount: regularUsers.length,
    companyUsersCount: companyUsers.length,
    roomsCount: rooms.flat().length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
