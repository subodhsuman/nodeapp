import  Sequelize from "sequelize";
import db from "../db/db.js";

const Token =db.define('token',{
      t_id:Sequelize.STRING,
      u_id:Sequelize.STRING,
      email:Sequelize.STRING,

})

await Token.sync();
export default Token;