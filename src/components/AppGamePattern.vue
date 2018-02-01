<template>
	<pattern :id="id" x="0" y="0" width="1" height="1">
		<slot></slot>
	</pattern>
</template>

<script>
	import { props } from "@/assets/js/v_dash";
	export default {
		name: "app-game-pattern",
		props: props([["required", String, "id"]]),
	};
</script>
