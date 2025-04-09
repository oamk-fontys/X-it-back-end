import { Prisma } from '@prisma/client';

export const defaultCompanySelect = {
  id: true,
  name: true,
  description: true,
  address: true,
  logo: true,
  createdAt: true,
  updatedAt: true,
  booking: true,
  users: true,
  postalCode: true,
  city: true,
  vat: true,
} satisfies Prisma.CompanySelect;
