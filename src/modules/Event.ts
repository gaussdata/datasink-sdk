import { Collector } from "./Collector";
import { IdentityManager } from "./IdentityManager";
import { version } from "../../package.json";

export class GaussEvent {
    head = {
        code: '',
        lib: 'js',
        lib_version: version, 
        time: Date.now(),
        aaid: IdentityManager.getAnonymousId(),
        sid: IdentityManager.getSessionId(),
    }
    body: Record<string, string | number | boolean> = {};

    constructor(code: string, data: Record<string, string | number | boolean>) {
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