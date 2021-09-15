import Level from './level';

export default interface LevelTrait {
    update(level: Level, deltaTime: number): void;
}
