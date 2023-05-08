# sort-keys-cli

[![npm version](https://badge.fury.io/js/@y13i%2Fsort-keys-cli.svg)](https://badge.fury.io/js/@y13i%2Fsort-keys-cli)

Sort keys of the given YAML/JSON via STDIN.

## Install

```sh
npm install -g @y13i/sort-keys-cli
```

[The container image](https://github.com/y13i/sort-keys-cli/pkgs/container/sort-keys-cli) is also available.

## Usage

```sh
Usage: sort-keys [options]

Sort keys of the given YAML/JSON.

Options:
  -V, --version                    output the version number
  -d, --depth <number>             how many times to recursively sort keys in a nested object or an array
  -k, --prioritize-keys <keys...>  prioritize the given keys in sorting
  -p, --prioritize-primitives      prioritize primitive values in sorting
  -o, --output <json|yaml>         output format (default: "yaml")
  -h, --help                       display help for command
```

## Example

```sh
echo '{"b": "foo", "a": "bar"}' | sort-keys
```

```sh
kubectl -n kube-system -o yaml get configmap kube-root-ca.crt | docker run --rm -i ghcr.io/y13i/sort-keys-cli:latest -k kind metadata name namespace labels annotations
```

## Node.js Library

See [y13i/sort-keys](https://github.com/y13i/sort-keys).
