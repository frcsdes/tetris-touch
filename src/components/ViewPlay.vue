<template>
	<section>
		<app-game
			:gridHeight="gridHeight"
			:gridWidth="gridWidth"
			:grid="grid"
		/>
		<app-touch/>
	</section>
</template>

<script>
	import AppGame from "./AppGame";
	import AppTouch from "./AppTouch";
	import { subs } from "@/assets/js/v_dash";
	import { emptyGrid } from "@/assets/js/utils";

	export default {
		name: "view-play",
		components: subs([AppGame, AppTouch]),
		data: () => ({
			gridHeight: 22,
			gridWidth: 10,
			grid: emptyGrid(22)(10),
		}),
		created () {
			this.grid[0][0] = 1;
			this.grid[2][0] = 2;
			this.grid[3][0] = 3;
			this.grid[21][0] = 3;
		},
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";

	section {
		flex: 1 1 0;
		position: relative;
		width: 100%;
	}
</style>
