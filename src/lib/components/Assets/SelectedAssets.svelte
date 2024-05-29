<script lang="ts">
	import VirtualList from 'san-webkit/lib/ui/VirtualList/index.svelte';
	import Search from 'san-webkit/lib/ui/Search.svelte';
	import AssetItem from 'san-webkit/lib/ui/ListOfAssets/Asset.svelte';
	import type { Asset } from 'san-webkit/lib/ui/ListOfAssets/types';
	import { getSearcher$Ctx, Searcher$$ } from 'san-webkit/lib/ui/ListOfAssets/search';
	import { showAssetsDialog } from './AssetsDialog.svelte';
	import { selectedAssets } from '$lib/stores';

	const { searchTerm$, filter, onKeyUp, onInput } =
		getSearcher$Ctx() || Searcher$$({ accessAsset: (item: Asset) => item });

	$: searchTerm = $searchTerm$;
	$: filtered = searchTerm ? filter($selectedAssets) : $selectedAssets;
</script>

<div class="container">
	<Search placeholder="Search for asset" on:input={onInput} on:keyup={onKeyUp} />
	<div class="assets-list">
		<VirtualList itemHeight={32} items={filtered} renderAmount={20} let:item>
			<AssetItem {item} />
		</VirtualList>
	</div>
	<button class="btn-1 fluid txt-center" on:click={showAssetsDialog}>Edit assets</button>
</div>

<style>
	.container {
		padding: 16px;
		max-width: 380px;
		width: 100%;
		height: 423px;
		border: 1px solid var(--porcelain);
		border-radius: 8px;
	}

	.assets-list {
		height: 278px;
		margin-bottom: 36px;
	}
</style>
