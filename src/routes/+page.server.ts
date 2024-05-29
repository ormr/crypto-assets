import { queryAllProjects } from '$lib/api';

export async function load() {
	const data = await queryAllProjects();

	return {
		allProjects: data.allProjects
	};
}
