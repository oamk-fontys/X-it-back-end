import { Prisma } from '@prisma/client';

export const defaultUserSelect = {
  id: true,
  email: true,
  username: true,
  firstName: true,
  lastName: true,
  createdAt: true,
  updatedAt: true,
  profilePicture: true,
  company: true,
  dateOfBirth: true,
  phoneNumber: true,
  role: true,
  booking: true,
} satisfies Prisma.UserSelect;
