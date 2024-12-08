import { describe, it, expect } from "vitest";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";
import { Name } from "../../../src/adap-b06/names/Name";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { AbstractName } from "../../../src/adap-b06/names/AbstractName";


  
    describe("Equality test", () => {
      it("test isEqual", () => {
        let n1: Name = new StringArrayName(["oss", "cs", "fau", "de"], '.');
        let n2: Name = new StringName("oss.cs.fau.de");
        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.getHashCode() == n2.getHashCode()).toBe(true);
    
        n1 = n1.setComponent(1, "test");
        n2 = n2.setComponent(1, "test");
        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.getHashCode() == n2.getHashCode()).toBe(true); 
    
        n1 = n1.setComponent(2, "test");
        n2 = n2.setComponent(2, "test2");
        expect(n1.isEqual(n2)).toBe(false);
        expect(n1.getHashCode() == n2.getHashCode()).toBe(false); 
      });
    });