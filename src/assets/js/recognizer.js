/* eslint-disable */

import { Point, DollarRecognizer } from "./one-dollar-recognizer";
import { map } from "lodash";

/**
 * Recognizes a given touch gesture
 * @param touchArray {Array} The array containing finger positions
 * @return {String} The recognized gesture's identifier string
 */
export const recognizeGesture = (touchArray) => {
	const points = map(touchArray, ([x, y]) => new Point(x, y));
	const dollar = new DollarRecognizer();
	console.log(touchArray, points);
	const shape = dollar.Recognize(points, true);
	return shape.Name;
};
