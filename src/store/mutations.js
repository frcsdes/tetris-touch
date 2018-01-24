import { setNth } from "@/assets/js/utils";

export default {
	changeGridCell (state, {i, j, value}) {
		state.grid = setNth(state.grid)(i)(j)(value);
	},

	changeTouching (state, payload) {
		state.touching = payload;
	},

	changeNewTouch (state, payload) {
		state.newTouch = payload;
	},

	changeLastTouch (state, payload) {
		state.lastTouch = payload;
	},

	pushTouchArray (state, payload) {
		state.touchArray = [...state.touchArray, payload];
	},

	resetTouchArray (state) {
		state.touchArray = [];
	},

	changeCleanTouch (state, payload) {
		state.cleanTouch = payload;
	},

	changeRenderingTouch (state, payload) {
		state.renderingTouch = payload;
	},

	changeRecognizedShape (state, payload) {
		state.recognizedShape = payload;
	},
};
