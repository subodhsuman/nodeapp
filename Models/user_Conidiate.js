import  Sequelize, { RANGE } from "sequelize";
import db from "../db/db.js";

const condidate=db.define('condidate',{
     cnd_name:Sequelize.STRING,
     cnd_state:Sequelize.STRING,
     cnd_age:Sequelize.STRING,
     cnd_mobile:Sequelize.STRING,
     cnd_password:Sequelize.STRING,
     edu:{
      type: Sequelize.JSON,
    //   set(value) {
    //     this.setDataValue('edu', JSON.stringify(value))
    //   },

    //   get() {
    //     return (
    //       JSON.parse(this.getDataValue('edu'))
    //     )
    //   },
    set(value) {
        this.setDataValue('edu', JSON.stringify(value));
      },
      
      get() {   
        const rawValue = this.getDataValue('edu');
        // console.log("MODEL",rawValue);
        return JSON.parse(rawValue) 
      }


     }

})

await condidate.sync()

export default condidate;
