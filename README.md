# sort-keys-cli

Sort keys of the given YAML/JSON via STDIN.

## Install

```sh
npm install -g sort-keys-cli
```

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

## Node.js Library

See [y13i/sort-keys](https://github.com/y13i/sort-keys).
