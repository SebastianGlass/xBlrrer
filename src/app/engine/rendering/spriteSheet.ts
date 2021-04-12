import { debugSettings } from '../debug';
import { FrameAnimation } from './animation';
import { drawRect } from './helper';
import ImageContainer from './image.container';

export default class SpriteSheet extends ImageContainer {
    constructor(img: HTMLImageElement, private w: number, private h: number) {
        super(img);
    }

    public define(name: string, posX: number, posY: number, width: number, height: number): void {
        super.define(name, posX, posY, width, height, false);
        super.define(name + '_switched', posX, posY, width, height, true);
    }

    public draw(name: string, context: CanvasRenderingContext2D, x: number, y: number, flipped = false): void {
        const image = this.getImage(name + (flipped ? '_switched' : ''));
        if (image) {
            context.drawImage(image, x, y);
        } else {
            if (debugSettings.enabled) {
                drawRect(context, x, y, this.w, this.h, 'magenta', { filled: true });
            } else {
                context.clearRect(x, y, this.w, this.h);
            }
        }
    }

    getAnimation(name: string): FrameAnimation {
        const anim = this.animations[name];
        return anim ? anim : (): string => '';
    }
}
