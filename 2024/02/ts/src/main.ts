import { run } from "./part2";

async function main() {
	const file = process.argv[2];
	console.log("result", await run(file));
}

main();
