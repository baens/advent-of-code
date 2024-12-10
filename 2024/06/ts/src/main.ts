import { run } from "./part1";

async function main() {
	console.log(`Run 1: ${await run(process.argv[2])}`);
}

main();
