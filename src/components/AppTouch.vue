<template>
	<canvas
		ref="canvas"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd"
	></canvas>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	export default {
		name: "app-touch",
		computed: mapState([
			"colorScheme", "cleanTouch", "renderingTouch", "touchArray",
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

				if (this.touchArray.length > 0) {
					context.beginPath();
					const [firstX, firstY] = this.touchArray[0];
					context.moveTo(firstX, firstY);

					for (let i = 1; i < this.touchArray.length; i++) {
						const [touchX, touchY] = this.touchArray[i];
						context.lineTo(touchX, touchY);
					}

					context.lineWidth = 8;
					context.lineCap = "round";
					context.strokeStyle = this.colorScheme.primaryDark;
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
