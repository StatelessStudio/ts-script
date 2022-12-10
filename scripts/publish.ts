import { run } from './utils';

export default async function publish() {
	run('npm run script -- prep', 'Preparing', 'Prepared');
	run('npm publish dist/src', 'Publishing', 'Published');
}
