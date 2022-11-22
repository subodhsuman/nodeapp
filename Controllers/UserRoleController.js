import userRole from "../Models/user_role.js";
import reply from "../Common/reply.js";
import Validator from "validatorjs";
import User from "../Models/userModel.js";


export default{

    getUserRoll:async (req,res)=>{
        const request=req.body;

        let rules = {
            rolename:'required|string',
            name:'required|string'
          };

          let validation = new Validator(request,rules)
          
          if(validation.fails()){
             let shwErr=Object.keys(Object.entries(validation.errors)[0][1])[0];
            return res.json(reply.failed(validation.errors.first(shwErr)))
          } 


        try{

            let role = await userRole.create(request)
            res.json(reply.success("role created", role))
        }catch(err){
            console.log(res.json(reply.failed("user role does not created",err)))
        }


    },
    getRole: async (req,res)=>{
      let request=req.body;

      try {
        // const getRole=await User.findAll({where:{include:[{
        //   model:userRole
        //   // attributes: [ 'id', 'displayName', 'email' ]  
        // }] }})
        let condition = {where:{"rolename":request.rolename},include: { model: User , attributes: ['fullname']}}
        const getRluser=await userRole.findAll(condition);
        
      
        // console.log(getEmail,"obj");
        // return res.json({ "status": "1", "message": "User login successfully",data:getEmail})
         return res.json(reply.success("get role fetch successfully",{data:getRluser}))

    }
    catch (error) {
        console.log(error)
        // res.json({ "status": "0", "message": "server is busy right now" })
        res.json(reply.failed("User role not found"));

    }

    }









}




