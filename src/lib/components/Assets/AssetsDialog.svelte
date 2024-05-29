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
	import { selectedAssets, allAssets } from '$lib/stores';

	export let DialogCtx;

	let assets: Asset[];
	let selected = new Set<Asset>();

	const { searchTerm$, filter, onKeyUp, onInput, clear } =
		getSearcher$Ctx() || Searcher$$({ accessAsset: (item: string) => item });

	$: searchTerm = $searchTerm$;
	$: filtered = searchTerm ? filter(assets) : assets;

	const onClick = (asset: Asset) => {
		if (selected.has(asset)) {
			selected.delete(asset);
		} else {
			selected.add(asset);
		}

		selected = selected;
	};

	const applySelectedValues = () => {
		selectedAssets.set(Array.from(selected));
		DialogCtx.close();
	};

	onMount(() => {
		assets = $allAssets;
		selected = new Set($selectedAssets);
	});

	onDestroy(() => {
		clear?.();
	});
</script>

<Dialog {...$$props} title="Select asset" class="$style.dialog">
	<div class="container">
		<div>
			<Search
				class="mrg-l mrg--b"
				placeholder="Search for asset"
				on:input={onInput}
				on:keyup={onKeyUp}
			/>
		</div>
		<div class="assets-list mrg-l mrg--b">
			<VirtualList itemHeight={32} items={filtered} renderAmount={20} let:item>
				<CheckboxAsset {item} isActive={selected.has(item)} on:click={() => onClick(item)} />
			</VirtualList>
		</div>
		<div class="row gap-m">
			<button class="btn-1 txt-center" on:click={applySelectedValues}>Apply changes</button>
			<button class="btn-2 txt-center" on:click={DialogCtx.close}>Cancel</button>
		</div>
	</div>
</Dialog>

<style>
	.dialog {
		max-width: 511px !important;
		width: 100%;
		height: 467px;
	}

	.container {
		display: flex;
		flex-direction: column;
		padding: 13px 16px 16px 22px;
		height: 100%;
	}

	.btn-2 {
		--v-padding: 6px;
	}

	.assets-list {
		flex: 1;
	}
</style>
