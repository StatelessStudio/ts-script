import 'jasmine';
import * as index from '../../src';

describe('ts-script', () => {
	it('exports a', () => {
		expect(index.a).toBeTrue();
	});
});
