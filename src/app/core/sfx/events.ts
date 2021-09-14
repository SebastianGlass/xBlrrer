import { Subject } from '@dialthetti/feather-engine-events';

export const PLAY_SFX_TOPIC = 'playSFX';
export class SfxEvent implements Subject<{ name: string; blocking?: boolean }> {
    topic = PLAY_SFX_TOPIC;
    constructor(public payload: { name: string; blocking?: boolean; position?: number }) {}
}
