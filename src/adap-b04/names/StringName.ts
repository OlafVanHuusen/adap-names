import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    // @methodtype initialization-method
    constructor(other: string, delimiter?: string) {
        super(delimiter);
        IllegalArgumentException.assertIsNotNullOrUndefined(other);
        this.name = other;
        this.length = this.name.split(this.regex).length;
        this.assertCorrectEscapedName();
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.length;
    }

    // @methodtype get-method
    public getComponent(x: number): string {
        IllegalArgumentException.assertIsNotNullOrUndefined(x);
        this.assertValidComponentNumber(x);
        return this.name.split(this.regex)[x];
    }

    // @methodtype set-method
    public setComponent(n: number, c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(n);
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(n);

        const nameArray = this.name.split(this.regex);
        nameArray[n] = c.replaceAll(this.regex, ESCAPE_CHARACTER + this.delimiter);
        this.name = nameArray.join(this.delimiter);

        this.assertCorrectEscapedName();
        this.assertComponentAtPostition(c, n);
        this.assertLengthEqualsNumberOfComponents();
    }

    // @methodtype command-method
    public insert(n: number, c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(n);
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(n, true);

        const nameArray = this.name.split(this.regex);
        nameArray.splice(n, 0, c.replace(this.regex, ESCAPE_CHARACTER + this.delimiter));
        this.name = nameArray.join(this.delimiter);
        this.length++;

        this.assertCorrectEscapedName();
        this.assertComponentAtPostition(c, n);
        this.assertLengthEqualsNumberOfComponents();
    }

    // @methodtype command-method
    public append(c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);

        this.name += this.delimiter + c.replace(this.regex, ESCAPE_CHARACTER + this.delimiter);
        this.length++;

        this.assertCorrectEscapedName();
        this.assertLengthEqualsNumberOfComponents();
        this.assertComponentAtPostition(c, this.getNoComponents() - 1);
    }

    // @methodtype command-method
    public remove(n: number): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(n);
        this.assertValidComponentNumber(n);

        const nameArray = this.name.split(this.regex);
        nameArray.splice(n, 1);
        this.name = nameArray.join(this.delimiter);
        this.length--;

        this.assertCorrectEscapedName();
        this.assertLengthEqualsNumberOfComponents();
    }

    // @methodtype helper-method
    private assertValidComponentNumber(n: number, insert: boolean = false): void {
        if(insert){
            if(n < 0 || n > this.length) {
                throw new IllegalArgumentException("Index: " + n + " out of bounds for length " + this.length);
            }
        } else {
            if(n < 0 || n >= this.length) {
                throw new IllegalArgumentException("Index: " + n + " out of bounds for length " + this.length);
            }
        }
    }

    private assertLengthEqualsNumberOfComponents(): void {
        if(this.length !== this.getNoComponents()) {
            throw new MethodFailedException("Length of name does not match number of components");
        }
    }
}