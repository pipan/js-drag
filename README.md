# Drag Module

Add drag event to DOM elements. Drag event is triggered when user moves the mouse, while holding down left mouse button.

## Installation

```sh
npm install --save @wildebeest/drag
```

## Requirements

It's usefull to know these libraries:

* inversify
* @wildebeest/js-modules

## Bind Element To Dragable Component

Making element to emit `wbDrag` and `wbDragended` events, requires creating new instance of class `DragableComponent`.

```ts
foo(emitterService: EmitterService): void
{
    let element: any = document.querySelector('.dragable');
    let dragable: DragableComponent = new DragableComponent(element, emitterService.createEmitter());
}
```

In our example we used `.dragable` selector to select DOM element and then create `DragableComponent`, that will listen to specific changes on this element. If it finds a drag, it will emit drag event.

## Listen To Drag Event

Drag event is called `wbDrag` and the event contains three values `horizontal` and `vertical` movement difference after last movement. `mouseEvent`, which is the original `MouseEvent`.

```ts
foo(emitterService: EmitterService): void
{
    let element: any = document.querySelector('.dragable');
    let dragable: DragableComponent = new DragableComponent(element, emitterService.createEmitter());

    dragable.getEmitter().on('wbDrag' (data: any) => {
        let verticalMovement: number = data.vertical;
        let horizontalMovement: number = data.horizontal;
        let originalEvent: MouseEvent = data.mouseEvent;
    });
}
```

## Listen To Dragended Event

Dragended event is called `wbDrag` and the event contains three values `horizontal` and `vertical` movement difference after last movement. In this case, those values will be `0`. And `mouseEvent`, which is the original `MouseEvent`.

```ts
foo(emitterService: EmitterService): void
{
    let element: any = document.querySelector('.dragable');
    let dragable: DragableComponent = new DragableComponent(element, emitterService.createEmitter());

    dragable.getEmitter().on('wbDragended' (data: any) => {
        let verticalMovement: number = data.vertical;
        let horizontalMovement: number = data.horizontal;
        let originalEvent: MouseEvent = data.mouseEvent;
    });
}
```