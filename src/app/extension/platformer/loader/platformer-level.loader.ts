import TiledMapLoader from '@engine/tiled/loader/tiled-map.loader';
import { Loader, loadJson } from '@dialthetti/feather-engine-core';
import PlatformerLevelData from '../model/platformer-level.interface';
import PlatformerLevel from '../model/platformer-level.model';

export default class LevelSpecLoader implements Loader<PlatformerLevel> {
    constructor(private levelName: string) {}

    async load(): Promise<PlatformerLevel> {
        const level = await loadJson<PlatformerLevelData>(`./levels/${this.levelName}/main.json`);

        const tiledMap = await new TiledMapLoader(level.tiledMapPath).load();

        return { ...level, tiledMap };
    }
}
