import Sequelize from "sequelize";
import db from "../db/db.js";


const resetOtp=db.define('reset_otp',{
   email:Sequelize.STRING,
   tokenString:Sequelize.STRING,
   expire_at:{
    type:Sequelize.STRING,    
    set(value) {
         value = new Date(new Date().setMinutes(new Date().getMinutes() + 5))
         console.log(value);
        this.setDataValue('expire_at', JSON.stringify(value));
      },
   }
})
resetOtp.sync();
export default resetOtp;