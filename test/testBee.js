"use strict";

const sinon = require("sinon");
const assert = require("assert");
const bee = require("..");

describe("Testing sample bee", () => {
    it("Should call log services once", () => {
        const spy = sinon.spy();
        const callback = () => {
            assert.ok(spy.calledOnce);
            assert.ok(spy.calledWith("Look at me, I'm buzzing", "info"));
        };

        const services = {
            log: spy,
        };
        bee.flight(services, {}, callback);
    });
});
