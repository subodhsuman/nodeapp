import  Sequelize  from "sequelize";
import db from "../db/db.js";
import User from "./userModel.js";

const userRole=db.define("userRole",{
    user_id:Sequelize.STRING,
    rolename:Sequelize.STRING,
    name:Sequelize.STRING,

    
})

userRole.sync();

userRole.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(userRole,{ foreignKey: 'user_id' })



export default userRole;
