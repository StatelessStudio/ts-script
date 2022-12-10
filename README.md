# ts-script - Readme

Command runner for creating typescript scripts

## Installation

`npm i ts-script`

## Usage

```typescript
import { CommandRunner } from 'ts-script';

const cmd = new CommandRunner();

// Sync
cmd.run('echo "Hello!"');

// Async
cmd.runAsyc('echo "Hello!"')
	.
```

## Class Options

All options are optional.

**dir** - Specify a directory for each command to run in. Default is current working dir.

**log** - ts-tiny-log compatible log instance. Defaults to a basic instance

**rawOptions** - Raw options to pass along to execSync. See https://nodejs.org/api/child_process.html#child_processexecsynccommand-options

**verbose** - Enable verbose logging. Defaults to false

## Run Options

**dir** - Specify a directory for this command to run in. Should be a relative directory based on class dir

**loadingDescription** - Output text before command starts, (e.g. "Initializing Rocket Ship")

**finishedDescription** - Output text after command runs successfully (e.g. "Rocket Ship Initialized")

**rawOptions** - Raw options to pass along to execSync. See https://nodejs.org/api/child_process.html#child_processexecsynccommand-options

**verbose** - Enable verbose logging. Defaults to false
