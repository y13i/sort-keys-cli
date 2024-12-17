#!/usr/bin/env node
const { program } = require("commander");
const { load, dump } = require("js-yaml");
const { sortKeys } = require("@y13i/sort-keys");

const packageMetadata = require("../package.json");

program
  .name("sort-keys")
  .usage("[options]")
  .description(packageMetadata.description)
  .version(packageMetadata.version)
  .option("-d, --depth <number>", "how many times to recursively sort keys in a nested object or an array")
  .option("-k, --prioritize-keys <keys...>", "prioritize the given keys in sorting")
  .option("-p, --prioritize-primitives", "prioritize primitive values in sorting")
  .option("-o, --output <json|yaml>", "output format", "yaml")
  .parse();

const option = program.opts();

(async ()=>{
  const buffers = [];

  for await (const chunk of process.stdin) buffers.push(chunk);
  
  const inputString = Buffer.concat(buffers).toString();
  const data = load(inputString);

  const sortedData = sortKeys(data, {
    depth: option.depth ? Number.parseInt(option.depth) : undefined,

    prioritize: {
      keys: option.prioritizeKeys,
      primitives: option.prioritizePrimitives,
    },
  });

  const output = option.output === "json" ? JSON.stringify(sortedData) : dump(sortedData);

  process.stdout.write(output);
})();
