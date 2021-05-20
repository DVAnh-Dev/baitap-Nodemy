const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/newAnhDV', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  
