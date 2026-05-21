import { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = 'https://madureira.xyz';

function listDirs(absPath: string): string[] {
  try {
    return fs
      .readdirSync(absPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
}

function listMarkdown(absPath: string): string[] {
  try {
    return fs
      .readdirSync(absPath, { withFileTypes: true })
      .filter((d) => d.isFile() && d.name.endsWith('.md'))
      .map((d) => d.name.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/eu`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/sobre-mim`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/newsletter`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/technologies`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/deployments`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/worldwide-reach`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const projectsDir = path.join(process.cwd(), 'app', 'projects');
  const projectSlugs = listDirs(projectsDir);
  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const postSlugs = listMarkdown(postsDir);
  const postPages: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...postPages];
}
