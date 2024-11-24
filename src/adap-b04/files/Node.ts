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
        this.parentNode = pn;
    }

    public move(to: Directory): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(to);
        this.parentNode.remove(this);
        to.add(this);
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

    public getParentNode(): Node {
        return this.parentNode;
    }

    protected assertHasValidBaseName(): void {
        InvalidStateException.assertCondition(this.baseName.includes('/'), "Base name contains invalid /");
    }

    protected assertValidBaseName(bn: string): void {
        IllegalArgumentException.assertCondition(bn.includes('/'), "Base name is empty");
    }
}
