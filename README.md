## LRU Cache
An LRU cache is a cache the deletes the least-recently used value first. This strategy keeps the most-used items in the 
cache for quick access. Whenever a value is accessed or pushed onto the stack, it is promoted to the top.

## Requirements

Using the interactive console with LRUCache requries [Node.js](https://nodejs.org/en/). You must first [download and install Node.js](https://nodejs.org/en/download/). All dependencies are managed through [npm](https://www.npmjs.com/get-npm) which is distrubted with [Node.js](https://nodejs.org/en/).

## Dependencies

LRUCache alone does not require any dependencies; however, the interactive console uses [readline-sync](https://www.npmjs.com/package/readline-sync)
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

[Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/) are used for unit testing, simply install dependencies before running the test script.

```bash
$ npm install && npm run-script test
```
