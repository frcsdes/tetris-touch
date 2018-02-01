<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
	>
		<app-game-defs/>
		<slot></slot>
	</svg>
</template>

<script>
	import { subs } from "@/assets/js/v_dash";
	import AppGameDefs from "./AppGameDefs";

	export default {
		name: "app-game-svg",
		components: subs([AppGameDefs]),
	};
</script>

<style scoped>
	svg {
		flex: 1 1 0;
		width: 100%;
	}
</style>
