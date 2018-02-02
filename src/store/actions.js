import { recognizeGesture } from "@/assets/js/recognizer";
import { emptyGrid, shapePrefix } from "@/assets/js/utils";
import { random, size } from "lodash";

export default {
	handleTap ({state, commit, dispatch}, event) {
		const time = event.timeStamp;
		time - state.lastTapped < 250
			? state.doubleTapped
				? dispatch("finishRecognizedShape")
				: dispatch("finishDoubleTap")
			: commit("changeLastTapped", time);
	},

	handleTouchStart ({commit}) {
		commit("changeTouching", true);
	},

	handleTouchMove ({state, commit}, event) {
		if (state.touching) {
			const touch = event.touches
				? event.touches[0]
				: {clientX: event.clientX, clientY: event.clientY};
			commit("changeNewTouch", touch);
			commit("pushTouchArray", [touch.clientX, touch.clientY]);
		}
	},

	handleTouchEnd ({state, commit, dispatch}) {
		const shape = recognizeGesture(state.touchArray);
		if (shape) {
			commit("changeRecognizedShape", shape);
			commit("changeNewTouch", null);

			if (!state.calibrated)
				dispatch("nextCalibration");
		}

		commit("changeTouching", false);
		commit("resetTouchArray");
		commit("changeCleanTouch", true);

	},

	resetCalibration ({commit}) {
		commit("changeCalibrated", false);
		commit("changeLearntShapeId", 0);
	},

	nextCalibration ({state, getters, commit, dispatch}) {
		if (shapePrefix(state.recognizedShape) === getters.learntShape) {
			const nextShapeId = state.learntShapeId + 1;
			nextShapeId === size(state.baseShapes)
				? dispatch("finishCalibration")
				: commit("changeLearntShapeId", nextShapeId);
		}
	},

	finishCalibration ({commit, dispatch}) {
		commit("changeCalibrated", true);
		dispatch("resetDoubleTap");
	},

	resetDoubleTap ({commit}) {
		commit("changeDoubleTapped", false);
	},

	finishDoubleTap ({commit}) {
		commit("changeDoubleTapped", true);
	},

	stopPlaying ({commit}) {
		commit("changePlaying", false);
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

	resetGame ({getters, commit, dispatch}) {
		commit("changeGrid", emptyGrid(22)(10));
		commit("changePlaying", true);
		commit("changeScore", 0);
		commit("resetLastShapes");
		dispatch("resetRecognizedShape");

		window.setTimeout(
			() => dispatch("incrementRecognizedShapeY"),
			getters.timeout
		);
	},

	resetRecognizedShape ({state, getters, commit}) {
		const randomX = random(0, state.gridWidth - 4);
		commit("changeRecognizedShapeX", randomX);
		commit("changeRecognizedShapeY", 0);

		const shapeKeys = getters.baseShapesKeys;
		const randomBase = shapeKeys[random(0, shapeKeys.length - 1, false)];
		const randomRotation = ["000", "090", "180", "270"][random(0, 3, false)];
		const randomShape = randomBase + "@" + randomRotation;
		commit("changeRecognizedShape", randomShape);
	},

	finishRecognizedShape ({state, getters, commit, dispatch}) {
		commit("pushLastShapes", state.recognizedShape);
		commit("changeScore", state.score + getters.streak);

		dispatch("resetRecognizedShape");
	},

	incrementRecognizedShapeY ({state, getters, commit, dispatch}) {
		getters.spaceWithGrid <= 0 ||
		state.recognizedShapeY + 1 > getters.totalHeight
			? dispatch("finishRecognizedShape")
			: commit("changeRecognizedShapeY", state.recognizedShapeY + 1);

		if (state.playing) {
			window.setTimeout(
				() => dispatch("incrementRecognizedShapeY"),
				getters.timeout
			);
		}
	},

	changeGridCell ({commit}, payload) {
		commit("changeGridCell", payload);
	},
};
