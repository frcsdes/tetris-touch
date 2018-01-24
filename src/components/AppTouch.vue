<template>
	<canvas
		ref="canvas"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd"
	></canvas>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import { colorScheme } from "@/assets/js/utils";

	export default {
		name: "app-touch",
		computed: mapState([
			"newTouch", "lastTouch", "cleanTouch", "renderingTouch",
		]),
		methods: {
			...mapActions([
				"handleTouchMove", "handleTouchEnd", "confirmCleanTouch",
				"startRenderingTouch", "stopRenderingTouch",
			]),
			renderTouch () {
				const canvas = this.$refs.canvas;
				const context = canvas.getContext("2d");

				const height = window.innerHeight;
				const width = window.innerWidth;
				if (canvas.height !== height) canvas.height = height;
				if (canvas.width !== width) canvas.width = width;

				if (this.newTouch && this.lastTouch) {
					const newX = this.newTouch.clientX;
					const newY = this.newTouch.clientY;
					const lastX = this.lastTouch.clientX;
					const lastY = this.lastTouch.clientY;

					context.beginPath();
					context.moveTo(lastX, lastY);
					context.lineTo(newX, newY);
					context.lineWidth = 8;
					context.lineCap = "round";
					context.strokeStyle = colorScheme.primaryDark;
					context.stroke();
					context.closePath();
				}

				if (this.cleanTouch) {
					context.clearRect(0, 0, width, height);
					this.confirmCleanTouch();
				}

				this.renderingTouch
					? window.requestAnimationFrame(this.renderTouch)
					: window.cancelAnimationFrame(this.renderTouch);
			},
		},
		mounted () { this.startRenderingTouch(this.renderTouch); },
		beforeDestroy () { this.stopRenderingTouch(); },
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";
	canvas { @include full(); }
</style>
