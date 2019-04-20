import { Emitter } from "@wildebeest/common";

export class DragableElement
{
    protected element: any;
    protected emitter: Emitter;
    protected mousePosition: any;

    constructor(element: any, emitter: Emitter)
    {
        this.element = element;
        this.emitter = emitter;

        this.element.addEventListener('mousedown', (event: any) => {
            if (event.button != 0) {
                return;
            }
            event.stopPropagation();
            this.mousePosition = event;
            window.addEventListener('mousemove', this.onMove.bind(this));
        });

        window.addEventListener('mouseup', (event: any) => {
            if (event.button != 0 || !this.mousePosition) {
                return;
            }
            this.mousePosition = null;
            window.removeEventListener('mousemove', this.onMove.bind(this));
        });
    }

    protected onMove(event: any): void
    {
        if (!this.mousePosition) {
            return;
        }
        event.preventDefault();
        let diff: any = {
            'vertical': event.y - this.mousePosition.y,
            'horizontal': event.x - this.mousePosition.x
        };
        this.mousePosition = event;
        this.emitter.emit('drag', diff);
    }

    public getEmitter(): Emitter
    {
        return this.emitter;
    }
}