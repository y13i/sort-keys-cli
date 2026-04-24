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
	.description("Sort keys of the given YAML/JSON via STDIN.")
	.version(version)
	.option(
		"-d, --depth <number>",
		"how many times to recursively sort keys in a nested object or an array",
	)
	.option(
		"-k, --prioritize-keys <keys...>",
		"prioritize the given keys in sorting",
	)
	.option(
		"-p, --prioritize-primitives",
		"prioritize primitive values in sorting",
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
