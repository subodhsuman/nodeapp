import Sequelize  from "sequelize";
import db from "../db/db.js";

const bukUser=db.define('bukuser',{
    buk_id:Sequelize.INTEGER,
    fullname:Sequelize.STRING,
    phone:Sequelize.STRING,
    type:Sequelize.STRING,
    parament_addres:Sequelize.STRING,
    current_address:Sequelize.STRING,
    gender:Sequelize.STRING,
    country:Sequelize.STRING,
    

})

await bukUser.sync();
export default bukUser; 

