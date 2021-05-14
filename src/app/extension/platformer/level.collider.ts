import Entity from '@engine/core/entities/entity';
import EntityCollider from '@engine/core/physics/collider/entity.collider';
import TileCollider from '@engine/core/physics/collider/tile.collider';
import PlatformerLevel from './level';

export default class LevelCollider {
    tileCollider: TileCollider;
    entityCollider: EntityCollider;

    constructor(level: PlatformerLevel) {
        this.entityCollider = new EntityCollider(level.entities);
        this.tileCollider = new TileCollider(level, level.tilesize);
    }

    checkX(entity: Entity): void {
        this.tileCollider.checkX(entity);
    }
    checkY(entity: Entity): void {
        this.tileCollider.checkY(entity);
    }
}
