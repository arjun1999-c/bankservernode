const express= require('express');
const app= express();

app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD")
})
//POST . CREATE

app.post('/',(req,res)=>{
    res.send("THIS IS A POST METHOD")
})
//PATCH. CREATE
app.patch('/',(req,res)=>{
    res.send("THIS IS A PATCH METHOD")
})
//DELETE.DELETE
app.delete('/',(req,res)=>{
    res.send("THIS IS A DELETE METHOD")
})


app.listen(3000,()=>{
    console.log("server started at port:3000");
})
