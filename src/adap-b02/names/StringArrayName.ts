import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    // @methodtype initialization-method
    constructor(source: string[], delimiter?: string) {
        this.components = source;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        return this.components.map(x => x.replace(this.delimiter, ESCAPE_CHARACTER + this.delimiter)).join(this.delimiter);
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.components.length === 0; 
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
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

    // @methodtype command-method
    public concat(other: Name): void {
        if(this.delimiter !== other.getDelimiterCharacter()) {
            throw new Error("Can't concatenate names with different delimiters");
        }
        for(let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}