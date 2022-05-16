import { PassThrough } from 'stream';
import File from 'vinyl';
import { expect } from 'chai';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved,node/no-missing-import
import vinylToString from 'vinyl-contents-tostring';

describe('vinyl-contents-tostring', () => {
  describe('in streaming mode', () => {
    it('should return stream content', () => {
      // create the fake file
      const vinylFile = new File({
        path: 'foo',
        contents: new PassThrough(),
      });
      vinylFile.contents.end('test stream content');

      return expect(vinylToString(vinylFile)).become('test stream content');
    });

    it('should correctly use encoding', () => {
      // create the fake file
      const vinylFile = new File({
        path: 'bar',
        contents: new PassThrough(),
      });
      vinylFile.contents.end('this is a tést');

      return expect(vinylToString(vinylFile, 'ascii')).to.become('this is a tC)st');
    });
  });

  describe('in buffer mode', () => {
    it('should return buffer content', () => {
      // create the fake file
      const vinylFile = new File({
        path: 'bar',
        contents: Buffer.from('test buffer content'),
      });

      return expect(vinylToString(vinylFile)).become('test buffer content');
    });

    it('should correctly use encoding', () => {
      // create the fake file
      const vinylFile = new File({
        path: 'bar',
        contents: Buffer.from('this is a tést'),
      });

      return expect(vinylToString(vinylFile, 'ascii')).to.become('this is a tC)st');
    });
  });

  describe('misc tests', () => {
    it('should return an undefined', () => {
      const vinylFile = new File({ path: 'baz' });

      return expect(vinylToString(vinylFile)).become();
    });

    it('should throw a type error', () => (
      expect(vinylToString({})).to.be.rejectedWith(TypeError, /First argument must be a Vinyl file/)
    ));
  });
});
