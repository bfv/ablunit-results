const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const xmljs = require('xml-js');

try {
    const filename = core.getInput('file');

    const exists = fs.existsSync(filename)
    console.log(`file '${filename}' found: ${exists}`);

    if (exists) {
        data = fs.readFileSync(filename);
        results = xmljs.xml2json(data, {compact: true, spaces: 4, alwaysArray: true});
        console.log(results);
    }

    core.setOutput('test-ok', true);
}
catch (error) {
    core.setFailed(error.message);
}
