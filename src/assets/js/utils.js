import { cloneDeep, fill, map } from "lodash";

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
 * Import the color scheme coresponding to the CSS
 * @return {Object} The color scheme
 */
export const colorScheme = {
	primary: "#414C3C",
	primaryWhite: "#C1CBBD",
	primaryLight: "#939E8E",
	primaryDark: "#262D23",
};
