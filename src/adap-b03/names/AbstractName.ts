import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name{

    protected delimiter: string = DEFAULT_DELIMITER;
    protected regex: RegExp = new RegExp("(?<!\\\\)\\" + ".", 'g');

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter) {
            this.delimiter = delimiter;
        }
        this.regex = new RegExp("(?<!\\\\)\\" + this.delimiter, 'g');
    }

    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        for(let i = 0; i < this.getNoComponents(); i++) {
            //result += this.getComponent(i).replace(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
            let a = this.getComponent(i);
            let b = a.replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
            result += b;
            if(i < this.getNoComponents() - 1) {
                result += delimiter;
            }
        }
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let result = "";
        for(let i = 0; i < this.getNoComponents(); i++) {
            result += this.getComponent(i).replace(this.regex, ESCAPE_CHARACTER + this.delimiter);
            if(i < this.getNoComponents() - 1) {
                result += this.delimiter;
            }
        }
        return result;
    }

    public isEqual(other: Name): boolean {
        return this.getHashCode() === other.getHashCode();
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for(let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        return Object.create(this);
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        if(this.delimiter !== other.getDelimiterCharacter()) {
            throw new Error("Can't concatenate names with different delimiters");
        }
        for(let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i).replace(this.regex, ESCAPE_CHARACTER + this.delimiter));
        }
    }

}