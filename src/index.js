const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    const filename = core.getInput('file');
    console.log(`attempt to parse: ${filename}`);

    const exists = fs.existsSync(filename)

    console.log(`file '${filename}' found: ${exists}`);

    core.setOutput('test-ok', true);
}
catch (error) {
    core.setFailed(error.message);
}
