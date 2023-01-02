const mobileModel = require ("../models/mobileModel")


const addMobile = async (req, res) => {
    try {
    let data = req.body
    let {name, model, desc, price, review, img, available } = data

    if(!name){
        return res.status(400).json("Please enter mobile brand name")
    }
    if(!model){
        return res.status(400).json("Please enter mobile model")
    }
    if(!desc){
        return res.status(400).json("Please enter mobile desc")
    }
    if(!price){
        return res.status(400).json("Please enter mobile price")
    }
    if(!img){
        return res.status(400).json("Please provide mobile img")
    }

    let findMobile = await mobileModel.findOne({model})
    if(findMobile) {
        return res.status(400).json("This mobile is aldready available")
    }

    let saveData = mobileModel.create(data)
    return res.status(201).json({saveData})

    } catch (error) {
     return res.status(500).json(error.message)   
    }
}

const getMobile = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const updateMobile = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const deleteMobile = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {addMobile, getMobile, updateMobile, deleteMobile}