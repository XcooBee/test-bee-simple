"use strict";

module.exports.flight = (services, data, callback) => {
    const writeStream = services.writeStreamManager.getWriteStream("hello.txt", "output");
    const anotherWriteStream = services.writeStreamManager.getWriteStream("hello2.txt", "output");

    writeStream.on("finish", () => {
        services.mail("sender", "awesome-template", { favColor: "green" });
        callback(null, "Success");
    });

    writeStream.write("Hello World!", "utf8", () => {
        writeStream.end();
    });

    anotherWriteStream.write("This is another output", "utf8", () => {
        anotherWriteStream.end();
    });
};
