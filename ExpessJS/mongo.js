const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.lqtw9.mongodb.net/testDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

const userSchema= mongoose.Schema({
    user:String,
    password:String,
    role:String,
    avatar:String
},{collection:'user'});
const userModel = mongoose.model('user',userSchema);
module.exports= userModel;