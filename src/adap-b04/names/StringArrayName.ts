import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { get } from "http";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    // @methodtype initialization-method
    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        for(let i = 0; i < source.length; i++) {
            this.assertCorrectEscapedString(source[i]);
        }
        this.components = source;
        this.assertCorrectEscapedName();
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        IllegalArgumentException.assertIsNotNullOrUndefined(i);
        this.assertValidComponentNumber(i);
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(i);
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(i);

        this.components[i] = c;

        this.assertCorrectEscapedName();
        this.assertComponentAtPostition(c, i);
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(i);
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(i, true);

        this.components.splice(i, 0, c);

        this.assertCorrectEscapedName();
        this.assertComponentAtPostition(c, i);
        this.assertComponentsLengthEqualsNumberOfComponents();
    }

    // @methodtype command-method
    public append(c: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);

        this.components.push(c);

        this.assertCorrectEscapedName();
        this.assertComponentAtPostition(c, this.getNoComponents() - 1);
        this.assertComponentsLengthEqualsNumberOfComponents();
    }

    // @methodtype command-method
    public remove(i: number): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(i);
        this.assertValidComponentNumber(i);

        this.components.splice(i, 1);

        this.assertComponentsLengthEqualsNumberOfComponents();
    }

    // @methodtype helper-method
    private assertValidComponentNumber(i: number, insert: boolean = false): void {
        if(insert){
            if(i < 0 || i > this.components.length) {
                throw new IllegalArgumentException("Index: " + i + " out of bounds for length " + this.components.length);
            }
        }else{
            if(i < 0 || i >= this.components.length) {
               throw new IllegalArgumentException("Index: " + i + " out of bounds for length " + this.components.length);
            }
        }
    }

    private assertComponentsLengthEqualsNumberOfComponents(): void {
        if(this.components.length !== this.getNoComponents()) {
            throw new MethodFailedException("Components length does not match number of components");
        }
    }



}