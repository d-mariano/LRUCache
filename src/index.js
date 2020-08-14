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
let returnError = false;
let select;

console.log("Welcome!\n\nThe LRU Cache has been initialized with a value of 5. Please feel free to change it with the `init` command.");
while (select !== EXIT) {
  console.log("\nCommands:\n")
  console.log(GET + "\tGet a value from the cache based on a given key");
  console.log(PUT + "\tPut a given value in the cache with a given key");
  console.log(DEL + "\tDelete a given key from the cache");
  console.log(RESET + "\tReset the cache");
  console.log(INIT + "\tInitialize a new cache with a given size");
  console.log(EXIT + "\tExit");

  printCache();
  printReturn();
  printError();

  select = readLineSync.question("\nPlease enter a command (ex. put): ");

  try {

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

  } catch(err) {
    returnError = err.message;
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
  lruCache = new LRUCache(size);
  console.log('New cache initialized with size ' + size);
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

function printError() {
  if (returnError !== false) {
    console.log("\nCall Failed:\t" + returnError);
    returnError = false;
  }
}
