import { pipeline } from 'node:stream';
import Vinyl from 'vinyl';
import bl from 'bl';
import fromCallback from 'p-from-callback';

const noop = () => {}; // TODO: remove and replace with node:stream/promises (node>=16)
const { isVinyl } = Vinyl; // TODO: Use named imports when available
export default (file, enc) => (!isVinyl(file) // eslint-disable-line no-nested-ternary
  ? Promise.reject(new TypeError('First argument must be a Vinyl file'))
  : file.isBuffer() // eslint-disable-line no-nested-ternary
    ? Promise.resolve(file.contents.toString(enc))
    : file.isStream()
      ? fromCallback((cb) => pipeline(file.contents, bl(cb), noop)).then((buf) => buf.toString(enc))
      : Promise.resolve());
