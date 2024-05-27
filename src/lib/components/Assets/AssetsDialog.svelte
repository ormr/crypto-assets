<script context="module" lang="ts">
	import { dialogs } from 'san-webkit/lib/ui/Dialog';
	import AssetsDialog from './AssetsDialog.svelte';

	export const showAssetsDialog = () => dialogs.showOnce(AssetsDialog);
</script>

<script lang="ts">
	import Dialog from 'san-webkit/lib/ui/Dialog';
	console.log('props1', $$props);
</script>

<Dialog {...$$props} title="Select asset" class="dialog">
	<main>
		<h1>Hello world</h1>
	</main>
</Dialog>

<style>
	.dialog {
		width: 400px;
		height: 455px;
		max-width: 400px !important;
		max-height: 455px !important;
	}

	.loading {
		height: 100%;
	}

	main {
		padding: 8px 16px;
		flex: 1;
	}
</style>
