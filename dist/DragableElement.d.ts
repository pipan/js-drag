import { Emitter } from "@wildebeest/common";
export declare class DragableElement {
    protected element: any;
    protected emitter: Emitter;
    protected mousePosition: any;
    constructor(element: any, emitter: Emitter);
    protected onMove(event: any): void;
    getEmitter(): Emitter;
}
