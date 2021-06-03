# @amjs/file-resolver

Resolve the file path of a `.js` file within a root or from its `node_modules` context.

## Installation

```bash
$ npm i --save @amjs/file-resolver
```

## API

```javacript
{String|null} resolver({{String} file, {String} ext, {String} context, {Boolean} silent})
```

## Examples

Given the following directory:

```bash
.
├── node_modules
│   ├── module
│   │   └── file.js
├── package.json
└── src
    ├── file.js
    └── folder
        └── file.js
```

- Resolve `src/file.js` file:

```javascript
const path = require('path');
const resolver = require('@amjs/file-resolver');

console.log(resolver({ file : path.join('src', 'file') })); // "path-to/src/file.js"
```

- Resolve `src/folder/file.js` file:

```javascript
const path = require('path');
const resolver = require('@amjs/file-resolver');

console.log(resolver({ file : path.join('src', 'folder', 'file') })); // "path-to/src/folder/file.js"
```

- Resolve `node_modules/module/file.js` file:

```javascript
const path = require('path');
const resolver = require('@amjs/file-resolver');

console.log(resolver({ file : 'file', ext : undefined, module : 'module' })); // "path-to/node_modules/module/file.js"
```
- Resolve `package.json` file:

```javascript
const path = require('path');
const resolver = require('@amjs/file-resolver');

console.log(resolver({ file : 'package', ext : '.json' })); // "path-to/package.json"
```

- Impossible to solve a file path:

```javascript
const path = require('path');
const resolver = require('@amjs/file-resolver');

console.log(resolver({ file : 'foo' }));
// [ERROR] Could not resolve: "foo.js"
// "null"
```

- Silent errors:

```javascript
const path = require('path');
const resolver = require('@amjs/file-resolver');

console.log(resolver({ file : 'foo', silent : true })); // "null"
```
