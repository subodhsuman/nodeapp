import textEditor from "../Models/text_editor.js";
import reply from "../Common/reply.js";
import fs from "fs";

export default {
  texteditor: async (req, res) => {
    let request = req.body;

   fs.writeFile("textEditor.txt",request.content, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });

    try {
      const user = await textEditor.create(request);
      return res.json(reply.success("content save successfully", { user }));
    } catch (error) {
      console.log(error);
      res.json(reply.failed(error));
    }
  },
   


  getTextEditor: async (req, res) => {
    // let request=req.body;
    try {
      const getEditor = await textEditor.findAll({});
      return res.json(reply.success("get data", { getEditor }));
    } catch (error) {
      console.log(error);
      res.json(reply.failed(error));
    }
  },



};
