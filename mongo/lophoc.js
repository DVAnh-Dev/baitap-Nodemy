const mongoose = require('mongoose');
const hocsinhTestModel= require('./mongoose')
mongoose.connect('mongodb://localhost/newAnhDV', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const lopHocSchema =mongoose.Schema({
    tenLop:String,
    hocSinh:{
        type:String,
        ref:'hocsinh',
    },

    diem:[],
    giaoVien:{
    sdt:Number,
    ten:String,

    // ref:'giaovien'
    }
},
{collection:'lopHoc'}
);
const lopHocModel = mongoose.model('lopHoc',lopHocSchema);
module.exports= lopHocModel;
lopHocModel.create({
    tenLop:"K10",
    hocSinh:'VAnh',
    diem:[10,9,8],
    giaoVien:{
        sdt:0874565457,
         ten:"VANh",
    }
})
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
});
