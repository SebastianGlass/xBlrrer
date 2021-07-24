import RenderLayer from '@engine/level/rendering/renderLayer';
import PlatformerLevel from '@extension/platformer/level';
import { FeatherEngine, RenderContext } from 'feather-engine-core';
import { Subject } from 'feather-engine-events';
import { Font, NineWaySpriteSheet } from 'feather-engine-graphics';

export default class DialogLayer implements RenderLayer {
    private textToShow: string[];
    constructor(private font: Font, private frame: NineWaySpriteSheet, private level: PlatformerLevel) {
        FeatherEngine.eventBus.subscribe('dialog-text', {
            receive: (topic: string, subject: Subject) => {
                this.textToShow = subject.split('\n');
            },
        });
        FeatherEngine.eventBus.subscribe('dialog-clear', {
            receive: (topic: string, subject: Subject) => {
                this.textToShow = null;
            },
        });
    }

    draw(context: RenderContext): void {
        if (!this.textToShow) return;
        const boxPos = { x: 2 * this.level.tilesize, y: 16 * this.level.tilesize };
        const margin = 16;

        this.frame.draw(
            context,
            boxPos.x,
            boxPos.y,
            FeatherEngine.screenSize.width - 4 * this.level.tilesize,
            5 * this.level.tilesize,
        );

        this.font.print(this.textToShow[0], context, boxPos.x + margin, boxPos.y + margin);
    }

    withZero(count: number, length: number): string {
        return count.toFixed().toString().padStart(length, '0');
    }
}