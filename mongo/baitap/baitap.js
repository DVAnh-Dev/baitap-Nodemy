const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newAnhDV', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  const user =mongoose.Schema({
    username:String,
    pass:String,
    email:String,
    age:Number,
    school:String
},
{connection:'user'}
);
const postb2 = mongoose.model('user',user);
postb2.create({
    username:'daoanh0909',
    pass:1234,
    email:'daoanh0909@gmail.com',
    age:22,
    school:'HACTECH'
},{
    username:'daoanh0000',
    pass:1234,
    email:'daoanh0909@gmail.com',
    age:22,
    school:'HACTECH'
},{
    username:'daoanh0003',
    pass:1234,
    email:'daoanh0909@gmail.com',
    age:22,
    school:'HACTECH'
}
,{
    username:'daoanh0004',
    pass:1234,
    email:'daoanh0909@gmail.com',
    age:22,
    school:'HACTECH'
})

.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
});
