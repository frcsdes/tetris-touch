<template>
	<div :class="{'disabled': disabled}">{{ label }}</div>
</template>

<script>
	import { props } from "@/assets/js/v_dash";

	export default {
		name: "app-button",
		props: props([
			["optional", String, "label", ""],
			["optional", Boolean, "disabled", false],
		]),
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";

	div {
		@include flex(row);
		background-color: $primary-light;
		border: 0.5rem solid $primary;
		box-shadow: $drop $drop 0 $primary-dark;
		box-sizing: border-box;
		font-size: 1.7rem;
		padding: 0 1rem 0.8rem;
		&:active { color: $primary-dark; }
		&.disabled { opacity: 0.6; }
	}
</style>
