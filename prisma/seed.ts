import 'dotenv/config';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

  try {
    // Split SQL file into individual statements
    const statements = seedSQL
      .split(';')
      .filter((statement) => statement.trim());

    // Execute each statement separately
    for (const statement of statements) {
      if (statement.trim()) {
        await prisma.$executeRawUnsafe(statement + ';');
      }
    }

    console.log('✅ Database seeded successfully!');

    // Log some counts for verification
    const counts = await Promise.all([
      prisma.user.count(),
      prisma.healthcareProvider.count(),
      prisma.doctor.count(),
      prisma.appointment.count(),
    ]);

    console.log('📊 Seeded records:');
    console.log(`Users: ${counts[0]}`);
    console.log(`Healthcare Providers: ${counts[1]}`);
    console.log(`Doctors: ${counts[2]}`);
    console.log(`Appointments: ${counts[3]}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
