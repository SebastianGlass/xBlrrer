import { Vector } from '@dialthetti/feather-engine-core';
import { EntityPrefab } from '@dialthetti/feather-engine-entities';
import { SpriteSheet } from '@dialthetti/feather-engine-graphics';
import PlatformerEntity from '@extension/platformer/entities/platformer-entity';
import ATrait from 'src/app/core/entities/trait';
import Gravity from 'src/app/core/physics/traits/gravity';
import Physics from 'src/app/core/physics/traits/physics';
import Solid from 'src/app/core/physics/traits/solid';
import { Crouch, Glide, Go, Jump, Killable, Player, Stomp } from '../traits';


export default class CrowPrefab extends EntityPrefab {
    constructor() {
        super('crow', 'crow');
        this.size = new Vector(16, 32);
        this.offset = new Vector(8, 0);
        this.traits = (): ATrait[] => [
            new Solid(),
            new Gravity(new Vector(0, 750)),
            new Physics(),
            new Jump(),
            new Go(),
            new Stomp(),
            //      new Glide(),
            new Killable('dead', 3, 0),
            new Crouch(),
            new Player(),
        ];
    }
    entityFac = (): PlatformerEntity => new PlatformerEntity();

    routeFrame(entity: PlatformerEntity, sprite: SpriteSheet): string {
        const go = entity.getTrait(Go);
        const jump = entity.getTrait(Jump);
        const crouch = entity.getTrait(Crouch);
        const glide = entity.getTrait(Glide);
        const killable = entity.getTrait(Killable);
        if (killable.invulnable) {
            if (Math.floor(killable.invulnabilityTime * 10) % 2 == 0) return '';
        }
        if (crouch.down) {
            return 'crouch';
        }
        if (glide?.gliding) {
            return 'fall-1';
        }

        if (jump.falling) {
            const direction = entity.vel.y < 0 ? 'jump' : 'fall';
            const x = sprite.getAnimation(direction)(jump.timeOfCurrentPhase);
            return x;
        }

        if (go.distance !== 0 && entity.vel.x !== 0) {
            return sprite.getAnimation('run')(go.distance);
        }
        return 'idle';
    }

    flipped(f: PlatformerEntity): boolean {
        const go = f.getTrait(Go);
        return go.facingDirection == -1;
    }
}