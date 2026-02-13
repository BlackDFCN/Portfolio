export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectArchitecture = {
  client?: string;
  gateway?: string;
  services?: string[];
  persistence?: string[];
};

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
  role: string;
  category: string;
  tags: string[];
  image?: string;
  architectureDiagram?: string;
  usageDiagram?: string;
  repoUrl?: string;
  featured: boolean;
  metrics: ProjectMetric[];
  architecture?: ProjectArchitecture;
  problem?: string;
  problemImpact?: string;
  solution?: string;
  solutionImpact?: string;
  solutionPoints?: string[];
  documentation?: { title: string; text: string }[];
  codeFile?: string;
};

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
};

export type ProjectSummary = ProjectFrontmatter & {
  slug: string;
};
