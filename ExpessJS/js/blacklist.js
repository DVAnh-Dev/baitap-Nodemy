const mongoose = require('mongoose');
 
 mongoose.connect('mongodb+srv://admin:admin@cluster0.lqtw9.mongodb.net/testDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const blacklistSchema = mongoose.Schema({
  token:String
},{connection:'blacklist'});

const blacklistModel= mongoose.model('blacklist',blacklistSchema);

module.exports =blacklistModel;

blacklistModel.create({
  token:'321321321'
}).then(data=>{
  console.log(data);
}).catch(err=>{console.log(err);})