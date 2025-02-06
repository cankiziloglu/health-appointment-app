import { db } from '@/prisma/prisma';
import { cache } from 'react';
import 'server-only';

export const getAllMedicalUnits = cache(async () => {
  return await db.medicalUnit.findMany();
});
