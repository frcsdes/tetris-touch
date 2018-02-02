import { indexOf, keys, map, sum, uniq } from "lodash";
import { derivedShape, shapePrefix } from "@/assets/js/utils";

export default {
	baseShapesKeys (state) {
		return keys(state.baseShapes);
	},

	totalHeight (state) {
		return state.headerLength + state.gridHeight;
	},

	timeout (state) {
		const t = 1 - 2 * Math.atan(state.score / 500) / Math.PI;
		return t * state.maxTimeout + (1 - t) * state.minTimeout;
	},

	spaceWithGrid (state) {
		const shape = derivedShape(state.recognizedShape);

		// eslint-disable-next-line
		const shapeLastRow = shape[shape.length - 1];
		// eslint-disable-next-line
		const firstNonEmptyRow = indexOf(map(state.grid, (row) => sum(row) > 0), true);

		const shapeBottom = state.recognizedShapeY + shape.length;

		return shapeBottom;
	},

	streak (state) {
		return 10 * uniq(map(state.lastShapes, shapePrefix)).length;
	},

	learntShape (state, getters) {
		return getters.baseShapesKeys[state.learntShapeId];
	},
};
