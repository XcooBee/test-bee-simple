"use strict";

const fs = require("fs");

let parametersFilePath = "parameters.json";
let outputPath = "./output";

// Track the number of open write streams
const streamArray = [];

const argv = process.argv;

let callbackCalled = false;

const closeStreams = () => {
    streamArray.forEach((value) => {
        value.close();
    });
};

// Assume we are on the node project directory
// unless otherwise specified by the --bee switch
let beeModule = null;
try {
    const beeIndex = argv.indexOf("--bee");
    if (beeIndex !== -1) {
        beeModule = require(argv[beeIndex + 1]);
    } else {
        beeModule = require(".");
    }
} catch (err) {
    console.log("It was not possible to load the bee, make sure you are inside a valid node project or use the '--bee' switch");
    process.exit(1);
}

// If no params are provided we assume the bee won't require integrations
// nor parameters, unless the '--params' flag is used in which case it is, probably,
// an user error pointing to an unexistent file
const paramsIndex = argv.indexOf("--params");
if (paramsIndex !== -1) {
    parametersFilePath = argv[paramsIndex + 1];

    if (!fs.existsSync(parametersFilePath)) {
        console.log(`${parametersFilePath} doesn't exist`);
        process.exit(1);
    }
}

// If the user specifies the output as a directory, use a default file name 'output' with no extension
// TODO: let the user specify the specific file
const outputIndex = argv.indexOf("--out");
if (outputIndex !== -1) {
    outputPath = argv[outputIndex + 1];
}

// The input file must be the first argument
const inputFilePath = argv[2];

if (!fs.existsSync(inputFilePath)) {
    console.log(`Input file '${inputFilePath}' doesn't exist`);
    process.exit(1);
}

// Create the services object
const services = {
    // Just log a message to the system console
    log: (message, type) => {
        const chunk = `${Date.now()},${type},${message}\n`;
        console.log(chunk);
    },
    // email service to mock the sending of an email
    email: () => {
        // TODO: What do in here? Log something? Do Nothing?
    },
    addParam: (key, value) => {
        console.log(`${key} => ${value} added to the next bee`);
    },
    // The default streams for reading and writing
    readStream: fs.createReadStream(inputFilePath),
    writeStream: fs.createWriteStream(`${outputPath}`),
    // TODO: Create the stream manager
    writeStreamManager: () => ({
        getWriteStream: (fileName, type) => {
            const typePath = type === "workFiles" ? workFilesPath : outputPath;
            const nextStreamId = streamArray.length;
            const stream = fs.createWriteStream(`./wip_${nextStreamId}`);
            streamArray.push(stream);
            return stream;
        },
    }),
};

const data = {
    // Mock data just for testing purposes
    user_data: {
        first_name: "John",
        last_name: "Testerson",
        xcoobee_id: "~johnt",
    },
};

let parametersContent = null;

if (fs.existsSync(parametersFilePath)) {
    try {
        parametersContent = JSON.parse(fs.readFileSync(parametersFilePath, "utf8"));
        data.integrations = parametersContent.integrations;
        data.parameters = parametersContent.bee_params;
    } catch (err) {
        console.log(`${parametersFilePath} is not a valid JSON file`);
        process.exit(1);
    }
}


const beeCallback = (err, result) => {
    console.log(err);
    console.log(result);
    closeStreams();
    process.exit(0);
};

setTimeout(() => {
    if (!callbackCalled) {
        console.log("Timed-out");
        closeStreams();
        process.exit(1);
    }
}, 5000);

beeModule.flight(services, data, beeCallback);
