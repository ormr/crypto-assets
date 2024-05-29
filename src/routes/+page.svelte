<script lang="ts">
	import { assetsStore } from '$lib/assetsStore';
	import 'san-webkit/lib/styles/main.css';
	import SelectedAssets from '$lib/components/Assets/SelectedAssets.svelte';
	export let data;
	assetsStore.set(data.allProjects);
</script>

<SelectedAssets />
