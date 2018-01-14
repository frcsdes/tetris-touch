// v_dash utils library - common lodash routines for vue.js
// François Desrichard - fdesrichard@enst.fr

import { concat, dropRight, fromPairs, map, takeRight, zip } from "lodash";

/**
 * Uncurried functional version of the and operator
 * @param a Predicate a
 * @param b Predicate b
 * @return a && b
 */
export const andFunc = (a, b) => a && b;

/**
 * Creates an object ready to register components from an array of modules
 * @param {Array} subComponents An array containing modules. These
 *                              must contain a `name` path, or have
 *                              a corresponding name in `names`
 * @param {Array} names Optional. An array containing the remaining names
 * @return {Object} A new object describing the components
 */
export const subs = (subComponents, names = []) =>
	fromPairs(
		map(
			concat(
				dropRight(subComponents, names.length),
				map(zip(takeRight(subComponents, names.length), names),
					([component, name]) => ({...component, name: name})
				)
			),
			(component) => ([component.name, component])
		)
	);

/**
 * Creates an object ready to register properties from a convenient format
 * @param {Array} An array of properties using the following format:
 *                ["required"|"optional", type, name, default]
 * @return {Object} A new object describing the properties
 */
export const props = (properties) =>
	fromPairs(
		map(properties,
			([required, type, name, _default]) =>
				_default
					? [name, {
						"type": type,
						"required": required === "required",
						"default": _default,
					}]
					: [name, {
						"type": type,
						"required": required === "required",
					}]
		)
	);

/**
 * Returns a new array based on `originalArray` without the item
 * at `id`, or `originalArray` if the index is out of range
 * @param {Array} originalArray The original array
 * @param {Number} id The id of the item to remove
 * @return {Array} A new array without the item at id
 */
export const removeId = (originalArray) => (id) =>
	(id >= 0) && (id < originalArray.length)
		? [...originalArray.slice(0, id),
		   ...originalArray.slice(id + 1, originalArray.length)]
		: originalArray;

/**
 * Checks if ancestor precedes child in the DOM tree
 * @param {Element} ancestor The presumed child
 * @param {Element} child The presumed ancestor
 * @return {Boolean} true if `ancestor` precedes `child` in the DOM tree,
 *                   false otherwise
 */
export const isAncestor = (ancestor) => (child) =>
	child
		? child === ancestor
			? true
			: isAncestor(ancestor)(child.parentElement)
		: false;
