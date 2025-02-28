**Project setup guide**

_Requirements_

- Latest Node.js version (https://nodejs.org/en)
- Docker desktop (https://www.docker.com/)

_Installation Steps_

1. Clone the project from GitHub:

   ```bash
   git clone https://github.com/oamk-fontys/X-it-back-end
   cd X-it-back-end
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in the .env file with your desired values:

   ```
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_secure_password
   POSTGRES_DB=xit-db
   ```

4. Start Docker containers:

   ```bash
   docker-compose up -d
   ```

5. Start Application:
   npm run start:dev (This is for development it has auto refresh)

6. Prisma Commands:

   When starting the application for the first time, run:

   ```bash
   npx prisma db push
   ```

   This will sync your database with the Prisma schema.

   Other useful Prisma commands:

   Pull schema from existing database:

   ```bash
   npx prisma db pull
   ```

   Generate Prisma Client (after schema changes):

   ```bash
   npx prisma generate
   ```

   View database in Prisma Studio:

   ```bash
   npx prisma studio
   ```

   Reset database (WARNING: Deletes all data):

   ```bash
   npx prisma migrate reset
   ```

   Create and apply migrations:

   ```bash
   npx prisma migrate dev --name example-name
   ```

   View migration history:

   ```bash
   npx prisma migrate status
   ```

7. Database Seeding:

   To populate the database with test data:

   ```bash
   npm run seed
   ```

   This command will create:

   - 5 companies with random business data
   - 5 admin users (one per company)
   - 5 regular users
   - 5 company users
   - 25 rooms (5 per company)
   - 5 pets (example data)

   Test Credentials:

   ```
   Admin users:
   - Email: randomly generated
   - Password: admin123
   - Role: ADMIN

   Regular users:
   - Email: randomly generated
   - Password: user123
   - Role: USER

   Company users:
   - Email: randomly generated
   - Password: company123
   - Role: COMPANY
   ```

   Note: Each time you run the seeder, it will generate new random data using Faker.js.

Your NestJS application should now be set up with a PostgreSQL database running in Docker!
