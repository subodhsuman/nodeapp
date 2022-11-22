import bukUser from "../Models/booking_user.js";
import reply from "../Common/reply.js";
import Validator from "validatorjs";


export default{
   bookUser:async (req,res)=>{
      let requrest=req.body;

      let valid = {
        fullname:'required|string',
        phone:'required|numeric|digits:10',
        type:'required|string|in:user,owner',
        parament_addres:'required_if:type,user|required_if:type,owner|string',
        current_address:'required_if:type,user|string',
        gender:'required|string',
        country:'required|string'

        // password: 'required|string|min:6|same:confirm_password',
         
      };

      let validation = new Validator(requrest,valid);
          
      if(validation.fails()){
         let shwErr=Object.keys(Object.entries(validation.errors)[0][1])[0];
          return res.json(reply.failed(validation.errors.first(shwErr)))
      }  

      const valType = await bukUser.findOne({ where: { type:requrest.type }});
      console.log("value of type",valType);

 
      try{
         var bukuUserData=await bukUser.create(requrest)
         res.json(reply.success("user booking successfully",bukuUserData))
      }catch(error){
           res.json(reply.failed("unBooking User!",error))
      }
      
      
    },
    
    getBokUser:async (req,res)=>{
               var request=req.body
              //    console.log("user",request);
            let valid = {
                   type:'required|string|in:user,owner',
                 
              };
        
              let validation = new Validator(request,valid);
                  
              if(validation.fails()){
                 let shwErr=Object.keys(Object.entries(validation.errors)[0][1])[0];
                  return res.json(reply.failed(validation.errors.first(shwErr)))
              } 

            
          try {
            const getAllData= await bukUser.findAll({ where: { type:request.type } });
            console.log("slslslsls",getAllData)
         
            // return res.json({ "status": "1", "message": "User login successfully",data:getEmail})
             return res.json(reply.success("booking user fetch successfully",{data:getAllData}))
  
        }catch(error){
              res.json(reply.failed("user does not found"))
        }



    }




}

