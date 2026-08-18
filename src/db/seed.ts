import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('Seeding data...');

  // Clear existing data (optional, but good for repeatable seeds)
  await db.delete(schema.projects);
  await db.delete(schema.testimonials);

  // Insert Projects
  await db.insert(schema.projects).values([
    {
      title: 'ATUCUCHO SHOP',
      subtitle: 'Super App / Marketplace',
      imageUrl: '/destacado1.webp',
      link: '#',
    },
    {
      title: 'WISHWAY',
      subtitle: 'Plataforma de Rifas Online',
      imageUrl: '/mockups/wishway.jpg',
      link: '#',
    },
    {
      title: 'OLA PREMIUM',
      subtitle: 'Transporte Ejecutivo',
      imageUrl: '/mockups/ola.jpg',
      link: '#',
    },
    {
      title: 'CV3 TALLER',
      subtitle: 'Sitio Web Automotriz',
      imageUrl: '/mockups/cv3.jpg',
      link: '#',
    },
  ]);
  console.log('Projects seeded successfully.');

  // Insert Testimonials
  await db.insert(schema.testimonials).values([
    {
      content: 'Excelente trabajo, entendieron perfectamente lo que necesitábamos y superaron nuestras expectativas.',
      name: 'Damián M.',
      company: 'Atucucho Shop',
      avatarUrl: 'https://i.pravatar.cc/150?u=damian',
      rating: 5,
    },
    {
      content: 'Profesionales, responsables y siempre dispuestos a ayudar. Nuestro sistema funciona perfecto.',
      name: 'Verónica A.',
      company: 'WishWay',
      avatarUrl: 'https://i.pravatar.cc/150?u=veronica',
      rating: 5,
    },
    {
      content: 'Nuestra página quedó increíble, moderna y nos ha traído muchos nuevos clientes.',
      name: 'Cristian V.',
      company: 'CV3 Taller',
      avatarUrl: 'https://i.pravatar.cc/150?u=cristian',
      rating: 5,
    },
  ]);
  console.log('Testimonials seeded successfully.');
  
  console.log('Seeding completed!');
}

seed().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
