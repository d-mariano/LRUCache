const expect = require('chai').expect;
const LRUCache = require('../src/LRUCache');

describe('LRUCache', function() {
  var lruCacheSize = 5;
  var lruCache = new LRUCache(lruCacheSize);
  
  describe('put', function() {
    var tests = [
      { 
        key: 'apple',
        value: 'orange',
        cacheSize: 1,
        cacheValue: [
          { key: 'apple', value: 'orange' }
        ]
      },
      { 
        key: 'dog',
        value: 'cat',
        cacheSize: 2,
        cacheValue: [
          { key: 'dog', value: 'cat' },
          { key: 'apple', value: 'orange' }
        ] 
      },
      { 
        key: 'bike',
        value: 'car',
        cacheSize: 3,
        cacheValue: [
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' },
          { key: 'apple', value: 'orange' }
        ] 
      },
      {
        key: 'walk',
        value: 'sprint',
        cacheSize: 4,
        cacheValue: [
          { key: 'walk', value: 'sprint' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' },
          { key: 'apple', value: 'orange' }
        ]
      },
      { 
        key: 'walk',
        value: 'run',
        cacheSize: 4,
        cacheValue: [
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' },
          { key: 'apple', value: 'orange' }
        ] 
      },
      {
        key: 'chair',
        value: 'bench',
        cacheSize: 5,
        cacheValue: [
          { key: 'chair', value: 'bench' },
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' },
          { key: 'apple', value: 'orange' }
        ]
      },
      { 
        key: 'cake', 
        value: 'pie',
        cacheSize: 5,
        cacheValue: [
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'bench' },
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' }
        ] 
      },
      {
        key: 'chair',
        value: 'table',
        cacheSize: 5,
        cacheValue: [
          { key: 'chair', value: 'table' },
          { key: 'cake', value: 'pie' },
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' }
        ]
      }
    ];

    tests.forEach(function(test) {
      it('Put key ' + test.key + ' w/ value ' + test.value + "\n\t    Expected Cache Size: " + test.cacheSize + '/' + lruCacheSize + "\n\t    Expected Cache Value: " + JSON.stringify(test.cacheValue), function() {
        lruCache.put(test.key, test.value);
        expect(lruCache.numNodes).to.equal(test.cacheSize);
        expect(lruCache.getCache()).to.deep.equal(test.cacheValue);
      });
    });

  });

  describe('get', function () {
    var tests = [
      {
        key: 'apple',
        returnValue: null,
        cacheValue: [
          { key: 'chair', value: 'table' },
          { key: 'cake', value: 'pie' },
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' }
        ]
      },
      {
        key: 'chair',
        returnValue: 'table',
        cacheValue: [
          { key: 'chair', value: 'table' },
          { key: 'cake', value: 'pie' },
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' }
        ]
      },
      {
        key: 'cake',
        returnValue: 'pie',
        cacheValue: [
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'table' },
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' }
        ]
      }, ,
      {
        key: 'dog',
        returnValue: 'cat',
        cacheValue: [
          { key: 'dog', value: 'cat' },
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'table' },
          { key: 'walk', value: 'run' },
          { key: 'bike', value: 'car' }
        ]
      }, ,
      {
        key: 'walk',
        returnValue: 'run',
        cacheValue: [
          { key: 'walk', value: 'run' },
          { key: 'dog', value: 'cat' },
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'table' },
          { key: 'bike', value: 'car' }
        ]
      }, ,
      {
        key: 'bike',
        returnValue: 'car',
        cacheValue: [
          { key: 'bike', value: 'car' },
          { key: 'walk', value: 'run' },
          { key: 'dog', value: 'cat' },
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'table' }
        ]
      },

    ];

    tests.forEach(function (test) {
      it('Get key ' + test.key + "\n\t    Expected Return Value: " + test.returnValue + "\n\t    Expected Cache Value: " + JSON.stringify(test.cacheValue), function () {
        expect(lruCache.get(test.key)).to.equal(test.returnValue);
        expect(lruCache.getCache()).to.deep.equal(test.cacheValue);
      });
    });
  });

  describe('del', function () {
    var tests = [
      {
        key: 'apple',
        cacheSize: 5,
        cacheValue: [
          { key: 'bike', value: 'car' },
          { key: 'walk', value: 'run' },
          { key: 'dog', value: 'cat' },
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'table' }
        ]
      },
      {
        key: 'walk',
        cacheSize: 4,
        cacheValue: [
          { key: 'bike', value: 'car' },
          { key: 'dog', value: 'cat' },
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'table' }
        ]
      },
      {
        key: 'dog',
        cacheSize: 3,
        cacheValue: [
          { key: 'bike', value: 'car' },
          { key: 'cake', value: 'pie' },
          { key: 'chair', value: 'table' }
        ]
      },
      {
        key: 'chair',
        cacheSize: 2,
        cacheValue: [
          { key: 'bike', value: 'car' },
          { key: 'cake', value: 'pie' }
        ]
      }
    ];

    tests.forEach(function (test) {
      it('Delete key ' + test.key + "\n\t    Expected Cache Size: " + test.cacheSize + '/' + lruCacheSize + "\n\t    Expected Cache Value: " + JSON.stringify(test.cacheValue), function () {
        lruCache.del(test.key)
        expect(lruCache.numNodes).to.equal(test.cacheSize);
        expect(lruCache.getCache()).to.deep.equal(test.cacheValue);
      });
    });
  });

  describe('put after del', function () {
    var tests = [
      {
        key: 'apple',
        value: 'orange',
        cacheSize: 3,
        cacheValue: [
          { key: 'apple', value: 'orange' },
          { key: 'bike', value: 'car' },
          { key: 'cake', value: 'pie' }
        ]
      },
      {
        key: 'dog',
        value: 'cat',
        cacheSize: 4,
        cacheValue: [
          { key: 'dog', value: 'cat' },
          { key: 'apple', value: 'orange' },
          { key: 'bike', value: 'car' },
          { key: 'cake', value: 'pie' }
        ]
      },
      {
        key: 'bike',
        value: 'plane',
        cacheSize: 4,
        cacheValue: [
          { key: 'bike', value: 'plane' },
          { key: 'dog', value: 'cat' },
          { key: 'apple', value: 'orange' },
          { key: 'cake', value: 'pie' }
        ]
      }
    ];

    tests.forEach(function (test) {
      it('Put key ' + test.key + ' w/ value ' + test.value + "\n\t    Expected Cache Size: " + test.cacheSize + '/' + lruCacheSize + "\n\t    Expected Cache Value: " + JSON.stringify(test.cacheValue), function () {
        lruCache.put(test.key, test.value);
        expect(lruCache.numNodes).to.equal(test.cacheSize);
        expect(lruCache.getCache()).to.deep.equal(test.cacheValue);
      });
    });
  });

  describe('reset', function () {
    it('Reset cache', function () {
      lruCache.reset();
      expect(lruCache.numNodes).to.equal(0);
      expect(lruCache.getCache()).to.deep.equal([]);
    });
  });

  describe('put after reset', function () {
    var tests = [
      {
        key: 'soda',
        value: 'pop',
        cacheSize: 1,
        cacheValue: [
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'red',
        value: 'green',
        cacheSize: 2,
        cacheValue: [
          { key: 'red', value: 'green' },
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'granola',
        value: 'bar',
        cacheSize: 3,
        cacheValue: [
          { key: 'granola', value: 'bar' },
          { key: 'red', value: 'green' },
          { key: 'soda', value: 'pop' }
        ]
      }
    ];

    tests.forEach(function (test) {
      it('Put key ' + test.key + ' w/ value ' + test.value + "\n\t    Expected Cache Size: " + test.cacheSize + '/' + lruCacheSize + "\n\t    Expected Cache Value: " + JSON.stringify(test.cacheValue), function () {
        lruCache.put(test.key, test.value);
        expect(lruCache.numNodes).to.equal(test.cacheSize);
        expect(lruCache.getCache()).to.deep.equal(test.cacheValue);
      });
    });
  });

  describe('get after reset', function () {
    var tests = [
      {
        key: 'granola',
        returnValue: 'bar',
        cacheValue: [
          { key: 'granola', value: 'bar' },
          { key: 'red', value: 'green' },
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'red',
        returnValue: 'green',
        cacheValue: [
          { key: 'red', value: 'green' },
          { key: 'granola', value: 'bar' },
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'apple',
        returnValue: null,
        cacheValue: [
          { key: 'red', value: 'green' },
          { key: 'granola', value: 'bar' },
          { key: 'soda', value: 'pop' }
        ]
      }
    ];

    tests.forEach(function (test) {
      it('Get key ' + test.key + "\n\t    Expected Return Value: " + test.returnValue + "\n\t    Expected Cache Value: " + JSON.stringify(test.cacheValue), function () {
        expect(lruCache.get(test.key)).to.equal(test.returnValue);
        expect(lruCache.getCache()).to.deep.equal(test.cacheValue);
      });
    });
  });

  describe('del after reset', function () {
    var tests = [
      {
        key: 'red',
        cacheSize: 2,
        cacheValue: [
          { key: 'granola', value: 'bar' },
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'red',
        cacheSize: 2,
        cacheValue: [
          { key: 'granola', value: 'bar' },
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'granola',
        cacheSize: 1,
        cacheValue: [
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'chair',
        cacheSize: 1,
        cacheValue: [
          { key: 'soda', value: 'pop' }
        ]
      },
      {
        key: 'soda',
        cacheSize: 0,
        cacheValue: []
      },

    ];

    tests.forEach(function (test) {
      it('Delete key ' + test.key + "\n\t    Expected Cache Size: " + test.cacheSize + '/' + lruCacheSize + "\n\t    Expected Cache Value: " + JSON.stringify(test.cacheValue), function () {
        lruCache.del(test.key)
        expect(lruCache.numNodes).to.equal(test.cacheSize);
        expect(lruCache.getCache()).to.deep.equal(test.cacheValue);
      });
    });
  });

  describe('init', function () {
    it('Init cache to 3', function () {
      lruCache= new LRUCache(3);
      expect(lruCache.numNodes).to.equal(0);
      expect(lruCache.cacheSize).to.equal(3);
      expect(lruCache.getCache()).to.deep.equal([]);
    });


    it('Init cache to apple should throw error', function () {
      expect(() => { lruCache = new LRUCache('apple') }).to.throw(Error);
    });

    it('Init cache to 1', function () {
      lruCache = new LRUCache(1);
      expect(lruCache.numNodes).to.equal(0);
      expect(lruCache.cacheSize).to.equal(1);
      expect(lruCache.getCache()).to.deep.equal([]);
    });

    it('Put key apple w/ value orange should add to cache', function () {
      lruCache.put('apple', 'orange');
      expect(lruCache.numNodes).to.equal(1);
      expect(lruCache.getCache(), [{ key: 'apple', value: 'orange' }]);
    });

    it('Get value of apple should return orange', function () {
      expect(lruCache.get('apple'), 'orange');
      expect(lruCache.getCache(), [{ key: 'apple', value: 'orange' }]);
    });

    it('Put key grape w/ value juice should add to cache and bump out apple', function () {
      lruCache.put('grape', 'juice');
      expect(lruCache.numNodes).to.equal(1);
      expect(lruCache.getCache(), [{ key: 'grape', value: 'juice' }]);
    });

    it('Get value of apple after putting grape should return null', function () {
      expect(lruCache.get('apple'), null);
      expect(lruCache.getCache(), [{ key: 'grape', value: 'juice' }]);
    });

    it('Get value of grape should return juice', function () {
      expect(lruCache.get('grape'), 'juice');
      expect(lruCache.getCache(), [{ key: 'grape', value: 'juice' }]);
    });

  });

});
