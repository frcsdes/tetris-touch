import { fill, map } from "lodash";

export const emptyGrid = (height) => (width) =>
	map(
		fill(new Array(height), 0),
		() => fill(new Array(width), 0)
	);

export const colorScheme = {
	primary: "#414C3C",
	primaryWhite: "#C1CBBD",
	primaryLight: "#939E8E",
	primaryDark: "#262D23",
};
