import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    // @methodtype initialization-method
    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.assertIsNotNullOrUndefined(source);
        this.name = source;
        this.length = this.name.split(this.regex).length;
        this.assertCorrectEscapedName();
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    // @methodtype get-method
    public getComponent(x: number): string {
        this.assertIsNotNullOrUndefined(x);
        this.assertValidComponentNumber(x);
        return this.name.split(this.regex)[x];
    }

    // @methodtype set-method
    public setComponent(n: number, c: string): Name {
        this.assertIsNotNullOrUndefined(n);
        this.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(n);

        let nameArray = this.name.split(this.regex);
        nameArray[n] = c.replaceAll(this.regex, ESCAPE_CHARACTER + this.delimiter);
        let name = nameArray.join(this.delimiter);
        let retObj = new StringName(name, this.delimiter);

        retObj.assertCorrectEscapedName();
        retObj.assertComponentAtPostition(c, n);
        retObj.assertLengthEqualsNumberOfComponents();

        return retObj;
    }

    // @methodtype command-method
    public insert(n: number, c: string): Name {
        this.assertIsNotNullOrUndefined(n);
        this.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(n, true);

        let nameArray = this.name.split(this.regex);
        nameArray.splice(n, 0, c.replace(this.regex, ESCAPE_CHARACTER + this.delimiter));
        let name = nameArray.join(this.delimiter);
        let retObj = new StringName(name, this.delimiter);

        retObj.assertCorrectEscapedName();
        retObj.assertComponentAtPostition(c, n);
        retObj.assertLengthEqualsNumberOfComponents();

        return retObj;
    }

    // @methodtype command-method
    public append(c: string): Name {
        this.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);

        let name = this.name + this.delimiter + c.replace(this.regex, ESCAPE_CHARACTER + this.delimiter);
        let retObj = new StringName(name, this.delimiter);

        retObj.assertCorrectEscapedName();
        retObj.assertLengthEqualsNumberOfComponents();
        retObj.assertComponentAtPostition(c, this.getNoComponents() - 1);

        return retObj;
    }

    // @methodtype command-method
    public remove(n: number): Name {
        this.assertIsNotNullOrUndefined(n);
        this.assertValidComponentNumber(n);

        let nameArray = this.name.split(this.regex);
        nameArray.splice(n, 1);
        let name = nameArray.join(this.delimiter);
        let retObj = new StringName(name, this.delimiter);

        retObj.assertCorrectEscapedName();
        retObj.assertLengthEqualsNumberOfComponents();

        return retObj;
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