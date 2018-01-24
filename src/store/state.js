import { emptyGrid } from "@/assets/js/utils";

export default {
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
	newShape: "",
};
