import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


const PROJECTS_PATH = path.join(process.cwd(), 'src', 'content', 'projects');

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  destacado: boolean;
  role: string;
  stack: string;
  badge: string;
  badgeColor: string;
  image: string;
  description: string;
}

export interface ProjectData extends ProjectFrontmatter {
  content: string;
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const filePath = path.join(PROJECTS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  return {
    ...(data as ProjectFrontmatter),
    content,
  };
}

export function getFeaturedProjects(): ProjectData[] {
  // Lee todos los archivos MDX y filtra por destacado, agregando slug
  const files = fs.readdirSync(PROJECTS_PATH).filter(f => f.endsWith('.mdx') && !f.startsWith('_base'));
  return files
    .map(file => {
      const filePath = path.join(PROJECTS_PATH, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      return {
        ...(data as ProjectFrontmatter),
        slug: file.replace(/\.mdx$/, ''),
        content,
      };
    })
    .filter(project => project.destacado === true);
}
