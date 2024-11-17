import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    // @methodtype initialization-method
    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = this.name.split(this.regex).length;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.length;
    }

    // @methodtype get-method
    public getComponent(x: number): string {
        if(x < 0 || x >= this.length) {
            throw new Error("Index: " + x + " out of bounds for length " + this.length);
        }
        return this.name.split(this.regex)[x];
    }

    // @methodtype set-method
    public setComponent(n: number, c: string): void {
        if(n < 0 || n >= this.length) {
            throw new Error("Index: " + n + " out of bounds for length " + this.length);
        }
        const nameArray = this.name.split(this.regex);
        nameArray[n] = c.replace(this.regex, ESCAPE_CHARACTER + this.delimiter);
        this.name = nameArray.join(this.delimiter);
    }

    // @methodtype command-method
    public insert(n: number, c: string): void {
        if(n < 0 || n > this.length) {
            throw new Error("Index: " + n + " out of bounds for length " + this.length);
        }
        const nameArray = this.name.split(this.regex);
        nameArray.splice(n, 0, c.replace(this.regex, ESCAPE_CHARACTER + this.delimiter));
        this.name = nameArray.join(this.delimiter);
        this.length++;
    }

    // @methodtype command-method
    public append(c: string): void {
        this.name += this.delimiter + c.replace(this.regex, ESCAPE_CHARACTER + this.delimiter);
        this.length++;
    }

    // @methodtype command-method
    public remove(n: number): void {
        if(n < 0 || n >= this.length) {
            throw new Error("Index: " + n + " out of bounds for length " + this.length);
        }
        const nameArray = this.name.split(this.regex);
        nameArray.splice(n, 1);
        this.name = nameArray.join(this.delimiter);
        this.length--;
    }
}