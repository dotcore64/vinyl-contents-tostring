// import { isVinyl } from 'vinyl';
import Vinyl from 'vinyl'; // TODO: Use named imports when available
import streamToString from 'stream-to-string';

const { isVinyl } = Vinyl;

export default (file, enc) => (!isVinyl(file) // eslint-disable-line no-nested-ternary
  ? Promise.reject(new TypeError('First argument must be a Vinyl file'))
  : file.isBuffer() // eslint-disable-line no-nested-ternary
    ? Promise.resolve(file.contents.toString(enc))
    : file.isStream()
      ? streamToString(file.contents, enc)
      : Promise.resolve());
