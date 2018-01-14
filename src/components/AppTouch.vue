<template>
	<canvas
		ref="canvas"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd"
	></canvas>
</template>

<script>
	import { colorScheme } from "@/assets/js/utils";

	export default {
		name: "app-touch",
		data: () => ({
			touching: false,
			lastTouch: null,
			newTouch: null,
			touchList: [],
			clean: false,
			rendering: false,
		}),
		methods: {
			handleTouchMove (event) {
				const touch = event.touches[0];
				this.lastTouch = this.newTouch;
				this.newTouch = touch;
				this.touchList.push([touch.clientX, touch.clientY]);
			},
			handleTouchEnd () {
				this.clean = true;
				this.touching = false;
				this.newTouch = null;
				this.lastTouch = null;
				this.touchList = [];
			},
			renderStart () {
				this.rendering = true;
				window.requestAnimationFrame(this.render);
			},
			renderStop () { this.rendering = false; },
			render () {
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

				if (this.clean) {
					this.clean = false;
					context.clearRect(0, 0, width, height);
				}

				this.rendering
					? window.requestAnimationFrame(this.render)
					: window.cancelAnimationFrame(this.render);
			},
		},
		mounted () { this.renderStart(); },
		beforeDestroy () { this.renderStop(); },
	};
</script>

<style lang="scss" scoped>
	@import "~@/assets/css/globals.scss";
	canvas { @include full(); }
</style>
