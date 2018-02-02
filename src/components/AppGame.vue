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
			<g :transform="`translate(${recognizedShapeX}, ${recognizedShapeY})`">
				<app-game-placeholder/>
				<app-game-shape :code="recognizedShape"/>
			</g>

			<g :transform="`translate(0, ${headerLength})`">
				<g v-for="(row, i) in gridHeight" :key="i">
					<rect
						v-for="(col, j) in gridWidth" :key="j"
						:x="j" :y="i" width="1" height="1"
						:fill="`url(#cell-${grid[i][j]})`" stroke="none"
					/>
				</g>
			</g>
		</svg>

		<app-touch class="bottom-layer" @touchend.prevent="handleTap"/>

		<figcaption>
			<h2>Score</h2>
			<span>{{ score }}</span>

			<h2>Streak</h2>
			<span>+{{ streak }}</span>

			<router-link to="/" tag="a" class="top-layer">
				Back
			</router-link>
		</figcaption>
	</figure>
</template>

<script>
	import { mapState, mapGetters, mapActions } from "vuex";
	import AppGameDefs from "./AppGameDefs";
	import AppGamePlaceholder from "./AppGameShape";
	import AppGameShape from "./AppGameShape";
	import AppTouch from "./AppTouch";
	import { subs } from "@/assets/js/v_dash";

	export default {
		name: "app-game",
		components: subs([AppGameDefs, AppGamePlaceholder, AppGameShape, AppTouch]),
		computed: {
			...mapState([
				"gridWidth", "gridHeight", "grid", "score",
				"headerLength", "recognizedShape",
				"recognizedShapeX", "recognizedShapeY",
			]),
			...mapGetters(["streak"]),
		},
		methods: mapActions(["handleTap"]),
};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";

	.bottom-layer { z-index: 2; }
	.top-layer { z-index: 3; }

	figure {
		@include flex(row);
		@include full();
		background-color: $primary;
		position: absolute;

		aside, svg, figcaption { height: 100vh; }
		aside { flex: 0 0 1rem; }

		svg {
			background-color: $primary-light;
			border: $drop solid $primary-dark;
			border-width: 0 $drop;
			flex: 0 0 auto;
		}

		figcaption {
			@include flex(col, false);
			align-content: center;
			color: $primary-light;
			flex: 1 1 0;
			padding: 1rem;

			h2 {
				line-height: 1.3rem;
				user-select: none;
			}
			span {
				color: $primary-white;
				font-size: 1.5rem;
				line-height: 2rem;
				max-width: 100%;
				word-break: break-all;
				small { font-size: 1rem; }
			}
			h2 + span { margin-top: 0.4rem; }
			span + h2 { margin-top: 2rem; }

			a {
				align-self: center;
				cursor: pointer;
				font-size: 1.4rem;
				margin-top: auto;
				padding: 1rem 0;
			}
		}
	}
</style>
