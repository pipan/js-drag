import { Emitter } from "@wildebeest/common";

export class DragableElement
{
    protected element: HTMLElement;
    protected emitter: Emitter;
    protected mousePosition: MouseEvent;

    constructor(element: HTMLElement, emitter: Emitter)
    {
        this.element = element;
        this.emitter = emitter;

        this.element.addEventListener('mousedown', (event: MouseEvent) => {
            if (event.button != 0) {
                return;
            }
            event.stopPropagation();
            this.mousePosition = event;
            window.addEventListener('mousemove', this.onMove.bind(this));
        });

        window.addEventListener('mouseup', (event: MouseEvent) => {
            if (event.button != 0 || !this.mousePosition) {
                return;
            }
            this.mousePosition = null;
            window.removeEventListener('mousemove', this.onMove.bind(this));
        });
    }

    protected onMove(event: MouseEvent): void
    {
        if (!this.mousePosition) {
            return;
        }
        event.preventDefault();
        let diff: any = {
            vertical: event.clientY - this.mousePosition.clientY,
            horizontal: event.clientX - this.mousePosition.clientX
        };
        this.mousePosition = event;
        this.emitter.emit('drag', diff);
    }

    public getEmitter(): Emitter
    {
        return this.emitter;
    }
}