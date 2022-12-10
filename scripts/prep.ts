import { run } from './utils';

export default async function prep() {
	run('npm i', 'Installing', 'Installed');
	run('npm run lint:prod', 'Linting', 'Linted');
	run('npm run build', 'Building', 'Built');
	run('npx ts-packager', 'Packaging', 'Packaged');
}
