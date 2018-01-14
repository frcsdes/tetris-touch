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
		background-color: $primary-white;
		color: $primary;
		font-family: "Pixeled", Arial, sans-serif;
		touch-action: manipulation;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		-webkit-overflow-scrolling: touch;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
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
