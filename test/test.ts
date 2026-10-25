"use strict";

// Line comment
/* Block comment */
/**
 * Shapes with inline styling examples.
 * @param radius - The radius of the circle.
 * @returns The computed area.
 */
import fs, { readFileSync as read, type PathLike } from "node:fs";
import * as path from "path";
import styled, { css, type CSSObject } from "styled-components";

const PI: number = 3.14159;
let counter: number = 0;
const hex: number = 0xff, binary: number = 0b1010, big: bigint = 12345678901234567890n, exp: number = 1.5e-3;
const nothing: undefined = undefined;
const flags: { enabled: boolean; disabled: boolean; empty: null } = { enabled: true, disabled: false, empty: null };
const names: string[] = ["a", "b", 'c "quoted"'];
const tuple: [string, number, boolean?] = ["id", 1, true];
const escaped: string = "tab\t newline\n unicode é hex \x41";
const template: string = `Area: ${PI * 2 ** 2} for ${flags.enabled ? "on" : "off"}`;
const pattern: RegExp = /^(?<user>[a-z]+)@(\w+)\.com$/gi;

class Shape {
    static count = 0;
    #secret = 42;
    public x?: number;
    public y?: number;

    constructor(public name: string, private readonly sides: number = 0) {
        Shape.count++;
    }

    get label(): string {
        return `Shape(${this.name}, ${this.sides})`;
    }

    set label(value: string) {
        this.name = value;
    }

    area(): number {
        throw new Error("Not implemented");
    }

    move(dx: number, dy: number): void {
        this.x = (this.x ?? 0) + dx;
        this.y = (this.y ?? 0) + dy;
    }

    static create(name: string): Shape {
        return new this(name);
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super("circle");
    }

    override area(): number {
        return PI * this.radius ** 2;
    }
}

function identity<T>(value: T): T {
    return value;
}

function* range(start: number, end: number, step: number = 1): Generator<number> {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}

async function load<T>(url: string, { retries = 3, ...options }: RequestInit & { retries?: number } = {}): Promise<T | undefined> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return (await response.json()) as T;
        } catch (error) {
            console.error((error as Error).message);
        } finally {
            counter += 1;
        }
    }
}

const double = (x: number): number => x * 2;
const compose = <T,>(...fns: Array<(value: T) => T>) => (value: T): T => fns.reduceRight((acc, fn) => fn(acc), value);
const [first, , third = 3, ...others]: (number | undefined)[] = [1, 2, undefined, 4, 5];
const { name: alias, nested: { deep } = { deep: 0 }, ...rest } = { name: "xenon", nested: { deep: 1 } };

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

const user: Record<string, unknown> = { id: 1, ["computed" + 1]: true, greet() { return "hi"; }, get age() { return 1; } };
delete user.id;

// Inline styling
const spacing: number = 24;
const buttonStyle: CSSObject = {
    color: "#22adf8",
    backgroundColor: "rgb(34 173 248 / 50%)",
    margin: "0 auto",
    padding: `${spacing}px calc(${spacing}px * 2)`,
    transition: "background-color 0.3s ease-in-out",
    ":hover": { background: "hsl(200deg 90% 55%)" },
};

interface ButtonProps {
    padding: number;
    active?: boolean;
}

const buttonCss = css<ButtonProps>`
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

const Button = styled.button<ButtonProps>`
    ${buttonCss}
    border-radius: 4px;
    font-family: "JetBrains Mono", monospace;
    width: calc(100% - ${spacing}px);
`;

const element = document.getElementById("root")!;
element.style.color = "#22adf8";
element.style.cssText = "color: #22adf8; margin: 0 auto; padding: 4px !important;";
element.style.setProperty("--primary-color", "rgb(34 173 248)");

export const VERSION: string = "1.0.0";
export default class App {}
export { Circle as RoundShape, double, identity, Button };
export * from "./other";

// TypeScript specific
type ID = string | number;
type Callback<T> = (error: Error | null, result?: T) => void;
type Readonly2<T> = { readonly [K in keyof T]: T[K] };
type ElementOf<T> = T extends (infer U)[] ? U : never;
type EventName = `on${Capitalize<"click" | "hover">}`;

interface Point {
    readonly x: number;
    y: number;
    label?: string;
    move(dx: number, dy: number): void;
    [key: string]: unknown;
}

interface Point3D extends Point {
    z: number;
}

enum Direction {
    Up = 1,
    Down,
    Left = "LEFT",
    Right = "RIGHT",
}

const enum Flags {
    None = 0,
    Read = 1 << 0,
    Write = 1 << 1,
}

declare const BUILD: string;
declare module "virtual-module" {
    export function helper(input: string): number;
}

namespace Geometry {
    export const ORIGIN: Point = { x: 0, y: 0, move() {} };
}

abstract class Base<T extends object = {}> implements Point {
    protected metadata?: T;
    public x = 0;
    public y = 0;

    abstract area(): number;

    move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    @log
    describe(): string {
        return `Base at ${this.x}, ${this.y}`;
    }
}

function log(_target: unknown, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value as (...args: unknown[]) => unknown;
    descriptor.value = function (...args: unknown[]) {
        console.log(`Calling ${key}`);
        return original.apply(this, args);
    };
    return descriptor;
}

function isCircle(shape: Shape): shape is Circle {
    return shape instanceof Circle;
}

function assertString(value: unknown): asserts value is string {
    if (typeof value !== "string") throw new TypeError("Expected string");
}

function overload(value: string): string;
function overload(value: number): number;
function overload(value: unknown): unknown {
    return value;
}

const config = { retries: 3, verbose: true } as const satisfies Record<string, number | boolean>;
const input = <HTMLInputElement>document.querySelector("input");
let unknownValue: unknown = 5;
let anything: any = {};
let sym: unique symbol;
let keys: keyof Point = "x";

export type { ID, Callback };
