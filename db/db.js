import Sequelize from "sequelize";

const db = new Sequelize('damia','root','00000',{
    host: 'localhost',
    dialect: 'mysql',
    logging : false
  });

  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  export default db;