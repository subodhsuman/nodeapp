import condidate from "../Models/user_Conidiate.js";
import reply from "../Common/reply.js";
import Validator from "validatorjs";

export default{
     createConditate: async (req,res)=>{
        const request=req.body;
        // console.log("body",request);

                const flattened = {
                    cnd_name:'required|string',
                    cnd_state:'required|string',
                    cnd_age:'required|string',
                    cnd_mobile:'required|digits:10',
                    cnd_password:'required|string|min:6|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
                   "edu":"required|array",
                   'edu.*.class': 'required|string',
                   'edu.*.marks': 'required|string|digits:3',
                   'edu.*.percentage': 'required|digits:4',
                   'edu.*.grade': 'required|string',
                  


                }

                // 
                //     edu: [
                  //  {
                //       class: '10th',
                //        
                //            marks:'',
                //            percentage:'',
                //            grade:''
                //         },
                  //          {
                //         class: '12th',
                //   
                //            marks:'',
                //            percentage:'',
                //            grade:''
                //         },
                 //           {
                //         class: 'graduation',
                //        
                //            marks:'',
                //            percentage:'',
                //            grade:''
                //        }, 
                      
                      
                //     ]
                

    const valid=new Validator(request,flattened)

     if(valid.fails()){
        let err=Object.keys(Object.entries(valid.errors)[0][1])[0];
        return res.json(reply.failed(valid.errors.first(err)))
            
    }   
    const find_mobile = await condidate.findOne({ where: {cnd_mobile:request?.cnd_mobile } });
    
     if(find_mobile){
        res.json(reply.failed("Your mobile is already exits!"));
     }


    
    
    try{
        const cndt=await condidate.create(request)
        return res.json(reply.success("condidate create succesffuly",cndt))
        
    }catch(error){
        return res.json(reply.failed("invalid condidate!"))
    }          
        
    }





}

