import { compileMDX } from "next-mdx-remote/rsc";
import ProjectArchitecture from "@/components/ProjectArchitecture";

const components = {
  ProjectArchitecture
};

export const renderProjectMdx = async (source: string) => {
  const { content } = await compileMDX({
    source,
    components
  });

  return content;
};
