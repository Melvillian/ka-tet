/**
 * Node script to fetch a random friend + friend's phone number from the user's dictionary of friends
 * and send that information to the user.
 *
 * This script is designed to be run by a cronjob once a day at a user-specified time and make a call to
 * the LevelDB database to retrieve the friend's list of contacts
 */

var random = require('random-js')();
var Promise = require('bluebird');

var sendMessage = require(__dirname + '/../api/controllers/sms');

var db = require(__dirname + '/../api/models/leveldb');

var main = function() {
  // get username
  if (process.argv.length !== 3) {
    throw Error('usage: node bin/send_message.js <username>');
  }
  var username = process.argv[2];

  // sanitize input
  var usernameSafe = username.match(new RegExp(/[0-9a-zA-Z ]+/));
  if (usernameSafe === null || usernameSafe[0].length !== username.length) {
    throw Error('invalid username given');
  }

  // fetch user info and choose random friend
  return db.get(username)
  .then(function(user) {
    var recipient = user.phone;

    var index = random.integer(0, user.friends.length - 1);
    var friend = user.friends[index];

    return sendMessage(recipient, friend.name, friend.phone)
  })
  .then(function(res) {
    console.log('send success!');
    console.dir(res);
  })
  .catch(function(err) {
    throw Error(err);
  });
};

main();
