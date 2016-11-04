// var mongoose = require('mongoose');

module.exports = {
  // this will probably break everything but I can't find any info
  // on this string being created as an issue
  url = mongoose.connect('mongodb://localhost/dbname', function(err){
    if (err) throw err;
  });
}