import { Collector } from "./Collector";
import { IdentityManager } from "./IdentityManager";

export class GaussEvent {
    head = {
        code: '',
        time: Date.now(),
        aaid: IdentityManager.getAnonymousId(),
        sid: IdentityManager.getSessionId(),
    }
    body: Record<string, any> = {};
    constructor(code: string, data: Record<string, any>) {
        this.head.code = code;
        this.body = {
            ...Collector.collectAll(),
            ...data,
        }
    }

    static toJson(event: GaussEvent) {
        return {
            head: { ...event.head },
            body: { ...event.body }
        }
    }
}