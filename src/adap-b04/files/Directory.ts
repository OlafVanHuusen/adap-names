import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        let size = this.childNodes.size;
        this.childNodes.add(cn);
        this.assertChildNodesSize(size + 1);
    }

    public removeChildNode(cn: Node): void {
        let size = this.childNodes.size;
        this.childNodes.delete(cn); // Yikes! Should have been called remove
        this.assertChildNodesSize(size - 1);
    }

    protected assertChildNodesSize(size: number): void {
        InvalidStateException.assert(this.childNodes.size === size, "Invalid number of child nodes");
    }

}