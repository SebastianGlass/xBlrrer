import Font from '@engine/core/rendering/font';
import { drawRect } from '@engine/core/rendering/helper';
import { SCREEN_SIZE } from '@engine/core/screen.settings';
import RenderLayer from '@engine/level/rendering/renderLayer';
import PlatformerLevel from '@extension/platformer/level';

export default class DashboardLayer implements RenderLayer {
    constructor(private font: Font, private level: PlatformerLevel) {}

    draw(context: CanvasRenderingContext2D): void {
        drawRect(context, 0, 23 * this.level.tilesize, SCREEN_SIZE.width, 5 * this.level.tilesize, 'black', {
            filled: true,
        });
    }

    withZero(count: number, length: number): string {
        return count.toFixed().toString().padStart(length, '0');
    }
}
