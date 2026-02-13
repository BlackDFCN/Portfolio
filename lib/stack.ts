import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type StackGroup = {
  icon: string;
  title: string;
  text: string;
  items: string[];
};

export type StackContent = {
  eyebrow: string;
  title: string;
  description: string;
  groups: StackGroup[];
};

const stackFilePath = path.join(process.cwd(), "content", "stack.md");

const parseGroups = (data: Record<string, unknown>): StackGroup[] => {
  if (!Array.isArray(data.groups)) {
    return [];
  }

  return data.groups.map((group) => {
    const groupRecord =
      typeof group === "object" && group !== null
        ? (group as Record<string, unknown>)
        : {};

    return {
      icon: String(groupRecord.icon ?? ""),
      title: String(groupRecord.title ?? ""),
      text: String(groupRecord.text ?? ""),
      items: Array.isArray(groupRecord.items)
        ? groupRecord.items.map(String)
        : []
    };
  });
};

const getDefaultStack = (): StackContent => ({
  eyebrow: "STACK TECNOLOGICO",
  title: "Ecosistema Tecnico",
  description:
    "Tecnologias y herramientas con las que trabajo y tengo experiencia real en proyectos, enfocadas en producto, rendimiento y despliegue.",
  groups: []
});

export const getStackContent = (): StackContent => {
  if (!fs.existsSync(stackFilePath)) {
    return getDefaultStack();
  }

  const fileContent = fs.readFileSync(stackFilePath, "utf8");
  const { data } = matter(fileContent);
  const stackData = data as Record<string, unknown>;

  return {
    eyebrow: String(stackData.eyebrow ?? ""),
    title: String(stackData.title ?? ""),
    description: String(stackData.description ?? ""),
    groups: parseGroups(stackData)
  };
};
