const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bankApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const user = mongoose.model('user',{
    acno: Number,
     username: String,
      password:String,
       balance: Number
})
module.exports={
    user
}



