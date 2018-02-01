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
		methods: mapActions(["changeGridCell", "changeTouchMode"]),
		created () {
			this.changeTouchMode(1);
			this.changeGridCell({i: 0, j: 0, value: 1});
			this.changeGridCell({i: 2, j: 0, value: 2});
			this.changeGridCell({i: 3, j: 0, value: 3});
			this.changeGridCell({i: 21, j: 1, value: 3});
		},
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
