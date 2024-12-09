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
        this.assertIsNotNullOrUndefined(source);
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

    public clone(): Name {
        return new StringArrayName(this.components.map(x => x), this.delimiter);
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i);
        this.assertValidComponentNumber(i);
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): StringArrayName {
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(i);

        let retObj = new StringArrayName(this.components.map((x, index) => index === i ? c : x), this.delimiter);

        retObj.assertCorrectEscapedName();
        retObj.assertComponentAtPostition(c, i);

        return retObj;
    }

    // @methodtype command-method
    public insert(i: number, c: string): StringArrayName {
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);
        this.assertValidComponentNumber(i, true);

        let arr = this.components.map(x => x);
        arr.splice(i, 0, c);
        let retObj = new StringArrayName(arr, this.delimiter);

        retObj.assertCorrectEscapedName();
        retObj.assertComponentAtPostition(c, i);
        retObj.assertComponentsLengthEqualsNumberOfComponents();

        return retObj;
    }

    // @methodtype command-method
    public append(c: string): StringArrayName {
        this.assertIsNotNullOrUndefined(c);
        this.assertCorrectEscapedString(c);

        let arr = this.components.map(x => x);
        arr.push(c);
        let retObj = new StringArrayName(arr, this.delimiter);

        retObj.assertCorrectEscapedName();
        retObj.assertComponentAtPostition(c, retObj.getNoComponents() - 1);
        retObj.assertComponentsLengthEqualsNumberOfComponents();

        return retObj;
    }

    // @methodtype command-method
    public remove(i: number): StringArrayName {
        this.assertIsNotNullOrUndefined(i);
        this.assertValidComponentNumber(i);

        let arr = this.components.map(x => x);
        arr.splice(i, 1);
        let retObj = new StringArrayName(arr, this.delimiter);

        retObj.assertCorrectEscapedName();

        return retObj;
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