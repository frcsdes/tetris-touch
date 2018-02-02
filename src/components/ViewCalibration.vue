<template>
	<section>
		<template v-if="!calibrated && doubleTapped">
			<figure>
				<figcaption>
					Draw the "{{ learntShape }}" shape with a gesture on your screen
				</figcaption>
				<app-game-svg viewBox="-2 -2 4 4">
					<app-game-shape :code="learntShape" :pattern="1" centered/>
				</app-game-svg>
			</figure>
			<app-touch/>
		</template>

		<template v-if="calibrated && !doubleTapped">
			<big>Double tap to teleport a block down</big>
			<div
				id="double-tap-zone"
				@mousedown="handleTap"
				@touchend.prevent="handleTap"
			></div>
		</template>

		<template v-if="calibrated && doubleTapped">
			<big>Tutorial<br>complete!</big>
			<router-link to="/play" tag="a" v-if="calibrated">
				<app-button class="button" label="Play"/>
			</router-link>
		</template>
	</section>
</template>

<script>
	import { mapState, mapGetters, mapActions } from "vuex";
	import AppGameSvg from "./AppGameSvg";
	import AppGameShape from "./AppGameShape";
	import AppTouch from "./AppTouch";
	import AppButton from "./AppButton";
	import { subs } from "@/assets/js/v_dash";

	export default {
		name: "view-calibration",
		components: subs([AppGameSvg, AppGameShape, AppTouch, AppButton]),
		computed: {
			...mapState(["baseShapes", "calibrated", "doubleTapped"]),
			...mapGetters(["baseShapesKeys", "learntShape"]),
		},
		methods: mapActions(["resetCalibration", "handleTap"]),
		created () { this.resetCalibration(); },
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

		big,
		figure {
			@include flex(col);
			flex: 1 1 0;
		}

		big,
		figure figcaption {
			text-align: center;
			line-height: 2em;
		}

		big { font-size: 1.6rem; }

		figure {
			width: 100%;

			figcaption {
				font-size: 0.9rem;
				margin-bottom: 2rem;
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

		#double-tap-zone {
			@include full();
		}

		.button {
			height: 5rem;
			margin-top: 3rem;
		}
	}
</style>
