# test-bee-simple
## Description
This is a simple *bee* template, it includes the files needed to test and publish your bees.

## flight script
The bee includes the **test-utility** under the **flight** npm script, it's used as guideline to write and test bees
as they were run in XcooBee infrasctructure.

### Usage
`npm run-script <input-filepath> [--params <bee-parameters-filepath>]? [--out <output-dir-path>]? [--size [s|m|l]]?`

### Command args
The utility takes a variety of switches that customize the way the bee is run.

### --params <bee-parameters-filepath>
It sets the utility to take <bee-parameters-filepath> as the parameter file, must be a valid JSON file and might contain
two main nodes:
- integrations
    A JSON object that represents the app integrations the bee will need, it will be passed to the bee in the data.integrations object.

- bee_params
    A JSON object that represents the named parameters the bee will use, it will be passed to the bee in the data.parameters object.

#### Sample parameters file
```
{
    "integrations" : {
        "facebook": "my-facebook-authtoken"
    },
    "bee_params": {
        "favoriteColor": "green",
        "age": 27
    }
}
```

### --out <output-dir-path>
The output directory in which all the files (WIP files and output files) will be written, it must exists as the utility
won't create it.

### --size [s|m|l]
This switch, among other things, determines the time the bee got available to do it's work before it is shutdown