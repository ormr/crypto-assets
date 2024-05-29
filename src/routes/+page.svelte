<script lang="ts">
	import { allAssets } from '$lib/stores';
	import 'san-webkit/lib/styles/main.css';
	import SelectedAssets from '$lib/components/Assets/SelectedAssets.svelte';
	export let data;
	allAssets.set(data.allProjects);
</script>

<main>
	<SelectedAssets />
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
