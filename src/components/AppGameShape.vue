<template>
	<g>
	</g>
</template>

<script>
	import { props } from "@/assets/js/v_dash";
	export default {
		name: "app-game-shape",
		props: props([
			["optional", Number, "id", 0],
			["optional", Number, "width", 0],
			["optional", Number, "height", 0],
		]),
	};
</script>
