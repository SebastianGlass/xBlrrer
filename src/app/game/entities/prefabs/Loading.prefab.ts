import { Vector } from '@dialthetti/feather-engine-core';
import { Entity, EntityPrefab } from '@dialthetti/feather-engine-entities';
import { SpriteSheet } from '@dialthetti/feather-engine-graphics';
import PlatformerEntity from '@extension/platformer/entities/platformer-entity';
import ATrait from 'src/app/core/entities/trait';

export default class LoadingPrefab extends EntityPrefab {
    constructor() {
        super('loading', 'loading');
        this.size = new Vector(32, 32);
        this.offset = new Vector(0, 0);
        this.traits = (): ATrait[] => [];
    }
    entityFac = (): Entity => new PlatformerEntity() as Entity;

    routeFrame(entity: Entity, sprite: SpriteSheet): string {
        if (entity instanceof PlatformerEntity) {
            return sprite.getAnimation('loading')(entity.lifeTime * 60);
        }
        return sprite.getAnimation('loading')(0);
    }
}