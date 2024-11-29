import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public findNodesHelper(bn: string): Set<Node> {
        let result: Set<Node> = new Set<Node>();
        if(this.baseName === bn) {
            result.add(this);
        }
        for (let c of this.childNodes) {
            for(let n of c.findNodes(bn)) {
                result.add(n);
            }
        }
        return result;
    }

    public add(cn: Node): void {
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

}