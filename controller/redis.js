const { createClient } = require('redis');
const { err } = require('./utility');
let { token_expire: ex, redis_database: database } = process.env;
ex = parseInt(ex || 120);
database = parseInt(database || 15);
const funcs = {
    c: async (key, val) => {
        const client = await createClient({ database }).connect();
        if (!val)
            err('خطا در پارامتر ورودی')
        if (!ex)
            await client.set(key, val)
        else
            await client.set(key, val, { EX: ex });
        await client.disconnect();
    },
    r: async key => {
        const client = await createClient({ database }).connect();
        const val = await client.get(key);
        await client.disconnect();
        return val;
    },
    u: async (key, val) => {
        const client = await createClient({ database }).connect();
        const ex = await client.ttl(key);
        const old_val = await client.get(key);
        if (!old_val)
            err('مقدار یافت نسد', 400);
        await this.c({ database, key, val, ex });
    },
    d: async key => {
        const client = await createClient({ database }).connect();
        await client.del(key);
        await client.disconnect();
    }
};
module.exports = funcs;