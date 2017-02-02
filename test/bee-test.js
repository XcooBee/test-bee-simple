"use strict";

const assert = require("assert");
const BeeTest = require("bee-test-utility");

describe("Testing the simple bee", () => {
    it("Should succeed", (done) => {
        const args = [
            "",
            "path-to-script",
            "./input.txt",
        ];

        const callback = (err, result) => {
            try {
                assert.equal(result, "Success");
                done();
            } catch (assertionErr) {
                done(assertionErr);
            }
        };

        BeeTest.runTest(args, callback);
    });
});
