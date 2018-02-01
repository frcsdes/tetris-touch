import { cloneDeep, fill, map } from "lodash";
import { Point } from "./one-dollar-recognizer";

/**
 * Creates a new grid of size height x with filled with 0
 * @param {Number} height The height if the grid
 * @param {Number} width The width if the grid
 * @return {Array} The new grid
 */
export const emptyGrid = (height) => (width) =>
	map(
		fill(new Array(height), 0),
		() => fill(new Array(width), 0)
	);

/**
 * Creates a new grid from the given one, with element at (i, j) set to value
 * @param {Array} grid The old grid
 * @param {Number} i The row index
 * @param {Number} j The column index
 * @param value The value the element at (i, j) must be set to
 * @return {Array} The new grid
 */
export const setNth = (grid) => (i) => (j) => (value) => {
	let newGrid = cloneDeep(grid);
	newGrid[i][j] = value;
	return newGrid;
};

/**
 * Converts an array of coordinates to an array of Points
 * @param {Array} coordinates The array of [x, y] coordinates
 * @return {Array} The corresponding Points array
 */
export const arrayToPoints = (coordinates) =>
	map(coordinates, ([x, y]) => new Point(x, y));
