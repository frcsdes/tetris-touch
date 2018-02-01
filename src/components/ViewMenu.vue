<template>
	<section>
		<header>
			<h1>TETRIS</h1>
			<h1>TOUCH</h1>
		</header>

		<ul>
			<li>
				<router-link to="/tutorial" tag="a">
					<app-button class="button" label="Tutorial"/>
				</router-link>
			</li>
			<li>
				<router-link to="/calibration" tag="a">
					<app-button class="button" label="Calibration"/>
				</router-link>
			</li>
			<li>
				<router-link to="/play" tag="a">
					<app-button class="button" label="New Game" :disabled="!calibrated"/>
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
	import { mapState } from "vuex";
	import AppButton from "./AppButton";
	import { subs } from "@/assets/js/v_dash";

	export default {
		name: "view-menu",
		components: subs([AppButton]),
		computed: mapState(["calibrated"]),
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";

	section {
		@include full();
		@include flex(col);

		header {
			@include flex(col);
			flex: 2 2 0;
			
			h1 {
				flex: 0 0 auto;
				font-size: 4rem;
				line-height: 7rem;
				text-shadow: $drop $drop 0 $primary-dark;
			}
		}

		ul {
			@include flex(col);
			flex: 3 3 0;

			li {
				@include flex(row);
				flex: 0 0 auto;
				height: 6rem;
				margin-bottom: 1rem + $drop;
				width: 100%;

				a {
					flex: 1 1 0;
					height: 100%;
					.button { height: 100%; }
				}
			}
		}
	}
</style>
