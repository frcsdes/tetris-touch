import { chunk, map, maxBy, minBy, sum, sumBy } from "lodash";
import { shapePatterns } from "./constants";

const constantSpeed = 4;

/**
 * Returns the offset of a set of values
 * @param {Array} values The set of values
 * @return The last element minus the first one
 */
const chunkOffset = (values) => values[values.length - 1] - values[0];

// @todo: fix
// eslint-disable-next-line
const toConstantSpeed = (chunk) => {
	if (chunk.length === 0)
		return [];

	let newChunk = [chunk[0]];
	let lastPushed = chunk[0];

	for (let i = 1; i < chunk.length; i++) {
		const value = chunk[i];
		if (Math.abs(value - lastPushed) >= constantSpeed) {
			newChunk.push(value);
			lastPushed = value;
		}
	}

	return newChunk;
};

/**
 * Determines the main axis of a chunk
 * @param {Array} chunk The array of chunk coordinates
 * @return {Object} The axis and the associated score
 */
const chunkAxisScore = (chunk) => {
	// Separate X and Y coordinates
	const chunkX = map(chunk, 0);
	const chunkY = map(chunk, 1);

	// Compute the offset and absolute value of the offset for each axis
	const axisOffsets = [
		{axis: "x", offset: chunkOffset(chunkX), absOffset: Math.abs(chunkOffset(chunkX))},
		{axis: "y", offset: chunkOffset(chunkY), absOffset: Math.abs(chunkOffset(chunkY))},
	];

	// Find the main / secondary axis: it maximizes / minimizes the offset
	const maxAxisOffset = maxBy(axisOffsets, "absOffset");
	const minAxisOffset = minBy(axisOffsets, "absOffset");

	// Compute the score:
	// - the main axis should have a big offset
	// - the secondary axis should have a little offset
	const score = maxAxisOffset.absOffset - minAxisOffset.absOffset;
	const sign = maxAxisOffset.offset >= 0 ? "+" : "-";
	const unsignedAxis = maxAxisOffset.axis;

	return {axis: sign + unsignedAxis, score};
};

/**
 * Divides a stroke into multiple chunks
 * @param {Array} stroke The array of stroke coordinates
 * @param {Number} count The number of chunks to generate
 * @return {Array} The axis and associated score for each chunk
 */
const divideStroke = (stroke) => (count) => {
	const chunks = chunk(stroke, Math.ceil(stroke.length / count));
	return map(chunks, chunkAxisScore);
};

/**
 * Recognizes a given touch gesture
 * @param {Array} stroke The array containing finger positions
 * @return {String} The recognized gesture's identifier string
 */
export const recognizeGesture = (stroke) => {
	// Divide the stroke in 1, 2, 3 or 4 chunks. Each one is associated a score
	const chunkAxisScores = [
		{count: 1, axisScore: divideStroke(stroke)(1), score: sumBy(divideStroke(stroke)(1), "score")},
		{count: 2, axisScore: divideStroke(stroke)(2), score: sumBy(divideStroke(stroke)(2), "score")},
		{count: 3, axisScore: divideStroke(stroke)(3), score: sumBy(divideStroke(stroke)(3), "score")},
		{count: 4, axisScore: divideStroke(stroke)(4), score: sumBy(divideStroke(stroke)(4), "score")},
	];

	// Concatenate the chunk axes
	const pattern = sum(map(maxBy(chunkAxisScores, "score").axisScore, "axis"));

	console.log(pattern, shapePatterns[pattern]);
	return shapePatterns[pattern] || "";
};
