
import Validator from "validatorjs";
import reply from "../Common/reply.js";
import  bcrypt from "bcrypt"
import fs from "fs";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import Token from "../Models/token.js";
import User from "../Models/userModel.js";

import nodemailer from  "nodemailer"
import otpTable from "../Models/save_Otp.js";

import resetOtp from "../Models/reset_Otp.js";



export default{
    registerUser:async (req,res)=>{
        let request=req.body;

        //  console.log(req?.files?.filename,"abcde");
        // if (req.files.length <= 0) {
        //   return res.json(reply.failed(`You must select at least 1 file.`));
        // }

        //  let c = req?.files
          
        //  let arr=[]
         
        //    c.forEach(function (value, i) {
        //       arr.push(value.filename);
              
        //  });
        //  console.log("image data",arr)

        let rules = {
            fullname:'required|string',
            email:'required|email|string',
            password: 'required|string|min:6|same:confirm_password|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
            // image:'array'
             
          };

          let validation = new Validator(request,rules);
          
          if(validation.fails()){
             let shwErr=Object.keys(Object.entries(validation.errors)[0][1])[0];
              return res.json(reply.failed(validation.errors.first(shwErr)))
          } 

          const project = await User.findOne({ where: {email:request?.email } });
          // console.log("projcet",project.password)
          if(project){
            return res.json(reply.failed("email already exist"))
          }
        
            request.password = await bcrypt.hash(request.password, 10)

        //  if(arr===[]){
        //      res.json(reply.failed("image feild is required"))
        //  }
       


          // request.image=arr;
          try {
            const user= await User.create(request);
             return res.json(reply.success("user create successfully",user))
            
          } catch (error) {
            console.log("err",error);
                return res.json(reply.failed("Invalid User",error));
          }

          
    },
    
          /*********************** login api *******************/

       loginUser:async (req,res)=>{
         let request=req.body
        //  console.log("request",request);

          let rules = {
            email:'required|email|string',
            password: 'required|string|min:6|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
             
          };
          let validation = new Validator(request,rules);
          
          if(validation.fails()){
             let shwErr=Object.keys(Object.entries(validation.errors)[0][1])[0];
              return res.json(reply.failed(validation.errors.first(shwErr)))
          } 

          let getEmail=await User.findOne({ where: {email:request.email } })
          // console.log("a",getEmail.f_2a)
          
          if(!getEmail){
              res.json(reply.failed("invalid User!"))
          }

          const pwd=getEmail?.password;

          if(pwd){
              const result = await bcrypt.compare(request.password,pwd)

              if(!result){
                res.json(reply.failed("invlid credentitial"))
            }
          }
          
          var privateKey = fs.readFileSync("./keys/private.pem",'utf-8');
          var cryptos = crypto.randomBytes(50).toString('hex');
          // console.log("private kye",privateKey);

          var token = jwt.sign({cryptos},privateKey, { expiresIn: '1h',algorithm: 'RS256' });
          // console.log("token",token)

             await Token.create({t_id:cryptos, u_id:getEmail?.id, email:getEmail.email})


              
              /**********  OTP section*******************/
              
              let otp=Math.random()*1000000;

          try{
            if(getEmail.f_2a==1){
              await otpTable.create({u_id:getEmail?.id,email:getEmail.email,otp:Math.floor(otp)})
             
              let transporter= nodemailer.createTransport({
                service:'gmail',
                
                auth:{
                  user: 'subodhsuman1stm@gmail.com',
                  pass:'lpptwpdysepgvvlb'
              
                }
              });

   
        let mailOptions = {
            from: '"Node mailer" <noreply@gmail.com>',
            to: 'skguta@yopmail.com',
            subject: 'otp create successfully',
            text:'New Post from',
            html:`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CoinAvx Pvt. Ltd.</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing CoinAvx Pvt. Ltd.. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${Math.floor(otp)}</h2>
              <p style="font-size:0.9em;">Regards,<br />CoinAvx Pvt. Ltd.</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>CoinAvx Pvt. Ltd. Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
              </div>
            </div>
          </div>`
            
        }
        transporter.sendMail(mailOptions, function(err, data) {
            if(err) {
                console.log('Error Occurs',err);
            } else {
                console.log('Email sent successfully');
            }
        });

    
          res.json(reply.success("otp create is succesfully",{your_otp_is :Math.floor(otp)}));

    }
    } catch(error){
        res.status(500).json(error);
        console.log(error);
    }
  
    if(getEmail.f_2a==0){
         res.json(reply.success("user login successfully",{token,getEmail}));
    }
      
    
          

    },


    /*********************** login end *******************/



    /*********************** OTP Verify *******************/


    otpVerify:async (req,res)=>{
        const request=req.body;

         const valid={
          otp:'required|digits:6|numeric',
          email:'required|string'

         }
      const vldt=new Validator(request,valid)

      if(vldt.fails()){
         const err=Object.keys(Object.entries(vldt.errors)[0][1])[0]
          return res.json(reply.failed(vldt.errors.first(err)));
      }
        

        let getData=await otpTable.findOne({where: {email:request.email} })
        const otp=getData.otp;

        if(request.otp==otp){
          var cryptos = crypto.randomBytes(50).toString('hex');
          var privateKey = fs.readFileSync("./keys/private.pem",'utf-8');
          var token = jwt.sign({cryptos},privateKey, { expiresIn: '1h',algorithm: 'RS256' });
          res.json(reply.success("otp verifed" ,{token:token,email:getData.email}))

             
        }else{
          res.json(reply.failed("otp invalid"))
        }
    

           

    },



   forgetOtp:async (req,res)=>{
       let request=req.body;

        let da={
          email:'required|email|string',
        }

        let validation = new Validator(request,da);
          
        if(validation.fails()){
           let s=Object.keys(Object.entries(validation.errors)[0][1])[0];
            return res.json(reply.failed(validation.errors.first(s)))
        }

       var rndmString = crypto.randomBytes(50).toString('hex');
       const get_email=await User.findOne({ where: {email:request?.email } });

       console.log("g>>>",get_email.email);
       
       try{
         let form_data= {
          email:request.email,
          tokenString:rndmString,
          expire_at:''
         }
         await resetOtp.create(form_data)
           res.json(reply.success("send token in your email ",form_data))

       }catch(err){
             res.json(reply.failed(err))
       }

         


  },

  resetPassword :async (req,res)=>{
      const request=req.body;
      console.log(request)
      
      let rules = {
        new_password: 'required|string|min:6',
        confirm_password:'required|string|min:6',
        // image:'array'
         
      };

      let validation = new Validator(request,rules);
      
      if(validation.fails()){
         let shwErr=Object.keys(Object.entries(validation.errors)[0][1])[0];
          return res.json(reply.failed(validation.errors.first(shwErr)))
      } 


      let getToken = await resetOtp.findOne({ where: { tokenString: req.query.tokenString} });
      console.log("token>>>>",getToken.tokenString);
      

              try{
                if(getToken){

                  if(request?.new_password===request?.confirm_password){
                      let has_password = await bcrypt.hash(request?.new_password, 10)
                      console.log("abcde",has_password);
   
                      await User.update({ password: has_password}, 
                       { 
                         where:{
                           email:getToken?.email
                         }
                       })
            
                  }
             
            
             }
              return  res.json(reply.success("Reset password update successfully!"))
              }catch(err){
                return res.json(reply.failed("Reset update failed!!"))
              }
      

  

    

  },
  LogOut :async (req,res)=>{
     const requ= req.t_id;
     console.log(requ,"gggggggggg");
      await Token.destroy({where: {t_id:req.t_id}})
       try{
        return res.json(reply.success("logout successfully"))
       }catch(err){
          return res.json(reply.failed(err))
       }

  },
  hardLogout:async (req,res)=>{

    const requ= req.u_id;
    console.log("mmm",requ)
    await Token.destroy({where: {u_id:req.u_id}})
    try{
       return res.json(reply.success("hard logout successfully"))
    }catch(err){
      return res.json(reply.failed(err))
    }
     
  },



     /*********************** get user  *******************/


    getUser: async (req, res) => {
       var request = req.user;
      // console.log("pagal",request);
      try {
           
        // number of records per page
        let offset = 0;
        User.findAndCountAll().then((data) => {
          // console.log("priya",data)

          let page = parseInt(req.query.page);   // page number
          let limit = parseInt(req.query.limit ) // number of records per page
          let pages = Math.ceil(data.count / limit); // total pages count
          let currentPage = page ? +page : 0; //current page show
          let prviousPage=page ? parseInt(page-1) :0; //previous page show data
          let nextPage=page ? parseInt(page+1) :0;
          console.log("nextpage",nextPage);

          // console.log(prviouspage,"ABCDEDF");
        
          offset = limit * (page - 1);


     User.findAll({
        
            limit: limit,
            offset: offset,
            // order: [["roll_number", "ASC"]],
            $sort: { id: 1 }
          })
          .then((users) => {
            res.json(reply.success("user get successfully",{'result': users, 'perpage':limit, 'current_page':currentPage, 'pages': pages, 'previous_page':prviousPage,'next_page':nextPage, 'totaldata': data.count}));
          });
        })
             

      }
      catch (error) {
          console.log(error)
          // res.json({ "status": "0", "message": "server is busy right now" })
          res.json(reply.failed("Internal Server Error"));

      } 


  },

     /*********************** get user admin side *******************/

  getuser:async(req,res)=>{
        //  var request=req.body;
         try{
            if(request.role=='admin'){
              const getAllUser = await User.findAll({});
              res.json(reply.success("admin get successfully",{data:getAllUser}))
            }

         }catch(err){
             console.log(err)
            res.json(reply.failed(err))
         }
  }


}

