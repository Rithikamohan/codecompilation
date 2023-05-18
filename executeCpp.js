const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = ([filepath, inputFilePath]) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
     console.log(" input file path",inputFilePath);
    console.log("file path",filepath);
    return new Promise((resolve, reject) => {
        exec(
            `gcc  ${filepath} -o ${outPath} && cd ${outputPath} && ${jobId}.out < ${inputFilePath}`,
            (error, stdout, stderr) => {
                if (error) reject({ error, stderr });
                if (stderr) reject({ stderr });
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};
