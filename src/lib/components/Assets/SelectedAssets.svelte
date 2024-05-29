<script lang="ts">
	import VirtualList from 'san-webkit/lib/ui/VirtualList/index.svelte';
	import Search from 'san-webkit/lib/ui/Search.svelte';
	import AssetItem from 'san-webkit/lib/ui/ListOfAssets/Asset.svelte';
	import { getSearcher$Ctx, Searcher$$ } from 'san-webkit/lib/ui/ListOfAssets/search';
	import { selectedAssets } from './store';
	import AssetsButton from './AssetsButton.svelte';

	const { searchTerm$, filter, onKeyUp, onInput } =
		getSearcher$Ctx() || Searcher$$({ accessAsset: (_: any) => _ });
	$: searchTerm = $searchTerm$;
	$: filtered = searchTerm ? filter($selectedAssets) : $selectedAssets;
</script>

<div class="selected-assets">
	<Search placeholder="Search for asset" on:input={onInput} on:keyup={onKeyUp} />
	<main>
		<VirtualList itemHeight={32} items={filtered} renderAmount={20} let:item>
			<AssetItem {item} />
		</VirtualList>
	</main>
	<div>
		<AssetsButton />
	</div>
</div>

<style>
	.selected-assets {
		height: 500px;
	}

	main {
		max-height: 250px;
		height: 100%;
	}
</style>
