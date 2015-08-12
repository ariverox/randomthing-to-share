var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:  {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:   {type: String, required: true},
  status:   {type: String, enum:['open','closed']},
  date: {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var userSchema = new mongoose.Schema({
  name: {first: {type: String, required: true}, last: {type: String, required: true}},
  email: {type: String, required: true, unique:true}
});

var route = pageSchema.virtual(urlTitle).get (function(){
  return urlTitle;
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};
