import { emptyGrid } from "@/assets/js/utils";
import { baseShapes, colorScheme } from "@/assets/js/constants";

export default {
	colorScheme,
	baseShapes,
	calibrated: true,
	doubleTapped: true,
	lastTapped: 0,
	headerLength: 6,
	gridHeight: 22,
	gridWidth: 10,
	grid: emptyGrid(22)(10),
	minTimeout: 10,
	maxTimeout: 300,
	score: 0,
	lastShapes: [],
	streakSize: 7,
	touching: false,
	newTouch: null,
	touchArray: [],
	cleanTouch: false,
	renderingTouch: false,
	recognizedShape: "",
	recognizedShapeX: 0,
	recognizedShapeY: 0,
	recognizedShapeDirection: 1,
	learntShapeId: 0,
};
