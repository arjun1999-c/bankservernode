const express = require('express');
const session = require('express-session');
const dataservice = require('./services/data.service');
const app = express();


app.use(session({
    secret:"randomsecurestring",
    resave:false,
    saveUninitialized:false
}));

app.use(express.json());

app.use((req,res,next)=>{
     console.log("middleware")
    
    next();
  
})
const logmiddleware =(req,res,next)=>{
    console.log(req.body);
    next();
}
app.use(logmiddleware)

const authmiddleware = (req,res,next)=>{
    if(!req.session.currentuser){
        return res.json( {
          statusCode:401,
            status:false,
            message:"pls log in"
        })
     
       }
       else{
           next();
       }
}


app.get('/', (req, res) => {
    res.status(401).send("THIS IS A GET METHOD");
});
//POST . CREATE

app.post('/', (req, res) => {
    res.send("THIS IS A POST METHOD");
});
//POST.REGISTER
app.post('/register', (req, res) => {
//console.log(req.body);
 dataservice.register(req.body.acno, req.body.username, req.body.password)
 .then(result=>{
    res.status(result.statusCode).json(result)
 })
  
 //console.log(res.status(result.statusCode).json(result));
    //res.send("THIS IS A POST METHOD")
});
//POST.LOGIN
app.post('/login', (req, res) => {
    //console.log(req.body);

 dataservice.login(req,req.body.acno,req.body.password)
      .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
    
});
//POST.DEPOSIT
app.post('/Deposit',authmiddleware,(req,res) => {
console.log(req.session.currentuser);
//console.log(req.body);
    const result = dataservice.Deposit(req.body.acno, req.body.password,req.body.amount);
    res.status(result.statusCode).json(result)
 //console.log(res.status(result.statusCode).json(result));
    //res.send("THIS IS A POST METHOD")
});
//POST.WITHDRAW
app.post('/Withdraw',authmiddleware,(req, res) => {
    //console.log(req.body);

    const result = dataservice.Withdraw(req.body.acno, req.body.password,req.body.amount);
    res.status(result.statusCode).json(result)
 //console.log(res.status(result.statusCode).json(result));
    //res.send("THIS IS A POST METHOD")
});



//PATCH. UPDATE OR MODIFY PARTIALLY
app.patch('/', (req, res) => {
    res.send("THIS IS A PATCH METHOD");
});
//PUT //UPDATE/MODIFY ALL
app.put('/', (req, res) => {
    res.send("THIS IS A PUT METHOD");
});
//DELETE.DELETE
app.delete('/', (req, res) => {
    res.send("THIS IS A DELETE METHOD");
});


app.listen(3000, () => {
    console.log("server started at port:3000");
})
