import readline from "node:readline/promises";
import fs from "node:fs";

export interface Location {
	x: number;
	y: number;
}

interface LocationMaps {
	[type: string]: Location[];
}

export async function run(input: string): Promise<number> {
	const [board, maxX, maxY] = await loadLocations(input);

	const locationSet = new Set();

	for (const locations of Object.values(board)) {
		for (let i = 0; i < locations.length - 1; i += 1) {
			for (let j = i + 1; j < locations.length; j += 1) {
				for (const item of findAntinode(
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

export async function loadLocations(
	file: string,
): Promise<[LocationMaps, number, number]> {
	const rl = readline.createInterface({
		input: fs.createReadStream(file),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	const locations: LocationMaps = {};
	let y = 0;
	let maxX = 0;

	for await (const line of rl) {
		line.split("").forEach((s, x) => {
			maxX = Math.max(x, maxX);
			if (s === ".") {
				return;
			}

			if (locations[s] == null) {
				locations[s] = [];
			}

			locations[s].push({ x, y });
		});

		y += 1;
	}

	return [locations, maxX, y - 1];
}

export function findAntinode(
	location1: Location,
	location2: Location,
	maxX: number,
	maxY: number,
): string[] {
	const locations = [location1, location2].sort(sortLocations);

	const xSlope = locations[1].x - locations[0].x;
	const ySlope = locations[1].y - locations[0].y;

	const leftSideAntinode: Location = {
		x: locations[0].x - xSlope,
		y: locations[0].y - ySlope,
	};
	const rightSideAnitnode: Location = {
		x: locations[1].x + xSlope,
		y: locations[1].y + ySlope,
	};

	const antiNodes: Location[] = [];

	return [leftSideAntinode, rightSideAnitnode]
		.filter((l) => isValidLocation(l, maxX, maxY))
		.map(locationToString);
}

export function isValidLocation(
	location: Location,
	maxX: number,
	maxY: number,
) {
	return (
		location.x >= 0 &&
		location.x <= maxX &&
		location.y >= 0 &&
		location.y <= maxY
	);
}

export function sortLocations(
	location1: Location,
	location2: Location,
): number {
	return location1.x - location2.x;
}

export function locationToString(location: Location): string {
	return `${location.x}|${location.y}`;
}
