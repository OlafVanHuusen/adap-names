import { describe, it, expect } from "vitest";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";
import { Name } from "../../../src/adap-b03/names/Name";
import { StringName } from "../../../src/adap-b03/names/StringName";
import { AbstractName } from "../../../src/adap-b03/names/AbstractName";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: StringArrayName = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: StringArrayName = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: StringArrayName = new StringArrayName(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: StringArrayName = new StringArrayName(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Clone tests", () => {
    it("test clone", () => {
      let n1: Name = new StringName("oss.cs.fau.de");
      let n2: Name = n1.clone() as Name;
      expect(n1.isEqual(n2)).toBe(true);
      n2.remove(0);
      expect(n1.isEqual(n2)).toBe(false);
    });
  });

describe("Extra-Tests", () => {

  function testDataString(original: string, delimiter?: string) {
    // Data String of a StringName should be the same as constructor
    let nString : Name = new StringName(original, delimiter);
    expect(nString.asDataString()).toBe(original);

    // Create an equal StringArrayName
    let nArray : StringArrayName = new StringArrayName([""], delimiter);
    nArray.concat(nString);
    nArray.remove(0);
    expect(nArray.getNoComponents()).toBe(nString.getNoComponents());
    for(let i = 0; i < nArray.getNoComponents(); i++) {
      expect(nArray.getComponent(i)).toBe(nString.getComponent(i));
    }

    // The dataString of the StringArrayNameObject should be the same as original
    expect(nArray.asDataString()).toBe(original);
    let nString2 : Name = new StringName(nArray.asDataString(), delimiter);
    expect(nString2.asDataString()).toBe(original);
    expect(nString2.getNoComponents()).toBe(nString.getNoComponents());
    for(let i = 0; i < nString2.getNoComponents(); i++) {
      expect(nString2.getComponent(i)).toBe(nString.getComponent(i));
    }
  }

  it("Full health check", () => {
    let nString : StringName = new StringName("oss.cs.fau.de");
    let nArray : StringArrayName = new StringArrayName(["oss", "cs", "fau", "de"]);

    // asString
    expect(nString.asString()).toBe("oss.cs.fau.de");
    expect(nArray.asString()).toBe("oss.cs.fau.de");

    // asString with delimiter
    expect(nString.asString("o")).toBe("ossocsofauode");
    expect(nArray.asString("o")).toBe("ossocsofauode");

    // asDataString
    expect(nString.asDataString()).toBe("oss.cs.fau.de");
    expect(nArray.asDataString()).toBe("oss.cs.fau.de");
    
    // isEmpty
    expect(nString.isEmpty()).toBe(false);
    expect(nArray.isEmpty()).toBe(false);

    // getDelimiterCharacter
    expect(nString.getDelimiterCharacter()).toBe(".");
    expect(nArray.getDelimiterCharacter()).toBe(".");

    // getNoComponents
    expect(nString.getNoComponents()).toBe(4);
    expect(nArray.getNoComponents()).toBe(4);

    // getComponent
    let components = ["oss", "cs", "fau", "de"];
    for (let i = 0; i < nString.getNoComponents(); i++) {
      expect(nString.getComponent(i)).toBe(components[i]);
      expect(nArray.getComponent(i)).toBe(components[i]);
    }

    // setComponent
    nString.setComponent(1, "c\\.s");
    nArray.setComponent(1, "c\\.s");
    expect(nString.getComponent(1)).toBe("c\\.s");
    expect(nString.asDataString()).toBe("oss.c\\.s.fau.de");
    expect(nArray.asString()).toBe("oss.c.s.fau.de");
    expect(nArray.getComponent(1)).toBe("c\\.s");
    expect(nArray.asDataString()).toBe("oss.c\\.s.fau.de");
    expect(nArray.asString()).toBe("oss.c.s.fau.de");

    // insert(0)
    nString.insert(0, "yep");
    nArray.insert(0, "yep");
    expect(nString.getComponent(0)).toBe("yep");
    expect(nString.asDataString()).toBe("yep.oss.c\\.s.fau.de");
    expect(nArray.asString()).toBe("yep.oss.c.s.fau.de");
    expect(nArray.getComponent(0)).toBe("yep");
    expect(nArray.asDataString()).toBe("yep.oss.c\\.s.fau.de");
    expect(nArray.asString()).toBe("yep.oss.c.s.fau.de");

    // insert(5)
    nString.insert(5, "yep");
    nArray.insert(5, "yep");
    expect(nString.getComponent(5)).toBe("yep");
    expect(nString.asDataString()).toBe("yep.oss.c\\.s.fau.de.yep");
    expect(nArray.asString()).toBe("yep.oss.c.s.fau.de.yep");
    expect(nArray.getComponent(5)).toBe("yep");
    expect(nArray.asDataString()).toBe("yep.oss.c\\.s.fau.de.yep");
    expect(nArray.asString()).toBe("yep.oss.c.s.fau.de.yep");

    // insert(3)
    nString.insert(3, "yeppers");
    nArray.insert(3, "yeppers");
    expect(nString.getComponent(3)).toBe("yeppers");
    expect(nString.asDataString()).toBe("yep.oss.c\\.s.yeppers.fau.de.yep");
    expect(nArray.asString()).toBe("yep.oss.c.s.yeppers.fau.de.yep");
    expect(nArray.getComponent(3)).toBe("yeppers");
    expect(nArray.asDataString()).toBe("yep.oss.c\\.s.yeppers.fau.de.yep");
    expect(nArray.asString()).toBe("yep.oss.c.s.yeppers.fau.de.yep");

    // append
    nString.append("coggers");
    nArray.append("coggers");
    expect(nString.getNoComponents()).toBe(8);
    expect(nString.getComponent(7)).toBe("coggers");
    expect(nString.asString()).toBe("yep.oss.c.s.yeppers.fau.de.yep.coggers");
    expect(nArray.getNoComponents()).toBe(8);
    expect(nArray.getComponent(7)).toBe("coggers");
    expect(nArray.asString()).toBe("yep.oss.c.s.yeppers.fau.de.yep.coggers");

    // remove
    nString.remove(7);
    nString.remove(0);
    nString.remove(5);
    nString.remove(2);
    nArray.remove(7);
    nArray.remove(0);
    nArray.remove(5);
    nArray.remove(2);
    expect(nString.getNoComponents()).toBe(4);
    expect(nArray.getNoComponents()).toBe(4);
    expect(nString.asDataString()).toBe("oss.c\\.s.fau.de");
    expect(nArray.asDataString()).toBe("oss.c\\.s.fau.de");
    nString.setComponent(1, "cs");
    nArray.setComponent(1, "cs");
    expect(nString.asDataString()).toBe("oss.cs.fau.de");
    expect(nArray.asDataString()).toBe("oss.cs.fau.de");
  });

  it("unfunny delimiter magic", () => {
    let nArray : Name = new StringArrayName(["o\\.\\.", "c\\.", "fau", "de"], ".");
    expect(nArray.asDataString()).toBe("o\\.\\..c\\..fau.de");
    let nString : Name = new StringName(nArray.asDataString(), ".");
    expect(nString.asDataString()).toBe("o\\.\\..c\\..fau.de");
    expect(nArray.asString(".")).toBe("o...c..fau.de");
    expect(nString.asString(".")).toBe("o...c..fau.de");
  });

  it("Emtpy:", () => {
    let nString : Name = new StringName("");
    let nArray : Name = new StringArrayName([""]);

    // "" of StringName is equivalent to [""] of StringArrayName
    expect(nString.getNoComponents()).toBe(1);
    expect(nArray.getNoComponents()).toBe(1);

    expect(nString.asString()).toBe("");
    expect(nArray.asString()).toBe("");
    testDataString("");
  });

  it("Escaped Delimiters", () => {
    let nString : Name = new StringName("oss\\..fa\\.u.de");
    let nArray : Name = new StringArrayName(["oss\\.", "fa\\.u", "de"]);

    expect(nString.asString()).toBe("oss..fa.u.de");
    expect(nArray.asString()).toBe("oss..fa.u.de");
    testDataString("oss\\..fa\\.u.de");
  });

describe("Basic StringName function tests", () => {
    it("test insert", () => {
      let n: Name = new StringName("oss.fau.de");
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
      let n: Name = new StringName("oss.cs.fau");
      n.append("de");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
      let n: Name = new StringName("oss.cs.fau.de");
      n.remove(0);
      expect(n.asString()).toBe("cs.fau.de");
    });
  });
  
  describe("Basic StringArrayName function tests", () => {
    it("test insert", () => {
      let n: Name = new StringArrayName(["oss", "fau", "de"]);
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau"]);
      n.append("de");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
      n.remove(0);
      expect(n.asString()).toBe("cs.fau.de");
    });
  });
  
  describe("Delimiter function tests", () => {
    it("test insert", () => {
      let n: Name = new StringName("oss#fau#de", '#');
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss#cs#fau#de");
    });
  });
  
  describe("Escape character extravaganza", () => {
    it("test escape and delimiter boundary conditions", () => {
      let n: Name = new StringName("oss.cs.fau.de", '#');
      expect(n.getNoComponents()).toBe(1);
      expect(n.asString()).toBe("oss.cs.fau.de");
      n.append("people");
      expect(n.asString()).toBe("oss.cs.fau.de#people");
    });
  });
  
  describe("Empty name tests", () => {
    it("test empty name", () => {
      let n: Name = new StringName("")
      n.remove(0);
      expect(n.isEmpty()).toBe(true);
      n.append("oss");
      expect(n.isEmpty()).toBe(false);
    });
  });
  
  describe("Concatenation tests", () => {
    it("test concatenation", () => {
      let n1: Name = new StringName("oss");
      let n2: Name = new StringName("cs.fau.de");
      n1.concat(n2);
      expect(n1.asString()).toBe("oss.cs.fau.de");
    });
  });
  
  describe("Equality tests", () => {
    it("test equality", () => {
      let n1: Name = new StringName("oss.cs.fau.de");
      let n2: Name = new StringName("oss.cs.fau.de");
      expect(n1.isEqual(n2)).toBe(true);
      n2.remove(0);
      expect(n1.isEqual(n2)).toBe(false);
    });
  });
  
  describe("Clone tests", () => {
    it("test clone", () => {
      let n1: Name = new StringName("oss.cs.fau.de");
      let n2: Name = n1.clone() as Name;
      expect(n1.isEqual(n2)).toBe(true);
      n2.remove(0);
      expect(n1.isEqual(n2)).toBe(false);
    });
  });
  
  describe("Hash code tests", () => {
    it("test hash code", () => {
      let n1: Name = new StringName("oss.cs.fau.de");
      let n2: Name = new StringName("oss.cs.fau.de");
      expect(n1.getHashCode()).toBe(n2.getHashCode());
      n2.remove(0);
      expect(n1.getHashCode()).not.toBe(n2.getHashCode());
    });
  });
  
  describe("Delimiter function tests for StringArrayName", () => {
    it("test insert", () => {
      let n: Name = new StringArrayName(["oss", "fau", "de"], '#');
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss#cs#fau#de");
    });
  });
  
  describe("Escape character extravaganza for StringArrayName", () => {
    it("test escape and delimiter boundary conditions", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau", "de"], '#');
      expect(n.getNoComponents()).toBe(4);
      expect(n.asString()).toBe("oss#cs#fau#de");
      n.append("people");
      expect(n.asString(".")).toBe("oss.cs.fau.de.people");
    });
  });
  
  describe("Empty name tests for StringArrayName", () => {
    it("test empty name", () => {
      let n: Name = new StringArrayName([], '#')
      expect(n.isEmpty()).toBe(true);
      n.append("oss");
      expect(n.isEmpty()).toBe(false);
    });
  });
  
  describe("Equality tests for StringArrayName", () => {
    it("test equality", () => {
      let n1: Name = new StringArrayName(["oss", "cs", "fau", "de"], '#');
      let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"], '#');
      expect(n1.isEqual(n2)).toBe(true);
      n2.remove(0);
      expect(n1.isEqual(n2)).toBe(false);
    });
  });
  
  describe("Clone tests for StringArrayName", () => {
    it("test clone", () => {
      let n1: Name = new StringArrayName(["oss", "cs", "fau", "de"], '#');
      let n2: Name = n1.clone() as Name;
      expect(n1.isEqual(n2)).toBe(true);
      n2.remove(0);
      // only shallow copy
      expect(n1.isEqual(n2)).toBe(true);
    });
  });
  
  describe("Hash code tests for StringArrayName", () => {
    it("test hash code", () => {
      let n1: Name = new StringArrayName(["oss", "cs", "fau", "de"], '#');
      let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"], '#');
      expect(n1.getHashCode()).toBe(n2.getHashCode());
      n2.remove(0);
      expect(n1.getHashCode()).not.toBe(n2.getHashCode());
    });
  });
  
});