import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter, ProjectSummary } from "@/types/project";

const projectsDirectory = path.join(process.cwd(), "content", "projects");
const templateFileName = "example-template.mdx";

const parseFrontmatter = (data: Record<string, unknown>): ProjectFrontmatter => {
  const metrics = Array.isArray(data.metrics)
    ? data.metrics.map((metric) => {
        const metricRecord =
          typeof metric === "object" && metric !== null
            ? (metric as Record<string, unknown>)
            : {};

        return {
          label: String(metricRecord.label ?? ""),
          value: String(metricRecord.value ?? "")
        };
      })
    : [];

  const architectureRecord =
    typeof data.architecture === "object" && data.architecture !== null
      ? (data.architecture as Record<string, unknown>)
      : null;

  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    role: String(data.role ?? ""),
    category: String(data.category ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    repoUrl: data.repoUrl ? String(data.repoUrl) : undefined,
    featured: Boolean(data.featured),
    metrics,
    architecture: architectureRecord
      ? {
          client: architectureRecord.client
            ? String(architectureRecord.client)
            : undefined,
          gateway: architectureRecord.gateway
            ? String(architectureRecord.gateway)
            : undefined,
          services: Array.isArray(architectureRecord.services)
            ? architectureRecord.services.map(String)
            : undefined,
          persistence: Array.isArray(architectureRecord.persistence)
            ? architectureRecord.persistence.map(String)
            : undefined
        }
      : undefined
    ,
    problem: data.problem ? String(data.problem) : undefined,
    solution: data.solution ? String(data.solution) : undefined,
    solutionPoints: Array.isArray(data.solutionPoints)
      ? data.solutionPoints.map(String)
      : undefined,
    documentation: Array.isArray(data.documentation)
      ? data.documentation.map((item) => {
          const docRecord =
            typeof item === "object" && item !== null
              ? (item as Record<string, unknown>)
              : {};
          return {
            title: String(docRecord.title ?? ""),
            text: String(docRecord.text ?? "")
          };
        })
      : undefined,
    codeFile: data.codeFile ? String(data.codeFile) : undefined
  };
};

const byDateDesc = (a: ProjectFrontmatter, b: ProjectFrontmatter) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const readProjectFile = (fileName: string): Project => {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(projectsDirectory, fileName);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);
  const frontmatter = parseFrontmatter(data);

  return {
    ...frontmatter,
    slug,
    content
  };
};

export const getAllProjects = (): ProjectSummary[] => {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx") && fileName !== templateFileName)
    .map((fileName) => {
      const { content: _content, ...summary } = readProjectFile(fileName);
      return summary;
    })
    .sort(byDateDesc);
};

export const getFeaturedProjects = (limit = 3): ProjectSummary[] => {
  return getAllProjects()
    .filter((project) => project.featured)
    .sort(byDateDesc)
    .slice(0, limit);
};

export const getProjectBySlug = (slug: string): Project | null => {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return readProjectFile(`${slug}.mdx`);
};

export const getAllSlugs = (): string[] => {
  return getAllProjects().map((project) => project.slug);
};
