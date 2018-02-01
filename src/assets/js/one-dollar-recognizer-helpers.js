const NumPoints = 64;

export const Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio

// Point class
export function Point (x, y) {
	this.X = x;
	this.Y = y;
}

// Rectangle class
export function Rectangle (x, y, width, height) {
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}

// Unistroke class: a unistroke template
export function Unistroke (name, points) {
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	const radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleTo(this.Points, SquareSize);
	this.Points = TranslateTo(this.Points, Origin);
	this.Vector = Vectorize(this.Points); // For Protractor
}

// Result class
export function Result (name, score) {
	this.Name = name;
	this.Score = score;
}

export const degToRad = (deg) => (deg * Math.PI / 180.0);

export const Resample = (points, n) => {
	const I = PathLength(points) / (n - 1); // Interval length
	let D = 0.0;
	let newPoints = new Array(points[0]);

	for (let i = 1; i < points.length; i++) {
		let d = Distance(points[i - 1], points[i]);
		if ((D + d) >= I) {
			const qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
			const qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
			const q = new Point(qx, qy);
			newPoints[newPoints.length] = q; // Append new point 'q'
			points.splice(i, 0, q); // Insert 'q' at position i in points s.t. 'q' will be the next i
			D = 0.0;
		}
		else D += d;
	}

	// Sometimes we fall a rounding-error short of adding the last point, so add it if so
	if (newPoints.length === n - 1) {
		newPoints[newPoints.length] = new Point(
			points[points.length - 1].X,
			points[points.length - 1].Y
		);
	}

	return newPoints;
};

function IndicativeAngle (points) {
	const c = Centroid(points);
	return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}

// Rotates points around centroid
function RotateBy (points, radians) {
	const c = Centroid(points);
	const cos = Math.cos(radians);
	const sin = Math.sin(radians);
	let newPoints = new Array();

	for (let i = 0; i < points.length; i++) {
		const qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X;
		const qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
		newPoints[newPoints.length] = new Point(qx, qy);
	}

	return newPoints;
}

// Non-uniform scale; assumes 2D gestures (i.e., no lines)
function ScaleTo (points, size) {
	const B = BoundingBox(points);
	let newPoints = new Array();

	for (let i = 0; i < points.length; i++) {
		const qx = points[i].X * (size / B.Width);
		const qy = points[i].Y * (size / B.Height);
		newPoints[newPoints.length] = new Point(qx, qy);
	}

	return newPoints;
}

// Translates points' centroid
function TranslateTo (points, pt) {
	let c = Centroid (points);
	let newPoints = new Array();

	for (let i = 0; i < points.length; i++) {
		let qx = points[i].X + pt.X - c.X;
		let qy = points[i].Y + pt.Y - c.Y;
		newPoints[newPoints.length] = new Point(qx, qy);
	}

	return newPoints;
}

// For Protractor
function Vectorize (points) {
	let sum = 0.0;
	let vector = new Array();

	for (let i = 0; i < points.length; i++) {
		vector.push(points[i].X);
		vector.push(points[i].Y);
		sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
	}
	const magnitude = Math.sqrt(sum);

	for (let i = 0; i < vector.length; i++)
		vector[i] /= magnitude;

	return vector;
}

// For Protractor
export const OptimalCosineDistance = (v1, v2) => {
	let a = 0.0;
	let b = 0.0;

	for (let i = 0; i < v1.length; i += 2) {
		a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
		b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
	}

	const angle = Math.atan(b / a);
	return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
};

export const DistanceAtBestAngle = (points, T, a, b, threshold) => {
	let x1 = Phi * a + (1.0 - Phi) * b;
	let f1 = DistanceAtAngle(points, T, x1);
	let x2 = (1.0 - Phi) * a + Phi * b;
	let f2 = DistanceAtAngle(points, T, x2);

	while (Math.abs(b - a) > threshold) {
		if (f1 < f2) {
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = Phi * a + (1.0 - Phi) * b;
			f1 = DistanceAtAngle(points, T, x1);
		} else {
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - Phi) * a + Phi * b;
			f2 = DistanceAtAngle(points, T, x2);
		}
	}

	return Math.min(f1, f2);
};

function DistanceAtAngle (points, T, radians) {
	const newPoints = RotateBy(points, radians);
	return PathDistance(newPoints, T.Points);
}

function Centroid (points) {
	let x = 0.0;
	let y = 0.0;

	for (let i = 0; i < points.length; i++) {
		x += points[i].X;
		y += points[i].Y;
	}

	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}

function BoundingBox (points) {
	let minX = +Infinity;
	let maxX = -Infinity;
	let minY = +Infinity;
	let maxY = -Infinity;

	for (let i = 0; i < points.length; i++) {
		minX = Math.min(minX, points[i].X);
		minY = Math.min(minY, points[i].Y);
		maxX = Math.max(maxX, points[i].X);
		maxY = Math.max(maxY, points[i].Y);
	}

	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}

function PathDistance (pts1, pts2) {
	let d = 0.0;
	for (let i = 0; i < pts1.length; i++) // Assumes pts1.length === pts2.length
		d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}

function PathLength (points) {
	let d = 0.0;
	for (let i = 1; i < points.length; i++)
		d += Distance(points[i - 1], points[i]);
	return d;
}

function Distance (p1, p2) {
	const dx = p2.X - p1.X;
	const dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}
