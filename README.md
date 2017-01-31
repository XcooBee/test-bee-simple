# test-bee-simple
## Description
This is a simple *bee* template, it includes the files needed to test and publish your bees.

## flight script
The bee includes the **test-utility** under the **flight** npm script, it's used as guideline to write and test bees
as they were run in XcooBee infrasctructure.

### Usage
`npm run-script flight <input-filepath> -- [--params <bee-parameters-filepath>]? [--out <output-dir-path>]? [--size [s|m|l]]?`

### Command args
The utility takes a variety of switches that customize the way the bee is run.

### --params <bee-parameters-filepath>
It sets the utility to take <bee-parameters-filepath> as the parameter file, must be a valid JSON file and might contain
two main nodes:
- integrations
    A JSON object that represents the app integrations the bee will need, it will be passed to the bee in the data.integrations object.

- bee_params
    A JSON object that represents the named parameters the bee will use, it will be passed to the bee in the data.parameters object.
    By default we will look for a file named `parameters.json` in the same directory. If this file is not there then the the test utility will pass an empty parameters container to the code for execution.

- flightprocessing
    This is the state container for the flightpath. When you use the `services.addParam()` method, a paramater pair (key, value) will be added to this object and included for downstream processing. Later bees can read the message placed here and include in their processing. This is the way to communicate between bees as the flightpath is flown. Your parameters will also be assigned a prefix based on the system name of your bee.
    

#### Sample parameters file
```
{
    "integrations" : {
        "facebook": "my-facebook-authtoken"
    },
    "bee_params": {
        "favoriteColor": "green",
        "age": 27
    },
    "flightprocessing": {
        "imagebee": {
            "color":"green"
        },
        "crunchbee": {
            "color": "yellow"
        }
    }    
}
```

### --out <output-dir-path>
The output directory in which all the files (WIP files and output files) will be written, it must exists as the utility
won't create it.
The default is the current directory of program.

### --size [s|m|l]
This switch, among other things, determines the time the bee got available to do it's work before it is shutdown.
The default is `m`

## Bee Life Cylce

Invokation, processing, destruction


## Services
Each bee when invoked will be passed a collection of services and a colleciton of data to conduct its operations.
