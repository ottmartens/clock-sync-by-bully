## Bully election algorithm + clock syncing
---

### Prerequisites

- NodeJS >= 12.0

run `npm install`

### Start

`npm start input.txt`

Wait for the bootstrapping process to finish. After that, commands can be executed.

### Debugging

The process by default does proper cleanup and stops all started processes.

If something goes horribly wrong, then some processes might be left running. use `pkill node` or some equivalent to kill all running nodejs processes.
