const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
//const xmljs = require('xml-js');
const parseString = require('xml2js').parseString;

var errorsOnly;
var failOnError;
var debug;
try {
    var filename = core.getInput('file');
    errorsOnly = core.getInput('errors-only') == 'true';
    failOnError = core.getInput('fail-on-error') == 'true';
    debug = core.getInput('debug') == 'true';

    if (debug) {
        console.log(`filename: ${filename}`);
        console.log(`errors-only: ${errorsOnly}`);
        console.log(`fail-on-error: ${failOnError}`);
    }

    const exists = fs.existsSync(filename)
    if (!exists) {
        filename = ""
    }
    if (exists) {
        const data = fs.readFileSync(filename);
        parseString(data, function (err, results) {
            const errorsFound = iterateOverResults(results);
            if (errorsFound) {
                if (failOnError) {
                    core.setFailed('Errors found in unit tests');
                }                
                else {
                    console.log('Errors found in unittests');
                    core.setOutput('test-ok', false);
                }

            } else {
                core.setOutput('test-ok', true);
            }
        });
    }
}
catch (error) {
    console.log(error);
    core.setFailed(error.message);
}

function iterateOverResults(results) {

    const testsuites = results.testsuites.testsuite;
    var errorsFound = false;

    testsuites.forEach(testsuite => {

        console.log(testsuite.$.classname); 

        const testcases = testsuite.testcase;
        testcases.forEach(testcase => {
            var str = testcase.$.name + "," + testcase.$.time.replace(",", ".") + "," + testcase.$.status; 
            var hasError = false;
            if (testcase.$.status == 'Error') {
                str = "ERR:" + str + "," + testcase.error[0].$.message;
                errorsFound = true;
                hasError = true;
            }
            if (hasError || !errorsOnly || debug) {
                str = "  " + str;
                console.log(str);
            }
       });
    });

    console.log('Errors found: ' + errorsFound);
    if (errorsFound && !failOnError) {
        console.log('  fail-on-error is false');
    }
  
    return errorsFound;
}