/**
 * Created by alex on 10/16/16.
 */

var Promise = require('bluebird');
var co = Promise.coroutine;
var levelup = require('level');

var db = Promise.promisifyAll(levelup(__dirname + '/../../db', {
  valueEncoding: 'json'
}));

/**
 * inserts a key-value pair into the LevelDB. key must be a string, value must be valid JSON
 */
var put = co(function *(key, value) {
  if (typeof key !== 'string' || typeof value !== 'object') {
    throw Error('invalid key value parameters');
  }
  yield db.putAsync(key, value);
});

/**
 * fetches a value from LevelDB by key
 */
var get = co(function *(key) {
  if (typeof key !== 'string') {
    throw Error('invalid key parameter');
  }
  return db.getAsync(key);
});


module.exports = exports = {
  put: put,
  get: get
};