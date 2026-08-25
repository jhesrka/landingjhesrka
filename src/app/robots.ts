import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'], // Evitar que rastreen rutas privadas o de API
    },
    sitemap: 'https://jhesrkadeveloper.vercel.app/sitemap.xml',
  };
}
