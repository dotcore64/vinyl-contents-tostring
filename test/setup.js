import { use } from 'chai';

// Hopefully eslint-plugin-node gets updated soon
// eslint-disable-next-line max-len
// eslint-disable-next-line node/no-unsupported-features/es-syntax,unicorn/no-await-expression-member
use((await import('chai-as-promised')).default);
