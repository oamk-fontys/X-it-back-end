import { faker } from '@faker-js/faker';
import { Difficulty, PrismaClient, WeekDay } from '@prisma/client';
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
            phoneNumber: faker.phone.number(),
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

  // Create 5 rooms for each company with fixed durations
  const rooms = await Promise.all(
    companies.flatMap(async (company) => {
      return Promise.all(
        Array(5)
          .fill(null)
          .map(async (_, index) => {
            // Distribute durations evenly: 2 rooms of 60min, 2 rooms of 90min, 1 room of 30min
            const duration = index < 2 ? 60 : index < 4 ? 90 : 30;
            return await prisma.room.create({
              data: {
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                companyId: company.id,
                duration: duration,
                cleanUpTime: 15, // Fixed 15 minutes cleanup time for all rooms
                address: faker.location.streetAddress(),
                city: faker.location.city(),
                postalCode: faker.location.zipCode(),
                country: faker.location.country(),
                phoneNumber: faker.phone.number(),
                difficulty: faker.helpers.enumValue(Difficulty),
              },
            });
          }),
      );
    }),
  );

  // Create time slots for each room based on fixed durations
  const timeSlots = await Promise.all(
    rooms.flat().flatMap(async (room) => {
      const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
      const workingHours = {
        startHour: 9,
        endHour: 17,
      };

      return Promise.all(
        weekDays.map(async (day) => {
          const slots: Promise<any>[] = [];
          let currentHour = workingHours.startHour;
          let currentMinute = 0;

          while (currentHour < workingHours.endHour) {
            // Calculate end time based on room duration
            let endHour = currentHour;
            let endMinute = currentMinute + room.duration;

            // Adjust hours if minutes exceed 60
            endHour += Math.floor(endMinute / 60);
            endMinute = endMinute % 60;

            // Only create slot if it ends before or at closing time
            if (endHour <= workingHours.endHour) {
              const startTime = `${String(currentHour).padStart(2, '0')}:${String(
                currentMinute,
              ).padStart(2, '0')}`;
              const endTime = `${String(endHour).padStart(2, '0')}:${String(
                endMinute,
              ).padStart(2, '0')}`;

              slots.push(
                prisma.timeSlot.create({
                  data: {
                    start: startTime,
                    end: endTime,
                    roomId: room.id,
                    day: day as WeekDay,
                  },
                }),
              );

              // Add cleanup time to current time for next slot
              currentMinute += room.duration + room.cleanUpTime;
              currentHour += Math.floor(currentMinute / 60);
              currentMinute = currentMinute % 60;
            } else {
              break;
            }
          }
          return Promise.all(slots);
        }),
      );
    }),
  );

  // Create some bookings
  const bookings = await Promise.all(
    Array(10)
      .fill(null)
      .map(async () => {
        const randomUser =
          regularUsers[Math.floor(Math.random() * regularUsers.length)];
        const randomRoom =
          rooms.flat()[Math.floor(Math.random() * rooms.flat().length)];
        const randomTimeSlot = timeSlots.flat().flat()[
          Math.floor(Math.random() * timeSlots.flat().flat().length)
        ];

        return await prisma.booking.create({
          data: {
            userId: randomUser.id,
            roomId: randomRoom.id,
            state: 'SCHEDULED',
            companyId: randomRoom.companyId,
            timeSlotId: randomTimeSlot.id,
            date: faker.date.future(),
          },
        });
      }),
  );
  /*
    // Create games for each booking
    const games = await Promise.all(
      bookings.map(async (booking) => {
        return await prisma.game.create({
          data: {
            teamName: faker.company.name(),
            roomId: booking.roomId,
            bookingId: booking.id,
            startTime: faker.date.future(),
            endTime: faker.date.future(),
          },
        });
      }),
    );
    */
  /*
    // Create players for each game
    const players = await Promise.all(
      games.flatMap(async (game) => {
        // Create 4-6 players per game
        const numberOfPlayers = faker.number.int({ min: 4, max: 6 });
        return Promise.all(
          Array(numberOfPlayers)
            .fill(null)
            .map(async () => {
              const isGuest = faker.datatype.boolean();
              return await prisma.player.create({
                data: {
                  gameId: game.id,
                  isGuest,
                  isAdult: faker.datatype.boolean(),
                  userId: isGuest
                    ? null
                    : regularUsers[
                      Math.floor(Math.random() * regularUsers.length)
                    ].id,
                },
              });
            }),
        );
      }),
    );
    */

  // Create comments for each room
  const comments = await Promise.all(
    rooms.flat().flatMap(async (room) => {
      // Create 3-5 comments per room
      const numberOfComments = faker.number.int({ min: 3, max: 5 });
      return Promise.all(
        Array(numberOfComments)
          .fill(null)
          .map(async () => {
            const randomUser =
              regularUsers[Math.floor(Math.random() * regularUsers.length)];
            return await prisma.comment.create({
              data: {
                userId: randomUser.id,
                roomId: room.id,
                content: faker.lorem.sentence(),
                isSpoiler: faker.datatype.boolean(),
              },
            });
          }),
      );
    }),
  );

  // Create ratings for each room
  const ratings = await Promise.all(
    rooms.flat().flatMap(async (room) => {
      // Create 5-10 ratings per room
      const numberOfRatings = faker.number.int({ min: 5, max: 10 });
      return Promise.all(
        Array(numberOfRatings)
          .fill(null)
          .map(async () => {
            const randomUser =
              regularUsers[Math.floor(Math.random() * regularUsers.length)];
            return await prisma.rating.create({
              data: {
                userId: randomUser.id,
                roomId: room.id,
                rating: faker.number.int({ min: 1, max: 5 }), // Rating from 1 to 5
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
    timeSlotsCount: timeSlots.flat().flat().length,
    bookingsCount: bookings.length,
    commentsCount: comments.flat().length,
    ratingsCount: ratings.flat().length,
    //gamesCount: games.length,
    //playersCount: players.flat().length,
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
