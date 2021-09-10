import PlatformerLevel from '@extension/platformer/level';
import { FeatherEngine } from 'feather-engine-core';
import { traitRegistry } from 'feather-engine-entities';

declare const window: any; // eslint-disable-line

export function addDebugToLevel(level: PlatformerLevel): void {
    if (window) {
        window.addTrait = (name) => {
            level.findPlayer().addTraits([traitRegistry.byName(name)]);
        };

        window.removeTrait = (name) => {
            level.findPlayer().removeTraitByName(name);
        };
        window.testingCheatsEnabled = (enabled): void => {
            FeatherEngine.debugSettings.enabled = enabled;
        };
        window.hitboxesOnly = (enabled): void => {
            FeatherEngine.debugSettings.hitboxesOnly = enabled;
        };
    }
}
