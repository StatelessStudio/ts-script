import 'jasmine';
import * as index from '../../src/command-runner';

describe('ts-script', () => {
	it('exports CommandRunner', () => {
		expect(index.CommandRunner).toBeDefined();
	});
});
