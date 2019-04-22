import { Emitter } from "@wildebeest/common";
import { Component } from "@wildebeest/component";
export declare class DragableComponent implements Component {
    protected element: HTMLElement;
    protected emitter: Emitter;
    protected mousePosition: MouseEvent;
    constructor(element: HTMLElement, emitter: Emitter);
    protected onMove(event: MouseEvent): void;
    getEmitter(): Emitter;
    getElement(): HTMLElement;
}
