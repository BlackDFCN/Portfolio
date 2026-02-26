import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function getAllProjects() {
  const projectsDir = path.join(process.cwd(), 'content/projects');
  const files = await fs.readdir(projectsDir);
  const projects = await Promise.all(
    files.filter((file) => file.endsWith('.mdx')).map(async (file) => {
      const fullPath = path.join(projectsDir, file);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const slug = file.replace(/\.mdx$/, '');
      const title = typeof data.title === 'string' ? data.title.trim() : 'Sin título';
      const description = typeof data.description === 'string' ? data.description.trim() : '';
      const date = typeof data.date === 'string' ? data.date : '';
      const image = typeof data.image === 'string' ? data.image.trim() : '';
      const tags = Array.isArray(data.tags) ? data.tags.filter((t) => typeof t === 'string') : [];
      return { slug, title, description, date, image, tags };
    })
  );
  return projects.sort((a, b) => (a.date < b.date ? 1 : -1));
}
