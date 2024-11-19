import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name{

    protected delimiter: string = DEFAULT_DELIMITER;
    protected regex: RegExp = new RegExp("(?<!\\\\)\\" + ".", 'g');

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertLegalDelimiter(delimiter);
        if (delimiter) {
            this.delimiter = delimiter;
        }
        this.regex = new RegExp("(?<!\\\\)\\" + this.delimiter, 'g');
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertLegalDelimiter(delimiter);
        this.assertCorrectEscapedName();
        let result = "";
        for(let i = 0; i < this.getNoComponents(); i++) {
            result += this.getComponent(i).replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
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
        this.assertCorrectEscapedName();
        let result = "";
        for(let i = 0; i < this.getNoComponents(); i++) {
            result += this.getComponent(i).replaceAll(this.regex, ESCAPE_CHARACTER + this.delimiter);
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
        this.assertCorrectEscapedName();
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
        IllegalArgumentException.assertIsNotNullOrUndefined(other);
        if(this.delimiter !== other.getDelimiterCharacter()) {
            throw new IllegalArgumentException("Can't concatenate names with different delimiters");
        }
        let length = this.getNoComponents() + other.getNoComponents();
        for(let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i).replaceAll(this.regex, ESCAPE_CHARACTER + this.delimiter));
        }
        this.assertCorrectEscapedName();
        if(this.getNoComponents() !== length) {
            throw new MethodFailedException("Concatenation failed");
        }
    }


    //helper methods
    protected assertLegalDelimiter(delimiter: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(delimiter);
        if(delimiter.length !== 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
    }

    protected assertCorrectEscapedString(s: string): void {
        if(s.match(this.regex)) {
            throw new IllegalArgumentException("String contains unescaped delimiter character");
        }
    }

    protected assertCorrectEscapedName(): void {
        for(let i = 0; i < this.getNoComponents(); i++) {
            try {
                this.assertCorrectEscapedString(this.getComponent(i));
            } catch(e) {
                throw new InvalidStateException("Name component " + i + " is not properly masked");
            }
        }
    }

    protected assertComponentAtPostition(component: string, position: number): void {
        if(this.getComponent(position) !== component) {
            throw new MethodFailedException("Expected component " + component + " at position " + position);
        }
    }
}