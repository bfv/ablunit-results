# ablunit-results
This is a Github action, which in turn is ABLUnit result parser and display errors in a readable fashion.

# usage
```
- name: Check unit tests
  uses: bfv/ablunit-results@v0.1.0
  id: unit-tests
  with:
    file: <path>/results.xml
    fail-on-error: true
    errors-only: true
    debug: false
```

## parameters
| name  | required | default | description |
| --- | --- | --- | ---- | 
| file  | yes | | the filename of the `result.xml` of ABLUnittest  |
| fail-on-error | no | true | should this step fail when errors found |
| errors-only | no | true | should ony the errors in the action output |
| debug | no | false | should extra (debug) information be displayed |

## output
Assuming the step id has been set to `unit-tests` (see usage) the value of `test-ok` can be used like:
`${{ steps.unit-tests.outputs.test-ok }}`

# releases

| version  | change |
| --- | --- | 
| v0.1.0  | first version | 
