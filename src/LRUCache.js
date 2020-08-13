/**
 * LRUCache - An LRU (Least Recently Used) cache implementation
 */
class LRUCache {
  cacheBack = null;
  cacheFront = null;
  cacheSize = 0;
  numNodes = 0;

  constructor(cacheSize) {
    if (isNaN(cacheSize)) {
      throw cacheSize + ' is not a number!';
    }
    this.cacheSize = cacheSize;
  }

  /**
   * Retrieve a value from the cache by its key
   * 
   * @param {*} key Key to lookup value for
   * @returns {*} Value of key, if key exists in cache, else null
   */
  get(key) {
    let node = this.getNode(key);

    if (!node) {
      return null;
    }

    this.setCacheFront(node);

    return node ? node.value : null;
  }

  /**
   * Retrieve a node from the cache by its key
   * 
   * The targetted key will be brought to the front of the cache if it exists,
   * otherwise null is returned and the cache remains the same.
   *
   * @param {*} key Key to lookup
   * @returns {*} Node associated with key, if key exists in cache, else null
   */
  getNode(key) {
    let node = this.cacheFront;
    if (!node) {
      return null;
    }

    while (node) {
      if (node.key != key) {
        node = node.next;
        continue;
      }
      return node;
    }
    return null;
  }

  /**
  * Put a key/value pair into the cache
  * 
  * If a key already exists it will be overwritten and brought to the front of
  * the cache, otherwise a new key will be added to the front of the cache.
  * 
  * Upon adding a new key, if the cache is at its max-size then the 
  * least recently used key will be removed from the cache to make room for the
  * new key.
  *
  * @param {*} key Key to lookup
  * @returns {*} Node associated with key, if key exists in cache, else null
  */
  put(key, value) {
    let node = this.getNode(key);
    if (node) {
      node.value = value;
      this.setCacheFront(node);
      return;
    }

    if (this.numNodes == this.cacheSize) {
      this.cacheBack = this.cacheBack.prev;
      this.cacheBack.next = null;
    } else {
      this.numNodes++;
    }

    node = new Node(key, value);
    this.setCacheFront(node);

    if (!this.cacheBack) {
      this.cacheBack = this.cacheFront;
    }
  }

  /**
   * Set the front of the cache with the given node
   * 
   * If the node is already at the front, the cache remains unchanged. In the
   * event the node is at the back, its previous node becomes the new back of 
   * the cache.
   * 
   * @param {*} node 
   */
  setCacheFront(node) {
    if (!node) {
      return;
    }

    if (this.cacheFront && this.cacheFront.key == node.key) {
      return;
    }

    // If node is neither at the front or back
    if (node.next && node.prev) {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }
    // If node is at the back and has a previous node
    else if (node.prev && !node.next) {
      node.prev.next = null;
      this.cacheBack = node.prev;
    }
    
    node.prev = null;

    if (this.cacheFront) {
      node.next = this.cacheFront;
      node.next.prev = node;
    }

    this.cacheFront = node;
  }

  /**
   * Deletes a node from the cache by its key
   *
   * In the event the provided key does not exist, the cache will remain the
   * same.
   *
   * @param {*} key Key to delete
   */
  del(key) {
    let node = this.getNode(key);
    if (!node) {
      return;
    }

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.cacheFront = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.cacheBack = node.prev;
    }

    this.numNodes--;
  }

  /**
   * Resets the cache, resulting in an empty cache
   */
  reset() {
    this.cacheBack = this.cacheFront = null;
    this.numNodes = 0;
  }

  /**
   * Returns an array of objects representing the cash order and key/values
   * 
   * This is to be used for testing only and debugging, the cache itself
   * shouldn't need to be stored in an array.
   */
  getCache() {
    let node = this.cacheFront;
    let cache = []
    while (node) {
      cache.push({
        key: node.key,
        value: node.value
      });
      node = node.next;
    }
    return cache;
  }
}

/**
 * Node - Represents a node of a doubly-linked list, w/ key and value properties
 */
class Node {
  next = null;
  prev = null;
  key;
  value;

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

module.exports = LRUCache;
