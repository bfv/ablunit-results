const core = require('@actions/core');
const github = require('@actions/github');

try {
    const filename = core.getInput('file');
    console.log(`attempt to parse: ${filename}`);

    const file = new File(filename);
    const exists = file.exists();

    console.log(`file '${filename}' found: ${exists}`);
    
    core.setOutput('test-ok', true);
}
catch (error) {
    core.setFailed(error.message);
}
