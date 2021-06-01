const db = require('./db');
let currentuser;
accountDetails= {
    1000: { acno: 1000, username: "userone", password: "1000", balance: 50000 },
    1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
    1002: { acno: 1002, username: "userthree", password: "userthree", balance: 10000 },
    1003: { acno: 1003, username: "userfour", password: "userfour", balance: 6000 }
  }

   const register =(acno,username,password)=>{
     return db.user.findOne({acno})
     .then(user=>{
       if(user){
         return {
           statusCode:422,
           status:false,
           message:"user exist please login"
         }
       }
       else{
         const newuser = new db.user(
           {
            acno,
            username,
            password,
            balance:0
           }
         )
newuser.save();
        return{
          statusCode:200,
            status:true,
message:"succesfully registered"
        }
       
  
      }
     })
  
  }
  const login =(req,acno, password)=>{
    var acno= parseInt(acno);
    return db.user.findOne({acno,password})
    .then(user=>{
      if(user){
        req.session.currentuser=user
        return{
          statusCode:200,
            status:true,
            message:"login successfully "
        }

      }
      else{
          return{
            statusCode:422,
              status:false,
              message:"invalid credentials "
          }
      }
    })

  
  }
 const Deposit=(acno,password,amn) =>{
   var amount = parseInt(amn);
   return db.user.findOne({acno,password})
   .then(user=>{
     if(!user){
      return{
        statusCode:422,
          status:false,
          message:"invalid credentials "
      }
     }
     user.balance+=amount;
     user.save();
     return{
      statusCode:200,
        status:true,
        balance: user.balance,
        message:amount + " credited and new balance is "+ user.balance
    }
   })

    } 
    const Withdraw=(acno,password,amn)=>{

      var amount = parseInt(amn);
      return db.user.findOne({acno,password})
      .then(user=>{
        if(!user){
          return{
            statusCode:422,
              status:false,
              message:"invalid credential "
          }

        }
        user.balance-=amount;
     user.save();
     return{
      statusCode:200,
        status:true,
        balance: user.balance,
        message:amount + " debited and new balance is "+ user.balance
    }
      })
      // let users =accountDetails;
      // if(acno in users){
      //   if(password==users[acno]["password"]){
      //     if(users[acno]["balance"]> amount){
      //       users[acno]["balance"]-=amount;
      //       return{
      //         statusCode:200,
      //           status:true,
      //           balance: users[acno]["balance"],
      //           message:amount + " debited and new balance is "+ users[acno]["balance"]
      //       }

      //     }
      //     else{
      
      //       return{
      //         statusCode:422,
      //           status:false,
      //           message:"insufficient balance"
      //       }
      //     }
          
      //   }
      //   else{
          
      //     return{
      //       statusCode:422,
      //         status:false,
      //         message:"incorrect password"
      //     }
            



      //   }
      // }
      //   else{

      //     return{
      //       statusCode:422,
      //         status:false,
      //         message:"invalid account "
      //     }
      //   }
      }
  module.exports={
      register,
      login,
      Deposit,
      Withdraw
  }