import {
	execSync,
	ExecSyncOptions,
	ExecSyncOptionsWithBufferEncoding,
	ExecSyncOptionsWithStringEncoding,
} from 'child_process';
import { Log, LogContract } from 'ts-tiny-log';
import { LogLevel } from 'ts-tiny-log/levels';
import { join as pathJoin } from 'path';

/**
 * Raw options to be passed to execSync
 */
export type RawOptions =
	| ExecSyncOptions
	| ExecSyncOptionsWithStringEncoding
	| ExecSyncOptionsWithBufferEncoding;

/**
 * Global options for each CommandRunner instance
 */
export interface CommandRunnerOptions {
	/**
	 * Directory to run commands in
	 */
	dir?: string;

	/**
	 * Log instance
	 */
	log?: LogContract;

	/**
	 * Raw options for each command
	 */
	rawOptions?: RawOptions;

	/**
	 * Enable verbose logging
	 */
	verbose?: boolean;
}

/**
 * Allowed return values
 */
export type RunnableReturnValue = void | null | string | Buffer;

/**
 * Runnable command or function (synchronous)
 */
export type Runnable = string | (() => RunnableReturnValue);

/**
 * Runnable command or function (asynchronous)
 */
export type RunnableAsync = string | (() => Promise<RunnableReturnValue>);

/**
 * Run options
 */
export interface RunOptions {
	/**
	 * Relative directory to run the command (relative to )
	 */
	dir?: string;

	/**
	 * Loading description
	 */
	loadingDescription?: string;

	/**
	 * Finished loading description
	 */
	finishedDescription?: string;

	/**
	 * Raw options for execSync
	 */
	rawOptions?: RawOptions;

	/**
	 * Enable verbose logging?
	 */
	verbose?: boolean;
}

/**
 * Command Runner
 */
export class CommandRunner {
	/**
	 * Current working directory
	 */
	public dir: string = process.cwd();

	/**
	 * Logger
	 */
	public log: LogContract;

	/**
	 * Verbose logging?
	 */
	public verbose?: boolean = false;

	/**
	 * Raw options
	 */
	public rawOptions: RawOptions = {};

	/**
	 * Create a new command runner
	 *
	 * @param options (Optional) Command runner options
	 */
	public constructor(options: CommandRunnerOptions = {}) {
		if (options.dir) {
			this.dir = options.dir;
		}

		if (options.log) {
			this.setLog(options.log);
		}
		else if (options.verbose) {
			this.verbose = true;
			this.setLog();
		}
	}

	/**
	 * Setup the log
	 *
	 * @param log Log instance
	 */
	public setLog(log?: LogContract) {
		this.log =
			log ??
			new Log({
				level: this.verbose ? LogLevel.debug : LogLevel.info,
			});
	}

	/**
	 * Run a command synchronously
	 *
	 * @param cmd Runnable command/function
	 * @param options (Optional) Run options
	 */
	public run(cmd: Runnable, options: RunOptions = {}): void {
		if (!this.log) {
			this.setLog();
		}

		if (options.loadingDescription) {
			this.log.info(options.loadingDescription + '...');
		}

		const execOptions: ExecSyncOptions = {
			encoding: 'utf8',
			stdio: 'pipe',
			cwd: options.dir ? pathJoin(this.dir, options.dir) : this.dir,
			...this.rawOptions,
			...(options.rawOptions || {}),
		};

		try {
			let results;

			if (typeof cmd === 'string') {
				results = execSync(cmd, execOptions);
			}
			else {
				results = cmd();
			}

			if (
				(this.verbose || options.verbose) &&
				results !== undefined &&
				results !== null
			) {
				console.log(results);
			}

			if (options.finishedDescription) {
				this.log.info(options.finishedDescription);
			}
		}
		catch (e) {
			const description = 'Error ' + options.loadingDescription;
			this.log.error(description);

			const stdout = e?.stdout?.toString();

			if (stdout) {
				this.log.info(stdout);
			}

			const stderr = e?.stderr?.toString();

			if (stderr) {
				this.log.error(stderr);
			}

			throw new Error(description);
		}
	}

	/**
	 * Run a command asynchronously
	 *
	 * @param cmd Runnable command/function
	 * @param options (Optional) Run options
	 */
	public async runAsync(cmd: Runnable, options: RunOptions): Promise<void> {
		return new Promise((a, r) => {
			try {
				a(this.run(cmd, options));
			}
			catch (e) {
				r(e);
			}
		});
	}
}
