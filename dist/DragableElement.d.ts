import { Emitter } from "@wildebeest/common";
export declare class DragableElement {
    protected element: HTMLElement;
    protected emitter: Emitter;
    protected mousePosition: MouseEvent;
    constructor(element: HTMLElement, emitter: Emitter);
    protected onMove(event: MouseEvent): void;
    getEmitter(): Emitter;
}
