import { emptyGrid } from "@/assets/js/utils";
import { baseShapes, colorScheme } from "@/assets/js/constants";

export default {
	colorScheme,
	baseShapes,
	calibrated: true,
	headerLength: 6,
	gridHeight: 22,
	gridWidth: 10,
	grid: emptyGrid(22)(10),
	touching: false,
	newTouch: null,
	lastTouch: null,
	touchArray: [],
	cleanTouch: false,
	renderingTouch: false,
	recognizedShape: "",
	recognizedShapeX: 0,
	recognizedShapeY: 0,
	learntShapeId: 0,
};
