<template>
	<section>
		<figure>
			<figcaption>You choose the block's shape</figcaption>
			<app-game-svg viewBox="0 0 15 4">
				<app-game-shape
					letter="O" :pattern="3"
					transform="translate(0, 1)"
				/>
				<app-game-shape
					letter="I" :pattern="3"
					transform="translate(3, 0)"
				/>
				<app-game-shape
					letter="S" :pattern="3"
					transform="translate(5, 1)"
				/>
				<app-game-shape
					letter="T" :pattern="3"
					transform="translate(9, 1)"
				/>
				<app-game-shape
					letter="J" :pattern="3"
					transform="translate(13, 0.5)"
				/>
			</app-game-svg>
		</figure>

		<figure>
			<figcaption>The game chooses the position</figcaption>
			<app-game-svg viewBox="-30 -9 60 18">
				<path d="M-23,-5 l-5,5 l5,5"/>
				<text text-anchor="middle" transform="translate(1.5, 7)">?</text>
				<path d="M23,-5 l5,5 l-5,5"/>
			</app-game-svg>
		</figure>

		<figure>
			<figcaption>Varying shapes adds to score</figcaption>
			<app-game-svg viewBox="0 0 40 14" class="small-font">
				<g>
					<app-game-shape
						v-for="(_, i) in 7" :key="i" letter="I"
						:pattern="3" :transform="`translate(${i * 3}, 0)`"
					/>
					<text transform="translate(30, 4)">= 10</text>
				</g>
				<g transform="translate(0, 5)">
					<app-game-shape
						v-for="(_, i) in 3" :key="i" letter="I"
						:pattern="3" :transform="`translate(${i * 3}, 0)`"
					/>
					<app-game-shape
						v-for="(_, i) in 4" :key="i + 3 * 3" letter="Z"
						:pattern="3" :transform="`translate(${i * 4 + 3 * 3}, 1)`"
					/>
					<text transform="translate(30, 4)">= 20</text>
				</g>
				<g transform="translate(0, 10)">
					<app-game-shape letter="S"	:pattern="3" transform="translate(0, 1)"/>
					<app-game-shape letter="Z"	:pattern="3" transform="translate(4, 1)"/>
					<app-game-shape letter="O"	:pattern="3" transform="translate(8, 1)"/>
					<app-game-shape letter="L"	:pattern="3" transform="translate(11, 0.5)"/>
					<app-game-shape letter="I"	:pattern="3" transform="translate(14, 0)"/>
					<app-game-shape letter="Z"	:pattern="3" transform="translate(16, 1)"/>
					<app-game-shape letter="T"	:pattern="3" transform="translate(20, 1)"/>
					<text transform="translate(30, 4)">= 70</text>
				</g>
			</app-game-svg>
		</figure>

		<router-link to="/calibration" tag="a">
			<app-button class="button" label="Next"/>
		</router-link>
	</section>
</template>

<script>
	import { mapState } from "vuex";
	import AppGameSvg from "./AppGameSvg";
	import AppGameShape from "./AppGameShape";
	import AppButton from "./AppButton";
	import { subs } from "@/assets/js/v_dash";

	export default {
		name: "view-tutorial",
		components: subs([AppGameSvg, AppGameShape, AppButton]),
		computed: mapState(["colorScheme"]),
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";

	section {
		@include flex(col);
		flex: 1 1 0;
		padding: 2rem 1rem;
		position: relative;
		width: 100%;

		figure {
			@include flex(col);
			flex: 1 1 0;
			width: 100%;
			&:not(:last-of-type) { margin-bottom: 4rem; }

			figcaption {
				font-size: 0.9rem;
				line-height: 2em;
				margin-bottom: 2rem;
				text-align: center;
			}

			svg {
				display: block;
				flex: 1 1 0;
				width: 100%;

				path {
					fill: none;
					stroke: $primary-dark;
					stroke-width: 2;
				}
				text {
					fill: $primary-dark;
					stroke: $primary-dark;
				}
				&:not(.small-font) text { font-size: 10pt; }
				&.small-font text {
					font-size: 2.2pt;
					stroke-width: 0.1;
				}
			}
		}

		.button {
			height: 5rem;
			margin-top: 3rem;
		}
	}
</style>
