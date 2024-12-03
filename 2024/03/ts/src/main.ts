import { run } from "./part2";

async function main() {
	console.log("Resul", await run(process.argv[2]));
}

main();
