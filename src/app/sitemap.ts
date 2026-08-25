import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jhesrkadeveloper.vercel.app';
  
  // Definimos las rutas principales
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portafolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
