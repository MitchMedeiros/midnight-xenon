"use strict";

// Line comment
/* Block comment */
/**
 * Shapes with inline styling examples.
 * @param {number} radius - The radius of the circle.
 * @returns {number} The computed area.
 */
import fs, { readFileSync as read } from "node:fs";
import * as path from "path";
import styled, { css } from "styled-components";

const PI = 3.14159;
let counter = 0;
const hex = 0xff, binary = 0b1010, big = 12345678901234567890n, exp = 1.5e-3;
const nothing = undefined;
const flags = { enabled: true, disabled: false, empty: null };
const names = ["a", "b", 'c "quoted"'];
const tuple = ["id", 1, true];
const escaped = "tab\t newline\n unicode é hex \x41";
const template = `Area: ${PI * 2 ** 2} for ${flags.enabled ? "on" : "off"}`;
const pattern = /^(?<user>[a-z]+)@(\w+)\.com$/gi;

class Shape {
    static count = 0;
    #secret = 42;

    constructor(name, sides = 0) {
        this.name = name;
        this.sides = sides;
        Shape.count++;
    }

    get label() {
        return `Shape(${this.name}, ${this.sides})`;
    }

    set label(value) {
        this.name = value;
    }

    area() {
        throw new Error("Not implemented");
    }

    move(dx, dy) {
        this.x = (this.x ?? 0) + dx;
        this.y = (this.y ?? 0) + dy;
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

function identity(value) {
    return value;
}

function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}

async function load(url, { retries = 3, ...options } = {}) {
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
        case "empty":
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

// Inline styling
const spacing = 24;
const buttonStyle = {
    color: "#22adf8",
    backgroundColor: "rgb(34 173 248 / 50%)",
    margin: "0 auto",
    padding: `${spacing}px calc(${spacing}px * 2)`,
    transition: "background-color 0.3s ease-in-out",
    ":hover": { background: "hsl(200deg 90% 55%)" },
};

const buttonCss = css`
    /* Block comment */
    color: #22adf8;
    margin: 0 auto;
    padding: ${spacing}px calc(1.5rem * 2) !important;
    border: 1px solid rgba(34, 173, 248, 0.5);
    transition: background-color 0.3s ease-in-out;

    &:hover,
    &.is-active {
        background: lighten(#22adf8, 20%);
    }

    @media (min-width: 768px) and (prefers-color-scheme: dark) {
        padding: ${(props) => props.padding}px;
    }
`;

const Button = styled.button`
    ${buttonCss}
    border-radius: 4px;
    font-family: "JetBrains Mono", monospace;
    width: calc(100% - ${spacing}px);
`;

const element = document.getElementById("root");
element.style.color = "#22adf8";
element.style.cssText = "color: #22adf8; margin: 0 auto; padding: 4px !important;";
element.style.setProperty("--primary-color", "rgb(34 173 248)");

export const VERSION = "1.0.0";
export default class App {}
export { Circle as RoundShape, double, identity, Button };
export * from "./other.js";
