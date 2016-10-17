/**
 * Insert values into the LevelDB database
 *
 * user.json must be of the form:
 *
 * {
 *  "name": "Alex Melville",
 *  "phone": "+3335557777",
 *  "friends": [
 *    {
 *      "name": "Caleb Samson",
 *      "phone": "+1112223333"
 *    },
 *    {
 *      "name": "Varun Kanwar",
 *      "phone": "+7779990000"
 *    }
 *    ...
 *  ]
 * }
 */
var co = require('bluebird').coroutine;
var db = require(__dirname + '/../api/models/leveldb');

if (process.argv.length !== 3) {
  throw Error('usage: node ka-tet/bin/insertLDB ka-tet/path/to/user.json');
}

var user = require(__dirname + '/../../' + process.argv[2]);
if (!user) {
  throw Error('invalid path to JSON user data');
}

var main = co(function *() {

  var res = yield db.put(user.name, user);
  res = yield db.get(user.name);
});

main();


