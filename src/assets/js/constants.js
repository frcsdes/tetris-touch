// The base Tetris shapes
export const baseShapes = {
	O: [
		[1, 1],
		[1, 1],
	],

	I: [
		[1],
		[1],
		[1],
		[1],
	],

	S: [
		[0, 1, 1],
		[1, 1, 0],
	],

	Z: [
		[1, 1, 0],
		[0, 1, 1],
	],

	L: [
		[1, 0],
		[1, 0],
		[1, 1],
	],

	J: [
		[0, 1],
		[0, 1],
		[1, 1],
	],

	T: [
		[1, 1, 1],
		[0, 1, 0],
	],
};

// Permutations / rotations could be computed from the base shape but...
export const shapePatterns = {
	"+y": "I@000",
	"-x": "I@090",
	"-y": "I@000",
	"+x": "I@090",

	"+y+y": "I@000",
	"-x-x": "I@090",
	"-y-y": "I@000",
	"+x+x": "I@090",

	"+y+y+y": "I@000",
	"-x-x-x": "I@090",
	"-y-y-y": "I@000",
	"+x+x+x": "I@090",

	"-x+y-x": "S@000",
	"-y-x-y": "S@090",
	"+x-y+x": "S@000",
	"+y+x+y": "S@090",

	"-x-y-x": "Z@000",
	"-y+x-y": "Z@090",
	"+x+y+x": "Z@000",
	"+y-x+y": "Z@090",

	"+y+y+x": "L@000",
	"-x-x+y": "L@090",
	"-y-y-x": "L@180",
	"+x+x-y": "L@270",
	"-x-y-y": "L@000",
	"-y+x+x": "L@090",
	"+x+y+y": "L@180",
	"+y-x-x": "L@270",

	"+y+y-x": "J@000",
	"-x-x+y": "J@090",
	"-y-y+x": "J@180",
	"+x+x+y": "J@270",
	"+x-y-y": "J@000",
	"+y+x+x": "J@090",
	"-x+y+y": "J@180",
	"-y-x-x": "J@270",

	"+x-x+y": "T@000",
	"+y-y-x": "T@090",
	"-x+x-y": "T@180",
	"-y+y+x": "T@270",
	"-x+x+y": "T@000",
	"-y+y-x": "T@090",
	"+x-x-y": "T@180",
	"+y-y+x": "T@270",
	"-y+x-x": "T@000",
	"+x+y-y": "T@090",
	"+y-x+x": "T@180",
	"-x+y-y": "T@270",
	"-y+x-x": "T@000",
	"+x+y-y": "T@090",
	"+y-x+x": "T@180",
	"-x+y-y": "T@270",

	"+y+y+y+x": "L@000",
	"-x-x-x+y": "L@090",
	"-y-y-y-x": "L@180",
	"+x+x+x-y": "L@270",
	"-x-y-y-y": "L@000",
	"-y+x+x+x": "L@090",
	"+x+y+y+y": "L@180",
	"+y-x-x-x": "L@270",

	"+y+y+y-x": "J@000",
	"-x-x-x+y": "J@090",
	"-y-y-y+x": "J@180",
	"+x+x+x+y": "J@270",
	"+x-y-y-y": "J@000",
	"+y+x+x+x": "J@090",
	"-x+y+y+y": "J@180",
	"-y-x-x-x": "J@270",

	"+y+y+y+y": "I@000",
	"-x-x-x-x": "I@090",
	"-y-y-y-y": "I@000",
	"+x+x+x+x": "I@090",

	"+x+y-x-y": "O@000",
	"+y-x-y+x": "O@090",
	"-x-y+x+y": "O@180",
	"-y+x+y-x": "O@270",

	"+x+x-x+y": "T@000",
	"+y+y-y-x": "T@090",
	"-x-x+x-y": "T@180",
	"-y-y+y+x": "T@270",
	"-x-x+x+y": "T@000",
	"-y-y+y-x": "T@090",
	"+x+x-x-y": "T@180",
	"+y+y-y+x": "T@270",
	"-y+x-x-x": "T@000",
	"+x+y-y-y": "T@090",
	"+y-x+x+x": "T@180",
	"-x+y-y-y": "T@270",
	"-y+x-x-x": "T@000",
	"+x+y-y-y": "T@090",
	"+y-x+x+x": "T@180",
	"-x+y-y-y": "T@270",
};

// The game's color scheme
export const colorScheme = {
	primary: "#414C3C",
	primaryWhite: "#C1CBBD",
	primaryLight: "#939E8E",
	primaryDark: "#262D23",
};
