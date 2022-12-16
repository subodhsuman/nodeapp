import Sequelize from "sequelize";
import db from "../db/db.js";

const textEditor = db.define("texteditor", {
     content:{
        type: Sequelize.TEXT('9000')
     
    }

});
await textEditor.sync();

export default textEditor;
