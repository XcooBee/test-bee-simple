"use strict";

module.exports.flight = (services, data, callback) => {
    // services.log("Look at me, I'm buzzing", "info");
    // services.log(`${data.user_data.first_name} ${data.user_data.last_name}`, "info");

    // let fileData = "";
    // services.readStream.on("data", (chunk) => {
    //     fileData += chunk;
    // });
    // services.readStream.on("end", () => {
    //     services.log(`${fileData}`, "info");
    //     callback(null, "Success");
    // });


    const writeStream = services.writeStreamManager().getWriteStream("hello.txt", "output");
    writeStream.on("finish", () => {
        services.mail("sender", "awesome-template", { favColor: "green" });
        callback(null, "Success");
    });
    writeStream.end();
    writeStream.write("Hello World!", "utf8", () => {
        writeStream.end();
    });
};
