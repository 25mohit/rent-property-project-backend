const expressAsyncHandler = require("express-async-handler")
const NewItem = require("../Model/NewItemModel")
const User = require('../Model/UserModel');

const AddNewItemController = expressAsyncHandler(async (req, res) => {
    const { id, email, item_name,user_name, item_category, item_sub_category, item_description, item_location, contact_name, contact_mobile } = req.body

    if(id, !email, !item_name, !user_name, !item_category, !item_sub_category, !item_description, !item_location, !contact_name, !contact_mobile){
        return res.status(200).json({status: false, m:"re"})
    }

    const isExists = await User.findOne({ email, uuid: id})

    console.log("isExists", isExists);

    if(!isExists){
        return res.status(200).json({status: false, m:"nf"})
    }

    const newItem = new NewItem({
        id,
        email,
        user_name,
        item_name,
        item_category,
        item_sub_category,
        item_description,
        item_location,
        contact_name,
        contact_mobile
    });

    // Save the new item to the database
    await newItem.save();

    return res.status(200).json({ status: true, m: "ss" });


})

const CreateNotification = expressAsyncHandler(async (req, res) => {
    const { id, label, type, fresh } = req.body
    
    if( !id || !label || !type || !fresh ){
        return res.status(200).json({status: false, m:"re"})
    }
})
module.exports = {
    AddNewItemController,
    CreateNotification
}