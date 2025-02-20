const { spawn } = require("child_process");

function sendMessageToModel(message) {
  return new Promise((resolve, reject) => {
    // Spawn a new process every time
    const modelProcess = spawn(
      "ollama",
      ["run", "baraalsedih/llama_spark_teamp2-5"],
      {
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    let messageBuffer = "";

    modelProcess.stdout.on("data", (data) => {
      messageBuffer += data.toString();
    });

    // Filter out ANSI codes and empty outputs on stderr
    modelProcess.stderr.on("data", (data) => {
      const str = data.toString();
      const escapeRegex = /\x1b\[[0-9;]*[a-zA-Z]/g;
      const cleanString = str.replace(escapeRegex, "").trim();
      if (cleanString.length > 0) {
        // console.error(`Received error: ${cleanString}`);
      }
    });

    // Resolve or reject on process exit
    modelProcess.on("exit", (code) => {
      console.log(`Model process exited with code ${code}`);
      if (messageBuffer.trim().length > 0) {
        resolve(messageBuffer);
      } else {
        reject(new Error("Model did not return any output."));
      }
    });

    // Send message to model
    modelProcess.stdin.write(`${message}\n`);
    // Immediately end the input stream so the model knows to finish processing
    modelProcess.stdin.end();
  });
}

module.exports = {
  sendMessageToModel,
};
