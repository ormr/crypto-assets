import { queryAllProjects } from '$lib/api';

export async function load() {
	const { allProjects } = await queryAllProjects();

	return {
		allProjects
	};
}
