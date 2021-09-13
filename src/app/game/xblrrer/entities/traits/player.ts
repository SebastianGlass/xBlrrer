import ATrait from '@engine/core/entities/trait';
import { Entity } from '@dialthetti/feather-engine-entities';

export default class Player extends ATrait {
    lives = 3;
    private c = 0;
    score = 0;
    constructor() {
        super('player');
    }

    update(entity: Entity): void {
        entity.events.process('stomp', { receive: () => (this.score += 100) });
    }

    get coins(): number {
        return this.c;
    }

    set coins(val: number) {
        if (val >= 100) {
            this.lives++;
            val -= 100;
            console.log('1-up');
        }
        this.c = val;
    }
}
