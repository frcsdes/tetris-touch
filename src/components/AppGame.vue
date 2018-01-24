<template>
	<figure>
		<aside></aside>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			:viewBox="`0 0 ${gridWidth} ${gridHeight + headerLength}`"
			preserveAspectRatio="xMidYMin"
			meetOrSlice="meet"
		>
			<app-game-defs/>
			<app-game-shape/>

			<g :transform="`translate(0, ${headerLength})`">
				<g v-for="(row, i) in gridHeight" :key="i">
					<rect
						v-for="(cell, j) in gridWidth" :key="j"
						:x="j" :y="i" width="1" height="1"
						:fill="`url(#cell-${grid[i][j]})`"
						stroke="none"
					/>
				</g>
			</g>
		</svg>

		<figcaption>
			<h2>Next</h2>
			<span>2<small>x</small>3</span>
			<h2>Score</h2>
			<span>3492</span>
			<h2>{{ recognizedShape }}</h2>
		</figcaption>
	</figure>
</template>

<script>
	import AppGameDefs from "./AppGameDefs";
	import AppGameShape from "./AppGameShape";
	import { mapState } from "vuex";
	import { subs } from "@/assets/js/v_dash";

	export default {
		name: "app-game",
		components: subs([AppGameDefs, AppGameShape]),
		computed: mapState([
			"gridWidth", "gridHeight", "grid",
			"headerLength", "recognizedShape",
		]),
};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";

	figure {
		@include flex(row);
		@include full();
		position: absolute;

		aside, svg, figcaption { height: 100vh; }
		aside, figcaption { background-color: $primary; }
		aside { flex: 0 0 1rem; }

		svg {
			border: $drop solid $primary-dark;
			border-width: 0 $drop;
			flex: 0 0 auto;
		}

		figcaption {
			@include flex(col);
			align-content: center;
			align-items: flex-start;
			color: $primary-light;
			flex: 1 1 0;
			padding: 0 1rem;

			h2 { user-select: none; }
			span {
				color: $primary-white;
				font-size: 1.5rem;
				small { font-size: 1rem; }
			}
			h2 + span { margin-top: 0.4rem; }
			span + h2 { margin-top: 2rem; }
		}
	}
</style>
