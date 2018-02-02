<template>
	<g>
		<g v-for="(row, i) in 4" :key="i">
			<rect
				v-for="(col, j) in 4" :key="j"
				:x="j" :y="i" width="1" height="1"
				:fill="`url(#cell-1)`"
				stroke="none"
			/>
		</g>
	</g>
</template>

<script>
	export default {
		name: "app-game-placeholder",
	};
</script>
