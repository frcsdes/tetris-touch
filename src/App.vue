<template>
	<main @dragstart.prevent>
		<router-view/>
	</main>
</template>

<script>
	export default {
		name: "app",
	};
</script>

<style lang="scss">
	@import "~@/assets/css/reset";
	@import "~@/assets/css/globals.scss";

	@font-face {
		font-family: "Pixeled";
		src: url("~@/assets/fonts/Pixeled.ttf") format("truetype");
	}

	html {
		@include responsive((
			font-size 12px 16px 18px 24px,
		));
	}

	body {
		background-color: $primary-light;
		color: $primary;
		font-family: "Pixeled", Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	main {
		@include full();
		@include flex(col);
		::selection,
		::-moz-selection {
			background-color: $primary;
			color: $primary-light;
		}
	}
</style>
