# vinyl-contents-tostring

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> Convert vinyl content into string

## Install

```
$ npm install vinyl-contents-tostring
```


## Usage

```js
const vfs = require('vinyl-fs');
const map = require('map-stream');
const asCallback = require('ascallback');
const vinylToString = require('vinyl-contents-tostring');

vfs.src(['./package.json'])
  .pipe(map(
    (file, cb) => asCallback(
      vinylToString(file).then(contents => console.log(contents)),
      cb,
    ),
  ));
```

## API

### vinylToString(file, enc)

Returns a promise to the contents of the vinyl file, regardless of stream or buffer files. Optionally, it accepts the encoding of the file

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/github/workflow/status/dotcore64/vinyl-contents-tostring/test/master?style=flat-square
[build]: https://github.com/dotcore64/vinyl-contents-tostring/actions

[npm-badge]: https://img.shields.io/npm/v/vinyl-contents-tostring.svg?style=flat-square
[npm]: https://www.npmjs.org/package/vinyl-contents-tostring

[coveralls-badge]: https://img.shields.io/coveralls/dotcore64/vinyl-contents-tostring/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/dotcore64/vinyl-contents-tostring

[dependency-status-badge]: https://david-dm.org/dotcore64/vinyl-contents-tostring.svg?style=flat-square
[dependency-status]: https://david-dm.org/dotcore64/vinyl-contents-tostring

[dev-dependency-status-badge]: https://david-dm.org/dotcore64/vinyl-contents-tostring/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/dotcore64/vinyl-contents-tostring#info=devDependencies
