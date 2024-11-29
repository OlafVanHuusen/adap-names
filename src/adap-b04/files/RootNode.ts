import { InvalidStateException } from "../common/InvalidStateException";
import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // null operation
        this.assertSelfparent();
    }

    protected doSetBaseName(bn: string): void {
        // null operation
        this.assertSelfparent();
    }

    protected assertSelfparent(): void {
        InvalidStateException.assertCondition(this === this.parentNode, "RootNode is not self parent");
    }
}