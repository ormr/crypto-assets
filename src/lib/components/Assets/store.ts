import { writable } from 'svelte/store';
import type { Asset } from 'san-webkit/lib/ui/ListOfAssets/types';

export const selectedAssets = writable<Asset[]>();
