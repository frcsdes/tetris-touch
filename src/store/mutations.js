import { takeRight } from "lodash";
import { setNth } from "@/assets/js/utils";

export default {
	changeCalibrated (state, payload) {
		state.calibrated = payload;
	},

	changeLastTapped (state, payload) {
		state.lastTapped = payload;
	},

	changeDoubleTapped (state, payload) {
		state.doubleTapped = payload;
	},

	changeGrid (state, payload) {
		state.grid = payload;
	},

	changeRecognizedShapeY (state, payload) {
		state.recognizedShapeY = payload;
	},

	changeGridCell (state, {i, j, value}) {
		state.grid = setNth(state.grid)(i)(j)(value);
	},

	changeScore (state, payload) {
		state.score = payload;
	},

	changeTouching (state, payload) {
		state.touching = payload;
	},

	changeNewTouch (state, payload) {
		state.newTouch = payload;
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

	pushLastShapes (state, payload) {
		state.lastShapes = [...takeRight(state.lastShapes, state.streakSize - 1), payload];
	},

	resetLastShapes (state) {
		state.lastShapes = [];
	},

	changeRecognizedShape (state, payload) {
		state.recognizedShape = payload;
	},

	changeLearntShapeId (state, payload) {
		state.learntShapeId = payload;
	},
};
