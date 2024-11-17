import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    // @methodtype initialization-method
    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        if(i < 0 || i >= this.components.length) {
            throw new Error("Index: " + i + " out of bounds for length " + this.components.length);
        }
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        if(i < 0 || i >= this.components.length) {
            throw new Error("Index: " + i + " out of bounds for length " + this.components.length);
        }
        this.components[i] = c;
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        if(i < 0 || i > this.components.length) {
            throw new Error("Index: " + i + " out of bounds for length " + this.components.length);
        }
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        if(i < 0 || i >= this.components.length) {
            throw new Error("Index: " + i + " out of bounds for length " + this.components.length);
        }
        this.components.splice(i, 1);
    }
}