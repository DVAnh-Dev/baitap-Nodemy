const mongoose = require('mongoose');
const lopHocModel= require('./lophoc')
// immport mongoose để dùng  
 mongoose.connect('mongodb://localhost/newAnhDV', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
//connect 
// tạo mẫu bảng => 
const testSchema =mongoose.Schema({
    ten:String,
    lop:{
        type:String,
        ref:'lopHoc'
    },

    diem:[],
    thongtin:{
    sdt:Number,
    }

},
{collection:'hocsinhs'}
);
// câu lệnh tương tác với mẫu bảng vừa tạo 
const hocsinhTestModel = mongoose.model('hocsinhs',testSchema);
// hocsinhTestModel.create({
//     ten:"VAnh",
//     lop:10,
//     diem:[10,9,8],
//     thongtin:{
//         sdt:0874565457,
//     }
// })
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });
// hocsinhTestModel.find({ _id: '60935ebc60d02b0a4c7d92cc'})
// // .limit(3)
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });
// buổi 2
hocsinhTestModel.find()
.populate('lop')
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
});
module.exports= hocsinhTestModel;
