import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation or deletion");
    }

    public asDataString(): string {
        throw new Error("needs implementation or deletion");
    }


    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getNoComponents(): number {
        throw new Error("needs implementation or deletion");
    }

    public getComponent(x: number): string {
        throw new Error("needs implementation or deletion");
    }

    public setComponent(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public insert(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public append(c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public remove(n: number): void {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

}