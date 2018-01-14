<template>
	<defs>
		<app-game-defs-pattern id="cell-0">
		</app-game-defs-pattern>

		<app-game-defs-pattern id="cell-1">
			<rect
				x="0" y="0"
				width="1" height="1"
				:fill="colors.primary"
			/>
			<rect
				x="0.15" y="0.15"
				width="0.7" height="0.7"
				:fill="colors.primaryWhite"
			/>
		</app-game-defs-pattern>
		
		<app-game-defs-pattern id="cell-2">
			<rect x="0" y="0" width="1" height="1" :fill="colors.primary"/>
		</app-game-defs-pattern>

		<app-game-defs-pattern id="cell-3">
			<rect x="0" y="0" width="1" height="1" :fill="colors.primaryDark"/>
		</app-game-defs-pattern>
	</defs>
</template>

<script>
	import AppGameDefsPattern from "./AppGameDefsPattern";
	import { subs } from "@/assets/js/v_dash";
	import { colorScheme } from "@/assets/js/utils";

	export default {
		name: "app-game-defs",
		components: subs([AppGameDefsPattern]),
		data: () => ({colors: colorScheme}),
	};
</script>
