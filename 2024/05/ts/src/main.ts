import { run as part1 } from "./part1";
import { run as part2 } from "./part2";

async function main() {
	console.log("part 1", await part1(process.argv[2]));
	console.log("part 1", await part2(process.argv[2]));
}

main();
