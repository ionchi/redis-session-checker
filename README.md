# redis-session-checker

[![GitHub issues](https://img.shields.io/github/issues/ionchi/redis-session-checker.svg?style=flat-square)](https://github.com/ionchi/redis-session-checker/issues)
[![GitHub license](https://img.shields.io/github/license/ionchi/redis-session-checker.svg?style=flat-square)](https://github.com/ionchi/redis-session-checker/blob/master/LICENSE)
![npm (scoped)](https://img.shields.io/npm/v/@ionchi/redis-session-checker.svg?style=flat-square)

This is a utility package to check the validity of a session, set by SPRING BOOT, with Redis.

Install with:

    npm i @ionchi/redis-session-checker


## Usage Example

```js
var sessionChecker = require('@ionchi/redis-session-checker');

var sessionCookieString = "SESSION=<base64 encoded string>"
var redisUrl = "redis://[host]:[port]"

sessionChecker.checkRedisSession(redisUrl, sessionCookieString)
    .then(result => {
        console.log("IS VALID: ", result);
    }).catch(err => console.log(err));
```

This will display something like:

    IS VALID: true