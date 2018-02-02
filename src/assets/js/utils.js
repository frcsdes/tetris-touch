import { cloneDeep, fill, forEach, map, split } from "lodash";
import { baseShapes } from "./constants";

/**
 * Creates a new grid of size height x with filled with 0
 * @param {Number} height The height if the grid (rows count)
 * @param {Number} width The width if the grid (columns count)
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
 * Retrieve the base prefix from a shape code
 * @param {String} code The shape code
 * @return {String} The shape's base
 */
export const shapePrefix = (code) => split(code, "@", 1)[0];

export const rotateTouchArray = (stroke) => (angle) => {
	const c = Math.cos(Math.PI * angle / 180);
	const s = Math.sin(Math.PI * angle / 180);
	return map(stroke, ([x, y]) => [
		x * c - y * s,
		x * s + y * c,
	]);
};

const rotateShapeOnceClockwise = (shape) => {
	// Names inverted to match the rotated shape
	const colCount = shape.length;
	const rowCount = shape[0].length;
	let rotated = emptyGrid(rowCount)(colCount);

	forEach(rotated, (row, i) =>
		forEach(row, (col, j) => {
			rotated[i][j] = shape[colCount - 1 - j][i];
		})
	);

	return rotated;
};

export const rotateShape = (shape) => (rotation) => {
	// Names inverted to match the rotated shape
	const codeToIterations = {
		"000": 0,
		"090": 1,
		"180": 2,
		"270": 3,
	};

	let rotated = shape;
	for (let i = 0; i < codeToIterations[rotation]; i++)
		rotated = rotateShapeOnceClockwise(rotated);

	return rotated;
};

export const derivedShape = (code) => {
	const [base, rotation] = split(code, "@", 2);
	const baseShape = baseShapes[base] || [[]];

	return rotation
		? rotateShape(baseShape)(rotation)
		: baseShape;
};
