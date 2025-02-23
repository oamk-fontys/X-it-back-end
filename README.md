**Project setup guide**

*Requirements*

- Latest Node.js version (https://nodejs.org/en)
- Docker desktop (https://www.docker.com/)

*Installation Steps*

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





Your NestJS application should now be set up with a PostgreSQL database running in Docker!