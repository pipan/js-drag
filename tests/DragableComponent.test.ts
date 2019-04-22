import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { DragModule } from '../src/DragModule';
import { DragableComponent } from '../src/DragableComponent';
import { DomService, EmitterService } from '@wildebeest/common';

let app: Application = new Application();
app.run([DragModule]);
let emitterService: EmitterService = app.getContainer().get(EmitterService);

test("test draging event - left click", () => {
    let domService: DomService = app.getContainer().get(DomService);
    
    let value: any = {
        vertical: 0,
        horizontal: 0
    };
    let element: HTMLElement = domService.create('<div></div>');
    domService.insert([element], document.body);
    let dragable: DragableComponent = new DragableComponent(element, emitterService.createEmitter());
    dragable.getEmitter().on('wbDrag', (event: any) => {
        value.vertical += event.vertical;
        value.horizontal += event.horizontal;
    })
    element.dispatchEvent(new MouseEvent('mousedown', {
        button: 0,
        clientX: 0,
        clientY: 0
    }));
    window.dispatchEvent(new MouseEvent('mousemove', {
        button: 0,
        clientX: 2,
        clientY: 5
    }));

    expect(value).toEqual({
        vertical: 5,
        horizontal: 2
    });
});

test.each([[1], [2], [3], [4]])("test draging event - other buttons", (buttonNumber) => {
    let domService: DomService = app.getContainer().get(DomService);
    
    let value: any = {
        vertical: 0,
        horizontal: 0
    };
    let element: HTMLElement = domService.create('<div></div>');
    domService.insert([element], document.body);
    let dragable: DragableComponent = new DragableComponent(element, emitterService.createEmitter());
    dragable.getEmitter().on('wbDrag', (event: any) => {
        value.vertical += event.vertical;
        value.horizontal += event.horizontal;
    })
    element.dispatchEvent(new MouseEvent('mousedown', {
        button: buttonNumber,
        clientX: 0,
        clientY: 0
    }));
    window.dispatchEvent(new MouseEvent('mousemove', {
        button: buttonNumber,
        clientX: 2,
        clientY: 5
    }));

    expect(value).toEqual({
        vertical: 0,
        horizontal: 0
    });
});

test("test draging event ended - left click", () => {
    let domService: DomService = app.getContainer().get(DomService);
    
    let dragEvent: any = null;
    let element: HTMLElement = domService.create('<div></div>');
    domService.insert([element], document.body);
    let dragable: DragableComponent = new DragableComponent(element, emitterService.createEmitter());
    dragable.getEmitter().on('wbDragended', (event: any) => {
        dragEvent = event;
    });
    element.dispatchEvent(new MouseEvent('mousedown', {
        button: 0,
        clientX: 0,
        clientY: 0
    }));
    window.dispatchEvent(new MouseEvent('mouseup', {
        button: 0,
        clientX: 2,
        clientY: 5
    }));

    expect(dragEvent).toEqual({
        vertical: 0,
        horizontal: 0,
        mouseEvent: new MouseEvent('mouseup', {
            button: 0,
            clientX: 2,
            clientY: 5
        })
    });
});

test.each([[1], [2], [3], [4]])("test draging event ended - other buttons", (buttonNumber) => {
    let domService: DomService = app.getContainer().get(DomService);
    
    let dragEvent: any = null;
    let element: HTMLElement = domService.create('<div></div>');
    domService.insert([element], document.body);
    let dragable: DragableComponent = new DragableComponent(element, emitterService.createEmitter());
    dragable.getEmitter().on('wbDragended', (event: any) => {
        dragEvent = event;
    });
    element.dispatchEvent(new MouseEvent('mousedown', {
        button: buttonNumber,
        clientX: 0,
        clientY: 0
    }));
    window.dispatchEvent(new MouseEvent('mouseup', {
        button: buttonNumber,
        clientX: 2,
        clientY: 5
    }));

    expect(dragEvent).toEqual(null);
});