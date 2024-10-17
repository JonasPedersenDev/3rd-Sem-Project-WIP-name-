const { exec } = require('child_process');
const isWindows = process.platform === 'win32';

const command = isWindows ? 'cd backend && gradlew.bat bootRun' : 'cd backend && ./gradlew bootRun';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
