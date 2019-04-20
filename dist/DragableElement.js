"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DragableElement = (function () {
    function DragableElement(element, emitter) {
        var _this = this;
        this.element = element;
        this.emitter = emitter;
        this.element.addEventListener('mousedown', function (event) {
            if (event.button != 0) {
                return;
            }
            event.stopPropagation();
            _this.mousePosition = event;
            window.addEventListener('mousemove', _this.onMove.bind(_this));
        });
        window.addEventListener('mouseup', function (event) {
            if (event.button != 0 || !_this.mousePosition) {
                return;
            }
            _this.mousePosition = null;
            window.removeEventListener('mousemove', _this.onMove.bind(_this));
        });
    }
    DragableElement.prototype.onMove = function (event) {
        if (!this.mousePosition) {
            return;
        }
        event.preventDefault();
        var diff = {
            'vertical': event.y - this.mousePosition.y,
            'horizontal': event.x - this.mousePosition.x
        };
        this.mousePosition = event;
        this.emitter.emit('drag', diff);
    };
    DragableElement.prototype.getEmitter = function () {
        return this.emitter;
    };
    return DragableElement;
}());
exports.DragableElement = DragableElement;
//# sourceMappingURL=DragableElement.js.map