import Vinyl from 'vinyl';
import { BufferListStream } from 'bl';
import fromCallback from 'p-from-callback';

const { isVinyl } = Vinyl; // TODO: Use named imports when available
export default (file, enc) => (isVinyl(file)
  ? file.isBuffer()
    ? Promise.resolve(file.contents.toString(enc))
    : file.isStream()
      ? fromCallback(
        (cb) => file.contents.pipe(new BufferListStream(cb)),
      ).then((buf) => buf.toString(enc))
      : Promise.resolve()
  : Promise.reject(new TypeError('First argument must be a Vinyl file')));
