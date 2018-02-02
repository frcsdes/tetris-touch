<template>
	<g :transform="centered ? `translate(-${width / 2}, -${height / 2})` : ''">
		<g v-for="(row, i) in height" :key="i">
			<rect
				v-for="(col, j) in width" :key="j"
				:x="j" :y="i" width="1" height="1"
				:fill="`url(#cell-${shape[i][j] === 0 ?  0 : pattern || shape[i][j]})`"
				stroke="none"
			/>
		</g>
	</g>
</template>

<script>
	import { props } from "@/assets/js/v_dash";
	import { derivedShape } from "@/assets/js/utils";

	export default {
		name: "app-game-shape",
		props: props([
			["required", String, "code"],
			["optional", Boolean, "centered", false],
			["optional", Number, "pattern", null],
		]),
		computed: {
			shape () { return derivedShape(this.code); },
			height () { return this.shape.length; },
			width () { return this.shape[0].length; },
		},
	};
</script>
