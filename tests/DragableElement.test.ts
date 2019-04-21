import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { DragModule } from '../src/DragModule';
import { DragableElement } from '../src/DragableElement';
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
    let dragable: DragableElement = new DragableElement(element, emitterService.createEmitter());
    dragable.getEmitter().on('drag', (event: any) => {
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
    let dragable: DragableElement = new DragableElement(element, emitterService.createEmitter());
    dragable.getEmitter().on('drag', (event: any) => {
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