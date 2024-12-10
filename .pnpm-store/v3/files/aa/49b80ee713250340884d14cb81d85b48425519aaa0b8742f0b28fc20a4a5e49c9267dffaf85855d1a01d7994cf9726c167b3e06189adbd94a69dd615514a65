var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
import { property } from "lit/decorators.js";
import { TouchGestureMixin } from "./TouchGestureMixin";
export const PositionedMixin = (superClass) => {
    var _Positioned_isDragModeOn, _Positioned_movePanel, _Positioned_keyDown, _Positioned_keyUp, _Positioned_listenToKeyboardEvents;
    class Positioned extends TouchGestureMixin(superClass) {
        constructor(...args) {
            super(...args);
            this.panX = 0;
            this.panY = 0;
            this.scale = 1;
            this.zoomSpeed = 500;
            this.panSpeed = 500;
            _Positioned_isDragModeOn.set(this, false);
            _Positioned_movePanel.set(this, (shiftX, shiftY) => {
                this.panX += shiftX / this.scale / window.devicePixelRatio;
                this.panY += shiftY / this.scale / window.devicePixelRatio;
            });
            // Enable drag mode when holding the spacebar
            _Positioned_keyDown.set(this, (event) => {
                if (event.code === "Space" && !__classPrivateFieldGet(this, _Positioned_isDragModeOn, "f")) {
                    __classPrivateFieldSet(this, _Positioned_isDragModeOn, true, "f");
                    document.body.style.cursor = "grab";
                }
            });
            // Disable drag mode when space lets the spacebar go
            _Positioned_keyUp.set(this, (event) => {
                if (event.code === "Space" && __classPrivateFieldGet(this, _Positioned_isDragModeOn, "f")) {
                    __classPrivateFieldSet(this, _Positioned_isDragModeOn, false, "f");
                    document.body.style.cursor = "auto";
                }
            });
            _Positioned_listenToKeyboardEvents.set(this, () => {
                document.addEventListener("keyup", __classPrivateFieldGet(this, _Positioned_keyUp, "f"));
                document.addEventListener("keydown", __classPrivateFieldGet(this, _Positioned_keyDown, "f"));
            });
            this.addEventListener("wheel", (ev) => {
                if (!this.isMovable)
                    return;
                ev.preventDefault();
                if (ev.ctrlKey) {
                    // Performs zoom when ctrl key is pressed.
                    let { deltaY } = ev;
                    if (ev.deltaMode === 1) {
                        // Firefox quirk
                        deltaY *= 15;
                    }
                    const prevScale = this.scale;
                    this.scale *= 1 - deltaY / ((1000 - this.zoomSpeed) * 0.5);
                    // Performs pan to archive "zoom at the point" behavior (I don't know how to call it).
                    const offsetX = ev.offsetX - this.offsetWidth / 2;
                    const offsetY = ev.offsetY - this.offsetHeight / 2;
                    this.panX += offsetX / this.scale - offsetX / prevScale;
                    this.panY += offsetY / this.scale - offsetY / prevScale;
                }
                else {
                    // Performs pan otherwise (to be close to native behavior)
                    // Adjusting panSpeed in order to make panSpeed=500 to match to the Figma's one.
                    const speed = this.panSpeed * 0.002;
                    this.panX -= (ev.deltaX * speed) / this.scale;
                    this.panY -= (ev.deltaY * speed) / this.scale;
                }
            }, 
            // This component prevents every native wheel behavior on it.
            { passive: false });
            // Base scale for Safari's GestureEvents
            let gestureStartScale = 1;
            this.addEventListener("gesturestart", (ev) => {
                ev.preventDefault();
                gestureStartScale = this.scale;
            });
            this.addEventListener("gesturechange", (_ev) => {
                const ev = _ev;
                ev.preventDefault();
                // We can't perform zoom-at-the-point due to lack of offsetX/Y in GestureEvent
                this.scale = gestureStartScale * ev.scale;
            });
            this.addEventListener("pointermove", (ev) => {
                // Performs pan only when middle buttons is pressed.
                //
                // 4 ... Auxiliary button (usually the mouse wheel button or middle button)
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
                if (!(ev.buttons & 4))
                    return;
                ev.preventDefault();
                // Moving amount of middle button+pointer move panning should matches to the actual
                // pointer travel distance. Since translate goes after scaling, we need to scale
                // delta too.
                __classPrivateFieldGet(this, _Positioned_movePanel, "f").call(this, ev.movementX, ev.movementY);
            });
            // Listen to keyboard events to enable dragging when Space is pressed, just like in Figma
            __classPrivateFieldGet(this, _Positioned_listenToKeyboardEvents, "f").call(this);
            /** @private */
            this.onmousedown = () => {
                if (__classPrivateFieldGet(this, _Positioned_isDragModeOn, "f")) {
                    document.body.style.cursor = "grabbing";
                    this.onmousemove = ({ movementX, movementY }) => {
                        __classPrivateFieldGet(this, _Positioned_movePanel, "f").call(this, movementX, movementY);
                    };
                    // cleanup unnecessary listeners when user stops dragging
                    this.onmouseup = () => {
                        document.body.style.cursor = "grab";
                        this.onmousemove = null;
                        this.onmouseup = null;
                    };
                }
            };
        }
        get isMovable() {
            return true;
        }
        get canvasTransform() {
            return [
                `scale(${this.scale})`,
                `translate(${this.panX}px, ${this.panY}px)`,
            ];
        }
        disconnectedCallback() {
            document.removeEventListener("keyup", __classPrivateFieldGet(this, _Positioned_keyUp, "f"));
            document.removeEventListener("keydown", __classPrivateFieldGet(this, _Positioned_keyDown, "f"));
            super.disconnectedCallback();
        }
        // Dispatch events when the position-related value changes.
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has("scale")) {
                this.dispatchEvent(new CustomEvent("scalechange", {
                    detail: {
                        scale: this.scale,
                    },
                }));
            }
            if (changedProperties.has("panX") || changedProperties.has("panY")) {
                this.dispatchEvent(new CustomEvent("positionchange", {
                    detail: {
                        x: this.panX,
                        y: this.panY,
                    },
                }));
            }
        }
        onTouchPan(delta) {
            this.panX += delta.x / this.scale;
            this.panY += delta.y / this.scale;
        }
        onTouchPinch(delta) {
            // TODO: Remove this no-brainer magic number
            this.scale *= 1 - delta / 1000;
        }
    }
    _Positioned_isDragModeOn = new WeakMap(), _Positioned_movePanel = new WeakMap(), _Positioned_keyDown = new WeakMap(), _Positioned_keyUp = new WeakMap(), _Positioned_listenToKeyboardEvents = new WeakMap();
    __decorate([
        property({
            attribute: false,
        })
    ], Positioned.prototype, "panX", void 0);
    __decorate([
        property({
            attribute: false,
        })
    ], Positioned.prototype, "panY", void 0);
    __decorate([
        property({
            attribute: false,
        })
    ], Positioned.prototype, "scale", void 0);
    __decorate([
        property({
            type: Number,
            attribute: "zoom-speed",
        })
    ], Positioned.prototype, "zoomSpeed", void 0);
    __decorate([
        property({
            type: Number,
            attribute: "pan-speed",
        })
    ], Positioned.prototype, "panSpeed", void 0);
    return Positioned;
};
