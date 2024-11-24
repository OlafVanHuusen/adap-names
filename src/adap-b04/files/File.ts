import { Node } from "./Node";
import { Directory } from "./Directory";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        this.assertIsInState(FileState.CLOSED);
        // do something
    }

    public read(noBytes: number): Int8Array {
        // read something
        return new Int8Array();
    }

    public close(): void {
        this.assertIsInState(FileState.OPEN);
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertIsInState(state: FileState): void {
        if(state !== this.doGetFileState()) {
            throw new InvalidStateException("File is not in state " + state);
        }
    }

}