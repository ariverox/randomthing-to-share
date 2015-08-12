var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));





var pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  urlTitle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed']
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


pageSchema.pre('validate', function(next) {
  function generateUrlTitle(title) {
    if (typeof title !== 'undefined' && title !== '') {
      // Removes all non-alphanumeric characters from title
      // And make whitespace underscore
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Generates random 5 letter string
      return Math.random().toString(36).substring(2, 7);
    }
  }

  this.urlTitle = generateUrlTitle(this.title);


  next();

});

var userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});


pageSchema.virtual('routes').get(function() {
  return '/wiki/' + this.urlTitle;
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};
