import { recognizeGesture } from "@/assets/js/recognizer";

export default {
	handleTouchMove ({state, commit}, event) {
		const touch = event.touches[0];
		commit("changeLastTouch", state.newTouch);
		commit("changeNewTouch", touch);
		commit("pushTouchArray", [touch.clientX, touch.clientY]);
	},

	handleTouchEnd ({state, commit}) {
		const shape = recognizeGesture(state.touchArray);
		console.log(shape);
		commit("changeTouching", false);
		commit("changeNewTouch", null);
		commit("changeLastTouch", null);
		commit("resetTouchArray");
		commit("changeCleanTouch", true);
		commit("changeRecognizedShape", shape);
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
};
