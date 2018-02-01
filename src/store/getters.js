import { keys } from "lodash";

export default {
	baseShapesKeys (state) {
		return keys(state.baseShapes);
	},

	learntShape (state, getters) {
		return getters.baseShapesKeys[state.learntShapeId];
	},
};
