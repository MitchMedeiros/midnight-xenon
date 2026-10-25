#!/usr/bin/env node
"use strict";

// Line comment
/* Block comment */
/**
 * Computes the area of a circle.
 * @param {number} radius - The radius of the circle.
 * @returns {number} The computed area.
 */
import fs, { readFileSync as read } from "node:fs";
import * as path from "path";
import("./lazy.js").then((mod) => mod.default());

const PI = 3.14159;
let counter = 0;
var legacy = null;
const hex = 0xff, octal = 0o17, binary = 0b1010, big = 12345678901234567890n, exp = 1.5e-3;
const nothing = undefined;
const flags = { enabled: true, disabled: false, nan: NaN, inf: Infinity };

const text = 'single "quoted"';
const escaped = "tab\t newline\n unicode é hex \x41";
const template = `Area: ${PI * 2 ** 2} for ${flags.enabled ? "on" : "off"}`;
const pattern = /^(?<user>[a-z]+)@(\w+)\.com$/gi;

class Shape {
    static count = 0;
    #secret = 42;

    constructor(name) {
        this.name = name;
        Shape.count++;
    }

    get label() {
        return `Shape(${this.name})`;
    }

    set label(value) {
        this.name = value;
    }

    area() {
        throw new Error("Not implemented");
    }

    static create(name) {
        return new this(name);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("circle");
        this.radius = radius;
    }

    area() {
        return PI * this.radius ** 2;
    }
}

function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}

async function fetchJson(url, { retries = 3, ...options } = {}) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(error.message);
        } finally {
            counter += 1;
        }
    }
}

const double = (x) => x * 2;
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const [first, , third = 3, ...others] = [1, 2, undefined, 4, 5];
const { name: alias, nested: { deep } = {}, ...rest } = { name: "xenon", nested: { deep: 1 } };

label: for (const [key, value] of Object.entries(flags)) {
    if (typeof value === "boolean" && value) {
        continue label;
    } else if (value instanceof Object) {
        break label;
    }

    switch (key) {
        case "nan":
            console.log(value ?? "none");
            break;
        default:
            console.log(value?.toString());
    }
}

while (counter < 3) counter++;
do { counter--; } while (counter > 0);

const user = { id: 1, ["computed" + 1]: true, greet() { return "hi"; }, get age() { return 1; } };
delete user.id;
void 0;

export const VERSION = "1.0.0";
export default class App {}
export { Circle as RoundShape, double };
export * from "./other.js";

process.on("exit", () => console.log(`done ${new Date().getFullYear()}`));
