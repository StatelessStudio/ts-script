import { execSync } from 'child_process';
import { log } from './log';

export function run(
	cmd: string,
	loadingDescription: string,
	finishedDescription: string
): void {
	log.info(loadingDescription + '...');

	try {
		const results = execSync(cmd);
		log.info(finishedDescription, results.toString());
	}
	catch (e) {
		log.error('Error ' + loadingDescription + '\n', e.output.toString());

		throw e;
	}
}
