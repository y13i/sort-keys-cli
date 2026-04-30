# sort-keys-cli

[![npm version](https://badge.fury.io/js/@y13i%2Fsort-keys-cli.svg)](https://badge.fury.io/js/@y13i%2Fsort-keys-cli)

Sort YAML/JSON keys via STDIN.

## Install

```sh
npm install -g @y13i/sort-keys-cli
```

[The container image](https://github.com/y13i/sort-keys-cli/pkgs/container/sort-keys-cli) is also available.

## Usage

```sh
Usage: sort-keys [options]

Sort YAML/JSON keys via STDIN.

Options:
  -V, --version                    output the version number
  -d, --depth <number>             limits how many levels deep to recursively sort nested objects and arrays.
  -k, --prioritize-keys <keys...>  keys listed here are moved to the front, in the order given, before the remaining keys are sorted alphabetically.
  -p, --prioritize-primitives      keys with primitive values (numbers, strings, booleans, null, undefined) are sorted before keys with object or array values.
  -o, --output <json|yaml>         output format (default: "yaml")
  -h, --help                       display help for command
```

## Example

```sh
echo '{"b": "foo", "a": "bar"}' | sort-keys
```

```sh
cat something.json | npx @y13i/sort-keys-cli -o json | jq
```

```sh
kubectl -n kube-system -o yaml get configmap kube-root-ca.crt | docker run --rm -i ghcr.io/y13i/sort-keys-cli:latest -k apiVersion kind metadata name namespace labels annotations
```

## JavaScript Library

See [y13i/sort-keys](https://github.com/y13i/sort-keys).
