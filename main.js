var decodeSessionId = require('./_sessionIdDecode'),
    initSession = require('./_initRedisClient');

/**
 * Check redis session's validity
 *
 * @param {string} redisUrl The URL of the Redis server. Format: [redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
 * @param {string} cookiePrefix The cookie prefix. Example: spring:session:sessions:
 * @param {string} sessionCookie The spring session cookie [format SESSION=<base64 encoded string>].
 * @returns {boolean} Returns boolean. Existing and valid session or not.
 */
exports.checkRedisSession = async function (redisUrl, cookiePrefix, sessionCookie) {
    const client = initSession(redisUrl);
    const sessionId = decodeSessionId(sessionCookie);

    // TODO hardcode cookiePrefix, it's a java default anyway (until future improved flexibility)

    if (client) {
        return new Promise(function (resolve, reject) {
            client.hgetallAsync(`${cookiePrefix}${sessionId}`)
                .then(function (result) {
                    let sessionInfo = null;

                    if (result && result["sessionAttr:SPRING_SECURITY_CONTEXT"])
                        sessionInfo = JSON.parse(result["sessionAttr:SPRING_SECURITY_CONTEXT"])

                    let isSessionValid = result ? 
                    (sessionInfo && sessionInfo.authentication ? 
                        sessionInfo.authentication.authenticated : false): false;
                        
                    resolve(isSessionValid);
                }).then(function () {
                    client.quit();
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                })
        });

    }

}