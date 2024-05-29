import { query } from 'san-webkit/lib/api';

const ALL_PROJECTS = `
  {
    allProjects(minVolume: 0) {
      slug
      name
      ticker
      logoUrl
    }
  }
`;
export const queryAllProjects = () => query(ALL_PROJECTS);
