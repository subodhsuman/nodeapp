import Sequelize from "sequelize";
import db from "../db/db.js";
// import userRole from "./user_role.js";


const User = db.define("user", {
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  password:Sequelize.STRING,
  image:{
    type:Sequelize.STRING(2000),
    set(value) {
      this.setDataValue('image', JSON.stringify(value));
    },
    get(){

      const rawValue = this.getDataValue('image')
      // console.log("sanam",rawValue)
      
       let st=[];

        JSON.parse(rawValue).forEach( function(value,index) {
            st.push( process.env.PORTs +"image/"+ value)
        });
        // console.log("abcd",rawValue);
      return st;   
    }
  },
  f_2a:Sequelize.INTEGER,
  company_name:Sequelize.STRING,
  role_id:Sequelize.STRING,
  role:Sequelize.STRING,

});
await User.sync();

// force true is used for remove all table and create new table
// alter true is used for remove all specific table table does not remove data

// User.belongsTo(userRole, { foreignKey: 'role_id' });

export default User;
