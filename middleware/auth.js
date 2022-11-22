import Token from "../Models/token.js";
import User from "../Models/userModel.js";
import reply from "../Common/reply.js";
import Jwt  from "jsonwebtoken";
import fs from "fs";


export default function (req, res, next) {
  //  console.log("req",req);
    var bearerHeader = req.headers['authorization'];
    // console.log("ffffffffffffffffff",bearerHeader)
  
  
    if (bearerHeader == undefined) {
      return res.json(reply.failed("Invalid Token"));
    }
    
    var bearer = bearerHeader.split(" ");
    const token = bearer[1];
    // console.log("token>>>>>>>>>>>>>>>",token);
    req.token = token;
    // console.log("ddddddddddddddddddd",req.token);
  
    if (!token) {
      return res.json(reply.failed("Access Denied!" ));
    }
  
    var publicKey = fs.readFileSync("./keys/public.pem", 'utf-8');
    // console.log("public key in api",publicKey);
  
    Jwt.verify(token, publicKey, { algorithm: 'RS256' }, async function (err, decoded) {
      if (err) {
        return res.json(reply.failed(err.message));
      }
  
      let T = await Token.findOne({
        where: {
        t_id:decoded.cryptos
        }
      });

 
      if (!T) {
        // return res.status(401).send({ message: "Token Expired!" });
        return res.json(reply.failed("Token expired"))
      }
  
      let user = await User.findOne({
        where: {
          id: T.u_id
        }
      });
   
    req.user= user;
     req.t_id=T?.t_id;
     console.log("fff",T?.u_id)
     req.u_id=T?.npm;


 
    next();
  });
  }
  