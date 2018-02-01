/* eslint-disable */

import { Point, DollarRecognizer } from "./one-dollar-recognizer";
import { arrayToPoints } from "./utils";

const dollar = new DollarRecognizer();

/**
 * Adds a new touch gesture
 * @param {String} name The name of the new shape
 * @param {Array} touchArray The array containing finger positions
 */
export const addGesture = (name, touchArray) => {
	const points = arrayToPoints(touchArray);
	dollar.AddGesture({name, points});
};

/** Deletes calibrate user gestures */
export const deleteGestures = () => {
	dollar.DeleteUserGestures();
};

/**
 * Recognizes a given touch gesture
 * @param {Array} touchArray The array containing finger positions
 * @return {String} The recognized gesture's identifier string
 */
export const recognizeGesture = (touchArray) => {
	const points = arrayToPoints(touchArray);
	const shape = dollar.Recognize(points, true);
	console.log("Recognized", shape);
	return shape.Name;
};
