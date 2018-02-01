<template>
	<section>
		<app-game/>
	</section>
</template>

<script>
	import { mapActions } from "vuex";
	import AppGame from "./AppGame";
	import { subs } from "@/assets/js/v_dash";

	export default {
		name: "view-play",
		components: subs([AppGame]),
		methods: mapActions(["resetGame"]),
		created () { this.resetGame(); },
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
