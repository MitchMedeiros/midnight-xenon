// Line comment
/* Block comment */
/**
 * Represents a shape that can compute its area.
 * @template T - Metadata type attached to the shape.
 */
import type { EventEmitter } from "node:events";
import { readFileSync, type PathLike } from "node:fs";
import * as path from "path";

const PI: number = 3.14159;
let counter: number = 0;
const names: string[] = ["a", "b"];
const tuple: [string, number, boolean?] = ["id", 1];
const big: bigint = 10n;
const maybe: string | null | undefined = undefined;
const template: string = `Total: ${names.length + counter}`;
const pattern: RegExp = /^[a-z]+\d*$/i;

type ID = string | number;
type Callback<T> = (error: Error | null, result?: T) => void;
type Readonly2<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };
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

declare const VERSION: string;
declare module "virtual-module" {
    export function helper(input: string): number;
}

namespace Geometry {
    export const ORIGIN: Point = { x: 0, y: 0, move() {} };
}

abstract class Shape<T extends object = {}> implements Point {
    static count = 0;
    private readonly _id: ID;
    protected metadata?: T;
    public x = 0;
    public y = 0;

    constructor(public name: string, private readonly sides: number = 0) {
        this._id = ++Shape.count;
    }

    get id(): ID {
        return this._id;
    }

    abstract area(): number;

    move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    @log
    describe(): string {
        return `${this.name} (${this.sides} sides)`;
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

function identity<T>(value: T): T {
    return value;
}

function overload(value: string): string;
function overload(value: number): number;
function overload(value: unknown): unknown {
    return value;
}

async function load<T extends object>(url: string, parse: (raw: string) => T): Promise<T> {
    const response = await fetch(url);
    const body: string = await response.text();
    return parse(body) as T;
}

const config = { retries: 3, verbose: true } as const satisfies Record<string, number | boolean>;
const element = document.getElementById("root")!;
const input = <HTMLInputElement>document.querySelector("input");
const value = (input?.value ?? "") as string;
let unknownValue: unknown = 5;
let anything: any = {};
let nothing: never;
let fn: (a: number, b: number) => number = (a, b) => a + b;
let sym: unique symbol;
let keys: keyof Point = "x";

export type { ID, Callback };
export { Shape, Circle, Direction };
export default identity;
