import SceneMachine from 'src/app/core/scenes/scene-machine';
import LoadingScene from '../scenes/loading-scene/loading-scene';
import MainMenuScene from '../scenes/main-menu-scene/main-menu-scene';
import GameScene from '../scenes/platform-scene/game.scene';

declare const window: any; // eslint-disable-line

export default class Game {
    constructor(private canvasId: string) {}

    async start(): Promise<void> {
        const sceneMachine = new SceneMachine().addScenes([
            () => new LoadingScene(),
            () => new MainMenuScene(),
            () => new GameScene(),
        ]);
        await sceneMachine.load();
        sceneMachine.start();
        sceneMachine.setScene(MainMenuScene.NAME);
    }
}
