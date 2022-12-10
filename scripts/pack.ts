import { run } from './utils';

export default async function pack() {
	run('npm run script -- prep', 'Preparing', 'Prepared');
	run('npm pack ./dist/src', 'Packing', 'Packed');
}
