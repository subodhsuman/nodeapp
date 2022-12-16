import  express from "express";
import userController from "../Controllers/userController.js";
import bkUserController from "../Controllers/bkUserController.js";
import condidateController from "../Controllers/condidateController.js";
import CountryState from "../Controllers/CountryState.js";
import TexteditorController from "../Controllers/TexteditorController.js";

import UserRoleController from "../Controllers/UserRoleController.js";
import auth from "../middleware/auth.js";
import multer from 'multer'
import fs from "fs";


/***************** storage for image **************/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var dir = './uploads';
      if (!fs.existsSync(dir)) {
          fs.mkdirSync('./uploads',{ recursive: true });
      }
      
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + file.originalname
      cb(null,uniqueSuffix)
    }
  })

/***************** storage for image **************/
 

const upload = multer({storage: storage})
const Router=express()

Router.post('/register',upload.array("image",10),userController.registerUser);
Router.post('/login',userController.loginUser);


/*****************  relation  **************/

Router.post('/create_role',UserRoleController.getUserRoll);
Router.get('/get_role',UserRoleController.getRole)

/*****************  get country  **************/

Router.get('/get_country',CountryState.getCountry);




/***************** otp section **************/
Router.post('/otp_verify',userController.otpVerify)
Router.post('/forgot_otp',userController.forgetOtp)
Router.post('/reset_password',userController.resetPassword)



/***************** booking user **************/

Router.post('/booking_user',bkUserController.bookUser)
Router.get('/booking_getUser',bkUserController.getBokUser)



/***************** condidate  **************/
Router.post('/condidate',condidateController.createConditate)


/***************** get user admin  **************/
// Router.get('/admin/get_user',userController.getuser)


Router.post('/texteditor_post',TexteditorController.texteditor)
Router.get('/get_texteditor',TexteditorController.getTextEditor)











/***************** Auth **************/

Router.get('/get_user',auth,userController.getUser);
Router.post('/logout',auth,userController.LogOut);
Router.post('/hard_logout',auth,userController.hardLogout);






export default Router;
