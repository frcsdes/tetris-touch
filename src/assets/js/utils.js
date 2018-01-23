import { fill, map } from "lodash";

/**
 * Creates an new grid of size height x with filled with 0
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
 * Import the color scheme coresponding to the CSS
 * @return {Object} The color scheme
 */
export const colorScheme = {
	primary: "#414C3C",
	primaryWhite: "#C1CBBD",
	primaryLight: "#939E8E",
	primaryDark: "#262D23",
};
