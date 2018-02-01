import { recognizeGesture } from "@/assets/js/recognizer";
import { emptyGrid } from "@/assets/js/utils";
import { size, split } from "lodash";

export default {
	handleTouchMove ({state, commit}, event) {
		const touch = event.touches[0];
		commit("changeLastTouch", state.newTouch);
		commit("changeNewTouch", touch);
		commit("pushTouchArray", [touch.clientX, touch.clientY]);
	},

	handleTouchEnd ({state, commit, dispatch}) {
		const shape = recognizeGesture(state.touchArray);
		commit("changeRecognizedShape", shape);
		commit("changeTouching", false);
		commit("changeNewTouch", null);
		commit("changeLastTouch", null);
		commit("resetTouchArray");
		commit("changeCleanTouch", true);

		if (!state.calibrated)
			dispatch("nextCalibration");
	},

	confirmCleanTouch({commit}) {
		commit("changeCleanTouch", false);
	},

	startRenderingTouch ({commit}, payload) {
		commit("changeRenderingTouch", true);
		payload();
	},

	stopRenderingTouch ({commit}) {
		commit("changeRenderingTouch", false);
	},

	resetGame ({commit}) {
		commit("changeGrid", emptyGrid(22)(10));
		commit("changeRecognizedShape", "");
	},

	changeRecognizedShapeY ({commit}, payload) {
		commit("changeRecognizedShapeY", payload);
	},

	incrementRecognizedShapeY ({state, commit}, payload) {
		commit("changeRecognizedShapeY", state.recognizedShapeY + payload);
	},

	changeGridCell ({commit}, payload) {
		commit("changeGridCell", payload);
	},

	resetCalibration ({commit}) {
		commit("changeCalibrated", false);
		commit("changeLearntShapeId", 0);
	},

	nextCalibration ({state, getters, commit, dispatch}) {
		if (split(state.recognizedShape, "@", 1)[0] === getters.learntShape) {
			const nextShapeId = state.learntShapeId + 1;
			nextShapeId === size(state.baseShapes)
				? dispatch("finishCalibration")
				: commit("changeLearntShapeId", nextShapeId);
		}
	},

	finishCalibration ({commit}) {
		commit("changeCalibrated", true);
	},
};
