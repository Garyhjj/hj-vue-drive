import * as schedule from 'node-schedule';

export class CacheService {
    //   private cache: {
    //     [prop: string]: {
    //       [prop: string]: {
    //         updateTime?: Date;
    //         maxAge?: number;
    //         schedule?: schedule.Job;
    //         value: any;
    //       };
    //     };
    //   } = {};
    constructor() {
        this.cache = {}
    }

    getAllByName(comName, isClone = true) {
        const allCache = this.cache;
        if (allCache[comName]) {
            const cache = allCache[comName];
            const out = {};
            // tslint:disable-next-line:forin
            for (const prop in cache) {
                out[prop] = cache[prop].value;
            }
            return isClone ? JSON.parse(JSON.stringify(out)) : out;
        } else {
            return null;
        }
    }

    get(comName, key, isClone = true) {
        const allCache = this.cache;
        if (allCache[comName] && allCache[comName][key]) {
            const cache = allCache[comName][key];
            return isClone ? JSON.parse(JSON.stringify(cache.value)) : cache.value;
        } else {
            return null;
        }
    }

    update(
        comName,
        key,
        newVal,
        maxAge,
        afterMaxAge
    ) {
        const allCache = this.cache;
        this.cancelSchedule(comName, key);
        const parentCache = (allCache[comName] = allCache[comName] || {});
        parentCache[key] = {
            value: newVal
        };
        if (maxAge) {
            const cache = parentCache[key];
            cache.updateTime = new Date();
            cache.maxAge = maxAge;
            const thatTime = new Date(Date.now() + maxAge);
            const d = schedule.scheduleJob(thatTime, () => {
                delete allCache[comName][key];
                if (typeof afterMaxAge === 'function') {
                    afterMaxAge(comName, key);
                }
            });
            cache.schedule = d;
        }
    }

    cancelSchedule(comName, key) {
        const allCache = this.cache;
        if (allCache[comName] && allCache[comName][key]) {
            const cache = allCache[comName][key];
            if (cache.schedule) {
                cache.schedule.cancel();
                cache.schedule = null;
            }
        }
    }
    clear(comName, sub) {
        const allCache = this.cache;
        if (!allCache[comName]) {
            return;
        }
        const parent = allCache[comName];
        if (sub) {
            this.cancelSchedule(comName, sub);
            delete parent[sub];
        } else {
            Object.keys(parent).forEach(_ => {
                this.cancelSchedule(comName, _);
            });
            delete allCache[comName];
        }
    }
}
let instance;
export default {
    getInstance(muti) {
        if (muti) {
            return new CacheService();
        }
        return instance ? instance : instance = new CacheService();
    }
}