import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Note: Replace with the actual custom domain or vercel domain in production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sportizen.online';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
