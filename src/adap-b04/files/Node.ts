import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        IllegalArgumentException.assertIsNotNullOrUndefined(bn);
        IllegalArgumentException.assertIsNotNullOrUndefined(pn);
        this.assertValidBaseName(bn);
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertValidBaseName(bn);
        IllegalArgumentException.assertIsNotNullOrUndefined(bn);
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.assertValidBaseName(bn);
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    protected assertHasValidBaseName(): void {
        InvalidStateException.assertCondition(this.baseName.includes('/'), "Base name contains invalid /");
    }

    protected assertValidBaseName(bn: string): void {
        IllegalArgumentException.assertCondition(bn.includes('/'), "Base name is empty");
    }
}
