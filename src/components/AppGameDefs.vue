<template>
	<defs>
		<app-game-pattern id="cell-0">
		</app-game-pattern>

		<app-game-pattern id="cell-1">
			<rect
				x="0" y="0"
				width="1" height="1"
				:fill="colorScheme.primary"
			/>
			<rect
				x="0.15" y="0.15"
				width="0.7" height="0.7"
				:fill="colorScheme.primaryWhite"
			/>
		</app-game-pattern>
		
		<app-game-pattern id="cell-2">
			<rect x="0" y="0" width="1" height="1" :fill="colorScheme.primary"/>
		</app-game-pattern>

		<app-game-pattern id="cell-3">
			<rect x="0" y="0" width="1" height="1" :fill="colorScheme.primaryDark"/>
		</app-game-pattern>
	</defs>
</template>

<script>
	import { mapState } from "vuex";
	import AppGamePattern from "./AppGamePattern";
	import { subs } from "@/assets/js/v_dash";

	export default {
		name: "app-game-defs",
		components: subs([AppGamePattern]),
		computed: mapState(["colorScheme"]),
	};
</script>
