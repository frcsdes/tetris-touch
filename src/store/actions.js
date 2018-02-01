import {
	addGesture, deleteGestures, recognizeGesture,
} from "@/assets/js/recognizer";

export default {
	handleTouchMove ({state, commit}, event) {
		const touch = event.touches[0];
		commit("changeLastTouch", state.newTouch);
		commit("changeNewTouch", touch);
		commit("pushTouchArray", [touch.clientX, touch.clientY]);
	},

	handleTouchEnd ({state, getters, dispatch, commit}) {
		if (state.touchMode === 0) {
			addGesture(getters.learntShape, state.touchArray);
			commit("changeLearntShapeId", state.learntShapeId + 1);

			if (state.learntShapeId === getters.baseShapesKeys.length)
				dispatch("finishCalibration");
		}

		else if (state.touchMode === 1) {
			const shape = recognizeGesture(state.touchArray);
			commit("changeRecognizedShape", shape);
			console.log("Recognized action", shape);
		}

		commit("changeTouching", false);
		commit("changeNewTouch", null);
		commit("changeLastTouch", null);
		commit("resetTouchArray");
		commit("changeCleanTouch", true);
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

	changeGridCell ({commit}, payload) {
		commit("changeGridCell", payload);
	},

	changeRecognizedShape ({commit}, payload) {
		commit("changeRecognizedShape", payload);
	},

	changeTouchMode ({commit}, payload) {
		commit("changeTouchMode", payload);
	},

	resetCalibration ({commit}) {
		deleteGestures();
		commit("changeCalibrated", false);
		commit("changeLearntShapeId", 0);
	},

	finishCalibration ({commit}) {
		commit("changeCalibrated", true);
	},
};
