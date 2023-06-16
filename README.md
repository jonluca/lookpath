# find-bin

[![npm version](https://badge.fury.io/js/find-bin.svg)](https://badge.fury.io/js/find-bin)
[![npm download](https://img.shields.io/npm/dt/find-bin.svg)](https://www.npmjs.com/package/find-bin)
[![Node.js CI](https://github.com/otiai10/find-bin/workflows/Node.js%20CI/badge.svg)](https://github.com/otiai10/find-bin/actions/)
[![CodeQL](https://github.com/otiai10/find-bin/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/otiai10/find-bin/actions/workflows/codeql-analysis.yml)
[![codecov](https://codecov.io/gh/otiai10/find-bin/branch/master/graph/badge.svg)](https://codecov.io/gh/otiai10/find-bin)
[![Maintainability](https://api.codeclimate.com/v1/badges/1cc9237695a7bd8e3d60/maintainability)](https://codeclimate.com/github/otiai10/find-bin/maintainability)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fotiai10%2Ffind-bin.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fotiai10%2Ffind-bin?ref=badge_shield)

To check if the command exists and where the executable file is, **WITHOUT** using `child_process`.

```
npm install find-bin
yarn add find-bin
```

# Example usage

```js
const { lookpath, lookpathSync } = require('lookpath');

const p = await lookpath('bash');
const pSync = lookpathSync('bash');
// "/bin/bash", otherwise "undefined"
```

# Advanced usage

```js
const p = await lookpath('bash', {
    include: ['/home/hiromu/.bin'],
    exclude: ['/mnt'],
});
// include: Do scan also under `~/.bin`
// exclude: Do NOT scan under `/mnt`
```

```js
const p = await lookpath('bash', {
    includeCommonPaths: true,
});
// includeCommonPaths: Will scan for bash in many common binary directories, not just those specified in PATH
```

```js
const p = await lookpath('bash', {
    findAll: true,
});
// ["/bin/bash"], an array containing all the bash binaries found in any path
// includeCommonPaths: Will scan for bash in many common binary directories, not just those specified in PATH
```

# Motivation

-   I don't want to spawn `child_process` in order to kick `which`, `where`, `whereis`, or `command -v`.
    -   [node.js - Node - check existence of command in path - Stack Overflow](https://stackoverflow.com/questions/34953168/node-check-existence-of-command-in-path/)
    -   [Node.js: Check if a command exists - Gist](https://gist.github.com/jmptable/7a3aa580efffdef50fa9f0dd3d068d6f)
    -   [mathisonian/command-exists: node module to check if a command-line command exists - GitHub](https://github.com/mathisonian/command-exists)
-   then I checked Go implementation of [`exec.LookPath`](https://golang.org/pkg/os/exec/#LookPath).
    -   [src/os/exec/lp_unix.go - The Go Programming Language](https://golang.org/src/os/exec/lp_unix.go?s=928:970#L24)
-   so I concluded that scanning under `$PATH` or `$Path` is the best straightforward way to check if the command exists.

