import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    protected regex: RegExp = new RegExp("(?<!\\\\)\\" + ".", 'g');

    // @methodtype initialization-method
    constructor(other: string, delimiter?: string) {
        if(delimiter !== undefined) {
            this.delimiter = delimiter;
        }
        this.regex = new RegExp("(?<!\\\\)\\" + this.delimiter, 'g');
        this.name = other;
        this.length = this.name.split(this.regex).length;
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        if(delimiter === this.delimiter) {
            return this.name.replace(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
        }else {
            return this.name.replace(this.regex, delimiter).replace(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
        }
    }

    // @methodtype conversion-method
    public asDataString(): string {
        return this.name;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.length === 0;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
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

    // @methodtype command-method
    public concat(other: Name): void {
        if(this.delimiter !== other.getDelimiterCharacter()) {
            throw new Error("Can't concatenate names with different delimiters");
        }
        const temp = this.getNoComponents() + other.getNoComponents();
        for(let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i).replace(this.regex, ESCAPE_CHARACTER + this.delimiter));
        }
        this.length = temp;
    }

}