const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/baitapphanquyen', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  const userSchema=mongoose.Schema({
      user:String,
      pass:String,
      role:String
  },{collection:'user'});
  const userModel= mongoose.model('user',userSchema);
  module.exports=userModel;
//   const hangSchema= mongoose.Schema({
//       ten:String,
//       gia:Number,
//       soluong:Number
//   },{collection:'hang'});
//   const hangModel=mongoose.model('hang',hangSchema);
//   module.exports=hangModel;