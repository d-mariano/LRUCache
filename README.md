## LRU Cache
An LRU cache is a cache the deletes the least-recently used value first. This strategy keeps the most-used items in the 
cache for quick access. Whenever an value is accessed or pushed onto the stack, it is promoted to the top.

## Requirements

LRUCache requries [Node.js](https://nodejs.org/en/) to run. You must first [download and install Node.js](https://nodejs.org/en/download/).

## Dependencies

LRUCache itself does not require any dependencies; however, the interactive console uses [readline-sync](https://www.npmjs.com/package/readline-sync)
for handling user input with synchronous-style programming.

```bash
$ npm install --production
```

## Interactive Console

This repo includes an interactive console which you may use to test and interact with LRUCache.

```bash
$ npm start
```

## Testing

Testing is done w/ [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/). Simply install the development dependencies as well before
running the test script.

```bash
$ npm install && npm run-script test
```
