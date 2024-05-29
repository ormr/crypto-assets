<script context="module" lang="ts">
	import { dialogs } from 'san-webkit/lib/ui/Dialog';
	import AssetsDialog from './AssetsDialog.svelte';

	export const showAssetsDialog = () => dialogs.showOnce(AssetsDialog);
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Dialog from 'san-webkit/lib/ui/Dialog';
	import VirtualList from 'san-webkit/lib/ui/VirtualList/index.svelte';
	import Search from 'san-webkit/lib/ui/Search.svelte';
	import CheckboxAsset from 'san-webkit/lib/ui/ListOfAssets/CheckboxAsset.svelte';
	import type { Asset } from 'san-webkit/lib/ui/ListOfAssets/types';
	import { getSearcher$Ctx, Searcher$$ } from 'san-webkit/lib/ui/ListOfAssets/search';
	import { selectedAssets } from './store';
	import { assetsStore } from '$lib/assetsStore';

	export const onApply = (data: any) => data;
	export let DialogCtx;

	$: selected = new Set();

	const onClick = (name: string) => {
		if (selected.has(name)) {
			selected.delete(name);
		} else {
			selected.add(name);
		}

		selected = selected;
	};

	const { searchTerm$, filter, onKeyUp, onInput, clear } =
		getSearcher$Ctx() || Searcher$$({ accessAsset: (_: string) => _ });
	$: searchTerm = $searchTerm$;
	$: filtered = searchTerm ? filter(assets) : assets;
	let assets: Asset[];

	const applySelectedValues = () => {
		const selectedValues = assets.filter((item) => selected.has(item.name));
		selectedAssets.set(selectedValues);
		DialogCtx.close();
	};

	onMount(() => {
		assets = $assetsStore;
		selected = new Set($selectedAssets?.map((item) => item.name));
	});

	onDestroy(() => {
		clear === null || clear === void 0 ? void 0 : clear();
	});
</script>

<Dialog {...$$props} title="Select asset" class="$style.dialog">
	<Search placeholder="Search for asset" on:input={onInput} on:keyup={onKeyUp} />
	<main>
		<VirtualList itemHeight={32} items={filtered} renderAmount={20} let:item>
			<CheckboxAsset
				{item}
				isActive={selected.has(item.name)}
				on:click={() => onClick(item.name)}
			/>
		</VirtualList>
	</main>
	<div>
		<button class="btn-1 txt-center" on:click={applySelectedValues}>Apply changes</button>
		<button class="btn-2 txt-center" on:click={DialogCtx.close}>Cancel</button>
	</div>
</Dialog>

<style>
	.dialog {
		width: 400px;
		height: 455px;
		max-width: 400px !important;
		max-height: 455px !important;
	}

	.btn-2 {
		--v-padding: 6px;
	}

	main {
		padding: 8px 16px;
		flex: 1;
	}
</style>
