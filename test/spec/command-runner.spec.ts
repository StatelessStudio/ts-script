import 'jasmine';
import { CommandRunner } from '../../src';

describe('Command runner', () => {
	it('can run commands', () => {
		const cmd = new CommandRunner({
			verbose: true,
		});
		cmd.run('echo "Hello"');
	});
});
