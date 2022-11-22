import reply from '../Common/reply.js'
import countryData from '../country_state.json' assert { type: 'json' }

export default{
      getCountry: async (req,res)=>{
         // console.log(req.query.country)
         var allData=Object.values(countryData);
         

         var Alldata=[]

         allData.forEach(function (item) {
            console.log(req.query.states)
             var result = item.filter(x => x.country === req.query.country );
         
              Alldata.push(result)
            });
            
            console.log("sls",Alldata);
         //  console.log(item,"dls");

         try{          
            res.json(reply.success("get country fetch",Alldata))
             
         } catch(err){
             res.json(reply.failed("server is busy"))
             console.log(err,"error")
         }


      }




}
