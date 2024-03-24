const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
//const xmljs = require('xml-js');
const parseString = require('xml2js').parseString;

try {
    var filename = core.getInput('file');
    console.log(`attempt to parse: ${filename}`);

    const exists = fs.existsSync(filename)
    if (!exists) {
        filename = ""
    }
    if (exists) {
        const data = fs.readFileSync(filename);
        parseString(data, function (err, results) {
            //console.dir(JSON.stringify(result));
            errorsFound = iterateOverResults(results);
            console.log('Done');
            if (errorsFound) {
                core.setFailed('Errors found in tests');
            } else {
                core.setOutput('test-ok', true);
            }
        });
    }

    core.setOutput('test-ok', true);
}
catch (error) {
    console.log(error);
    core.setFailed(error.message);
}

function iterateOverResults(results) {

    const testsuites = results.testsuites.testsuite;
    var errorsFound = false;

    testsuites.forEach(testsuite => {
        console.log(testsuite._attributes.classname); 
        const testcases = testsuite.testcase;
        testcases.forEach(testcase => {
            var str = testcase._attributes.name + "," + testcase._attributes.time.replace(",", ".") + "," + testcase.$.status; 
            if (testcase.failure) {
                str = "ERR:" + str + "," + testcase.failure[0]._attributes.message;
                errorsFound = true;
            }
            str = "  " + str;

            console.log(str);
       });
       return errorsFound;
    });

}