var redis = require('redis');
    bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/**
 * Creates redis client
 *
 * @private
 * @param {string} redisUrl The URL of the Redis server. Format: [redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
 * @returns {string} Returns the decoded session id string.
 */
function initSession(redisUrl) {
    if (!redisUrl) return null;

    const client = redis.createClient(redisUrl, {
        retry_strategy: function (options) {
            if (options.error && options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with
                // a individual error
                return new Error('The server refused the connection');
            }
            if (options.error && options.error.code === 'AbortError') {
                return new Error('Could not connect!');
            }
            if (options.error && options.error.code === 'ETIMEDOUT') {
                return new Error('Timeout error!');
            }
        }
    });

    client.on("error", function (err) {
        console.log("[CLIENT] Error " + err);
        return null;
    });

    return client;
}

module.exports = initSession;