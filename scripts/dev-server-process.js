const { enable, disable, green, red } = require('colors');
const { spawn } = require('child_process');

enable();

let devServerProces;

function startDevServerWatchMode() {
  if (devServerProces) return;

  console.log(green('[SERVER]: Setting up dev server'));

  try {
    devServerProces = spawn('node', ['--watch', './dist/server.js']);

    devServerProces.stdout.on('data', data => {
      console.log(green(`[SERVER]: ${data.toString()}`));
    });

    devServerProces.stderr.on('data', (data) => {
      console.log(`[SERVER]: ${red(data.toString())}`);
    });

    return devServerProces;
  } catch (err) {
    console.error(red(err));
  }
}

module.exports = {
  startDevServerWatchMode,
}
