import { getAllProjects } from './projects';

describe('getAllProjects', () => {
  it('debe devolver un array de proyectos con los campos requeridos', () => {
    const projects = getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
    for (const project of projects) {
      expect(typeof project.slug).toBe('string');
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(Array.isArray(project.tags)).toBe(true);
    }
  });
});
