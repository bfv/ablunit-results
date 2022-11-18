const core = require('@actions/core');
const github = require('@actions/github');

try {
    const file = core.getInput('file');
    console.log(`attempt to parse: ${file}`);
    core.setOutput('test-ok', true);
}
catch (error) {
    core.setFailed(error.message);
}
