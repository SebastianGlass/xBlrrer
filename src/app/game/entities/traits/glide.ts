import { Entity, Side } from '@dialthetti/feather-engine-entities';
import ATrait, { Context } from 'src/app/core/entities/trait';
import Gravity from 'src/app/core/physics/traits/gravity';

export default class Glide extends ATrait {
    gliding = false;

    constructor() {
        super('glide');
    }

    start(): void {
        this.gliding = true;
    }
    cancel(): void {
        this.gliding = false;
    }

    update(entity: Entity, context: Context): void {
        const gravity = entity.getTrait(Gravity);
        if (!(this.gliding && gravity && this.enabled)) {
            return;
        }
        entity.vel.y = gravity.gravity.y * 0.95 * context.deltaTime;
    }

    obstruct(entity: Entity, side: Side): void {
        switch (side) {
            case Side.BOTTOM:
            case Side.TOP:
                this.cancel();
                break;
            default:
        }
    }
}