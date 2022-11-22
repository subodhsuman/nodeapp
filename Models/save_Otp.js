import  Sequelize  from "sequelize";
import db from "../db/db.js";

const otpTable=db.define('otp',{
     u_id:Sequelize.STRING,
     email:Sequelize.STRING,
     otp:Sequelize.INTEGER,
})

await otpTable.sync()
export default otpTable;

