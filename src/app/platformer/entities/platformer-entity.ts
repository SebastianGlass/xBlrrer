import Entity from '../../engine/entities/entity';
import { EntityState } from '../../engine/entities/entity.state';
import Trait from '../../engine/entities/trait';
import TraitCtnr from '../../engine/entities/trait.container';
import EventBuffer from '../../engine/events/eventBuffer';
import BoundingBox from '../../engine/math/boundingBox';
import Vector from '../../engine/math/vector';
import { PositionedTile } from '../../engine/physics/collider/tile.collider.layer';
import { Side } from '../../engine/world/tiles/side';
import { PlatformerTraitContext } from './traits/traits';

export default class PlatformerEntity implements Entity, TraitCtnr {
    pos = new Vector(0, 0);
    vel = new Vector(0, 0);
    size = new Vector(16, 16);
    offset = new Vector(0, 0);
    lifeTime = 0;
    state = EntityState.ACTIVE;
    spriteChanged = false;
    bypassPlatform = false;

    bounds = new BoundingBox(this.pos, this.size, this.offset);

    traits: { [name: string]: Trait } = {};

    standingOn: Set<string> = new Set();

    events = new EventBuffer();

    collide(target: PlatformerEntity): void {
        this.getTraits().forEach((trait) => trait.collides(this, target));
    }

    update(context: PlatformerTraitContext): void {
        this.getTraits().forEach((trait) => trait.update(this, context));
        this.lifeTime += context.deltaTime;
        this.getTraits()
            .filter((e) => e.finalize)
            .forEach((e) => {
                e.finalize();
                e.finalize = undefined;
            });
        this.standingOn.clear();
    }

    obstruct(side: Side, match: PositionedTile): void {
        if (side === Side.BOTTOM) {
            match.tile.types.forEach((e) => this.standingOn.add(e));
        }
        this.getTraits().forEach((trait) => trait.obstruct(this, side, match));
    }

    addTrait(trait: Trait): void {
        this.traits[trait.name] = trait;
    }
    addTraits(traits: Trait[]): void {
        traits.forEach((t) => this.addTrait(t));
    }

    getTrait<T extends Trait>(trait: new () => T): T {
        return this.traits[new trait().name] as T;
    }
    hasTrait<T extends Trait>(trait: new () => T): boolean {
        return this.traits[new trait().name] != null;
    }
    draw(context: CanvasRenderingContext2D): void {
        // entity has no rendering.
    }

    private getTraits(): Trait[] {
        return Object.keys(this.traits).map((key) => this.traits[key]);
    }
}