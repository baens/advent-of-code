import {
	isValidLocation,
	loadLocations,
	type Location,
	locationToString,
	sortLocations,
} from "./part1";

export async function run(input: string): Promise<number> {
	const [board, maxX, maxY] = await loadLocations(input);

	const locationSet = new Set();

	for (const locations of Object.values(board)) {
		for (let i = 0; i < locations.length - 1; i += 1) {
			for (let j = i + 1; j < locations.length; j += 1) {
				for (const item of findAntinodePath(
					locations[i],
					locations[j],
					maxX,
					maxY,
				)) {
					locationSet.add(item);
				}
			}
		}
	}

	return locationSet.size;
}

export function findAntinodePath(
	location1: Location,
	location2: Location,
	maxX: number,
	maxY: number,
): string[] {
	const locations = [location1, location2].sort(sortLocations);

	const xSlope = locations[1].x - locations[0].x;
	const ySlope = locations[1].y - locations[0].y;

	const antiNodes: Location[] = [];

	let currentX = locations[0].x - xSlope;
	let currentY = locations[0].y - ySlope;

	while (isValidLocation({ x: currentX, y: currentY }, maxX, maxY)) {
		antiNodes.push({ x: currentX, y: currentY });
		currentX -= xSlope;
		currentY -= ySlope;
	}

	currentX = locations[1].x + xSlope;
	currentY = locations[1].y + ySlope;

	while (isValidLocation({ x: currentX, y: currentY }, maxX, maxY)) {
		antiNodes.push({ x: currentX, y: currentY });
		currentX += xSlope;
		currentY += ySlope;
	}

	return antiNodes.map(locationToString);
}
