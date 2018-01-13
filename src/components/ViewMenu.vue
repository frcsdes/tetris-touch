<template>
	<section>
		<h1>TETRIS</h1>
		<h1>TOUCH</h1>

		<ul>
			<li>
				<router-link to="/tutorial" tag="a">
					Tutorial
				</router-link>
			</li>
			<li>
				<router-link to="/play" tag="a">
					New Game
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: "view-menu",
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";

	section {
		@include full();
		@include flex(col);

		padding: 20px;

		ul {
			@include flex(col);
			flex: 1 1 0;

			li {
				@include flex(row);
				background-color: $primary-light;
				border: 0.5rem solid $primary;
				box-shadow: $drop $drop 0 $primary-dark;
				flex: 0 0 auto;
				margin-bottom: 1rem + $drop;
				overflow: hidden;
				width: 100%;
			}
			
		}

		h1 {
			flex: 0 0 auto;
			// font-family: "Tetris", Arial, sans-serif;;
			font-size: 4rem;
			line-height: 7rem;
			text-shadow: $drop $drop 0 $primary-dark;
		}
		a {
			@include flex(row);
			flex: 1 1 0;
			font-size: 2rem;
			height: 5rem;
			padding: 0 1rem 1rem;
			&:active { color: $primary-dark; }
		}
	}
</style>
