import { pipeline } from 'node:stream/promises';
import Vinyl from 'vinyl';
import bl from 'bl';
import fromCallback from 'p-from-callback';

const { isVinyl } = Vinyl; // TODO: Use named imports when available
export default (file, enc) => (!isVinyl(file) // eslint-disable-line no-nested-ternary
  ? Promise.reject(new TypeError('First argument must be a Vinyl file'))
  : file.isBuffer() // eslint-disable-line no-nested-ternary
    ? Promise.resolve(file.contents.toString(enc))
    : file.isStream()
      ? fromCallback((cb) => pipeline(file.contents, bl(cb))).then((buf) => buf.toString(enc))
      : Promise.resolve(''));
