const {
    base64decode
} = require('nodejs-base64');

/**
 * Decodes Spring Session ID string to Redis accessible session id.
 *
 * @private
 * @param {string} sessionCookie The spring session cookie [format SESSION=<base64 encoded string>].
 * @returns {string} Returns the decoded session id string.
 */
function decodeSessionId(sessionCookie) {
    // TODO improve split for encoded strings with multiple '='. ex. "good_luck_buddy".split(/=(.+)/)[1] or myString = myString.substring(myString.indexOf('_')+1)
    let base64String = sessionCookie.split('=');
    let decoded = base64decode(base64String[1]);

    return decoded;
}

module.exports = decodeSessionId;