const mobileModel = require("../models/mobileModel");
const { uploadFile } = require("./awsController");

const addMobile = async (req, res) => {
  try {
    let data = req.body;
    let files = req.files;
    let { name, model, varient, desc, price, img, review, available } = data;

    if (!name) {
      return res.status(400).json("Please enter mobile brand name");
    }
    if (!model) {
      return res.status(400).json("Please enter mobile model");
    }

    if (!varient) {
      return res.status(400).json("Please enter available varients");
    }
    if (varient) {
      let varients = [2, 3, 4, 6, 8, 12];
      let size2 = varient.split(",").map((x) => x.trim());
      for (let i = 0; i < size2.length; i++) {
        if (!varients.includes(size2[i])) {
          return res.status(400).json("Invalid Varient");
        }
      }
    }

    if (!review) {
      return res.status(400).json("Please enter ratings");
    }

    let findMobile = await mobileModel.findOne({ model });
    if (findMobile) {
      return res.status(400).json("This mobile is aldready available");
    }

    if (!desc) {
      return res.status(400).json("Please enter mobile desc");
    }
    if (!price) {
      return res.status(400).json("Please enter mobile price");
    }

      if (files.length > 0) {
        let validImage = files[0].mimetype.split("/");
        
        if (validImage[0] != "image") {
          return res.status(400).json("Please Provide Valid Image..");
        }
        
        let uploadedFileURL = await uploadFile(files[0]);
        console.log(uploadedFileURL);

        data = uploadedFileURL;
      }else{
        return res.status(400).json("Please provide image");
      }

    let saveData = await mobileModel.create(data);
    return res.status(201).json(saveData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getMobile = async (req, res) => {
  try {
    let getData = await mobileModel.find();
    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const updateMobile = async (req, res) => {
  try {
    let data = req.body;
    let { name, model, price, desc, review, available, img } = data;
    if (model) return res.status(400).json("Model aldready exists");

    let saveData = await mobileModel.updateOne(
      { _id: req.params.id },
      { $set: data }
    );
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const deleteMobile = async (req, res) => {
  try {
    let id = req.params.id;

    let saveData = await mobileModel.deleteOne({ _id: id });
    return res.status(200).json(saveData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { addMobile, getMobile, updateMobile, deleteMobile };
