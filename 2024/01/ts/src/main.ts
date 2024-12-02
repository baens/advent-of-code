import { run } from "./part2";

async function main() {
	const file = process.argv[2];

	console.log("file", file);

	const result = await run(file);
	console.log("result", result);
}

main();
