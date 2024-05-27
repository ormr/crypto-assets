import { queryAllProjects } from '$lib/api';

export async function load() {
	const response = await queryAllProjects();

	return response;
}
