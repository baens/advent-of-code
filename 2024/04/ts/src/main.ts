import { run as run1 } from "./part1";
import { run as run2 } from "./part2";

async function main() {
	console.log("part 1", await run1("./input.txt"));
	console.log("part 2", await run2("./input.txt"));
}

main();
