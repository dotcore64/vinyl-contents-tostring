// import { isVinyl } from 'vinyl';
import Vinyl from 'vinyl'; // TODO: Use named imports when available
import { pipeline } from 'node:stream/promises';
import bl from 'bl';

const { isVinyl } = Vinyl;
const fromCallback = (fn) => new Promise(
  (resolve, reject) => { fn((err, res) => (err ? reject(err) : resolve(res))); },
);

export default (file, enc) => (!isVinyl(file) // eslint-disable-line no-nested-ternary
  ? Promise.reject(new TypeError('First argument must be a Vinyl file'))
  : file.isBuffer() // eslint-disable-line no-nested-ternary
    ? Promise.resolve(file.contents.toString(enc))
    : file.isStream()
      : Promise.resolve(''));
      ? fromCallback((cb) => pipeline(file.contents, bl(cb))).then((buf) => buf.toString(enc))
