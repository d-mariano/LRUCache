const readLineSync = require('readline-sync');
const LRUCache = require('./LRUCache');

const GET = 'get';
const PUT = 'put';
const DEL = 'del';
const RESET = 'reset';
const INIT = 'init';
const EXIT = 'exit';

let lruCache = new LRUCache(5);
let returnValue = false;
let select;

console.log("Welcome!\n\nThe LRU Cache has been initialized with a value of 5. Please feel free to change it with the `init` command.");
while (select !== '0') {
  console.log("\nCommands:\n")
  console.log("get\tGet a value from the cache based on a given key");
  console.log("put\tPut a given value in the cache with a given key");
  console.log("del\tDelete a given key from the cache");
  console.log("reset\tReset the cache");
  console.log("init\tInitialize the cache with a given size");

  printCache();
  printReturn();

  select = readLineSync.question("\nPlease enter a command (ex. put): ");
  if (select === GET) {
    get();
  } else if (select === PUT) {
    put();
  } else if (select === DEL) {
    del();
  } else if (select === RESET) {
    reset();
  } else if (select === INIT) {
    init();
  } else if (select === EXIT) {
    console.log("\n\nGoodbye!\n\n");
    return;
  } else {
    console.log(select + ' is not a valid command');
  }
}

function get() {
  let key = readLineSync.question("Please enter a key to lookup (ex. apple): ");
  returnValue = lruCache.get(key);
}

function put() {
  let key = readLineSync.question("Please enter a key (ex. apple): ");
  let value = readLineSync.question("Please enter a value (ex. orange): ");

  lruCache.put(key, value);
}

function del() {
  let key = readLineSync.question("Please enter a key to delete (ex. apple): ");
  lruCache.del(key);
}

function reset() {
  lruCache.reset()
}

function init() {
  let size = readLineSync.question("Please enter a cache size (ex. 10): ");
 
  if (isNaN(size)) {
    console.log(size + ' is not a valid number');
    return;
  }

  lruCache = new LRUCache(size);
  console.log('LRU cache size set to ' + size);
}

function printCache() {
  console.log("\nCache Size:\t" + lruCache.numNodes + '/' + lruCache.cacheSize);
  console.log("Cache Value:\t" + JSON.stringify(lruCache.getCache()));
}

function printReturn() {
  if (returnValue !== false) {
    console.log("Return Value:\t" + returnValue);
    returnValue = false;
  }
}