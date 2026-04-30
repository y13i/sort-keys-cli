#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { sortKeys } from "@y13i/sort-keys";
import { program } from "commander";
import { dump, load } from "js-yaml";

const { version } = JSON.parse(
	await readFile(new URL("../package.json", import.meta.url)),
);

program
	.name("sort-keys")
	.usage("[options]")
	.description("Sort YAML/JSON keys via STDIN.")
	.version(version)
	.option(
		"-d, --depth <number>",
		"limits how many levels deep to recursively sort nested objects and arrays.",
	)
	.option(
		"-k, --prioritize-keys <keys...>",
		"keys listed here are moved to the front, in the order given, before the remaining keys are sorted alphabetically.",
	)
	.option(
		"-p, --prioritize-primitives",
		"keys with primitive values (numbers, strings, booleans, null, undefined) are sorted before keys with object or array values.",
	)
	.option("-o, --output <json|yaml>", "output format", "yaml")
	.parse();

const option = program.opts();

const buffers = [];
for await (const chunk of process.stdin) buffers.push(chunk);

const inputString = Buffer.concat(buffers).toString();
const data = load(inputString);

const sortedData = sortKeys(data, {
	depth: option.depth ? Number.parseInt(option.depth, 10) : undefined,
	prioritize: {
		keys: option.prioritizeKeys,
		primitives: option.prioritizePrimitives,
	},
});

const output =
	option.output === "json" ? JSON.stringify(sortedData) : dump(sortedData);
process.stdout.write(output);
