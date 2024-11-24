import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailureException } from "../../../src/adap-b04/common/MethodFailureException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {
    const exMsg: string = "null or undefined";

    IllegalArgumentException.assertIsNotNullOrUndefined("hurray!");
    expect(() => IllegalArgumentException.assertIsNotNullOrUndefined(null)).toThrow(new IllegalArgumentException(exMsg));

    MethodFailureException.assertIsNotNullOrUndefined("hurray!");
    expect(() => MethodFailureException.assertIsNotNullOrUndefined(null)).toThrow(new MethodFailureException(exMsg));

    InvalidStateException.assertIsNotNullOrUndefined("hurray!");
    expect(() => InvalidStateException.assertIsNotNullOrUndefined(null)).toThrow(new InvalidStateException(exMsg));
  });
});

describe("StringArrayNameTests", () => {
    it("test constructor", async () => {
        const exMsg: string = "String contains unescaped delimiter character";
    
        expect(() => {let s = new StringArrayName(["a", "b.", "c"], ".");}).toThrow(new IllegalArgumentException(exMsg));
        
    });

    it("test setComponent", async () => {
        const exMsg: string = "String contains unescaped delimiter character";
    
        let s = new StringArrayName(["a", "b", "c"], ".");
        expect(() => s.setComponent(1, "b.")).toThrow(new IllegalArgumentException(exMsg));
    });

    it("test setComponentNumber", async () => {
        const exMsg: string = "Index: 3 out of bounds for length 3";
    
        let s = new StringArrayName(["a", "b", "c"], ".");
        expect(() => s.setComponent(3, "d")).toThrow(new IllegalArgumentException(exMsg));
    });

    it("test constructorWrongDelimiter", async () => {
        const exMsg: string = "Delimiter must be a single character";
    
        expect(() => {let s = new StringArrayName(["a", "b", "c"], "...");}).toThrow(new IllegalArgumentException(exMsg));
        
    });
});

describe("StringNameTests", () => {
    it("test insert", async () => {
        const exMsg: string = "String contains unescaped delimiter character";
    
        let s = new StringArrayName(["a", "b", "c"], ".");
        expect(() => s.insert(1, "b.")).toThrow(new IllegalArgumentException(exMsg));
    });

    it("test insertNumber", async () => {
        const exMsg: string = "Index: 4 out of bounds for length 3";
    
        let s = new StringArrayName(["a", "b", "c"], ".");
        expect(() => s.insert(4, "d")).toThrow(new IllegalArgumentException(exMsg));
    });

    it("test append", async () => {
        const exMsg: string = "String contains unescaped delimiter character";
    
        let s = new StringArrayName(["a", "b", "c"], ".");
        expect(() => s.append("b.")).toThrow(new IllegalArgumentException(exMsg));
    });

    it("test remove", async () => {
        const exMsg: string = "Index: 3 out of bounds for length 3";
    
        let s = new StringArrayName(["a", "b", "c"], ".");
        expect(() => s.remove(3)).toThrow(new IllegalArgumentException(exMsg));
    });
});

describe("AbstractNameTests", () => {
    it("test concat", async () => {
        const exMsg: string = "Can't concatenate names with different delimiters";
    
        let s = new StringArrayName(["a", "b", "c"], ".");
        let t = new StringArrayName(["d", "e", "f"], "/");
        expect(() => s.concat(t)).toThrow(new IllegalArgumentException(exMsg));
    });
});
