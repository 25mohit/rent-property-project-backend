const expressAsyncHandler = require("express-async-handler")
const NewItem = require("../Model/NewItemModel")
const User = require('../Model/UserModel');
const Notification = require('../Model/NotificationModel')

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

    const sendNotification = new Notification({
        label: `<span><p>${item_name}</p> has been sent for Review</span>`,
        type: 's',
        fresh: true,
        id
    })
    await sendNotification.save()

    return res.status(200).json({ status: true, m: "ss" });

})

const GetNotification = expressAsyncHandler(async (req, res) => {
    const { id } = req.query
    
    if( !id ){
        return res.status(200).json({status: false, m:"re"})
    }

    const isExists = await Notification.find({id}).select('-_id -id -uuid -updatedAt -__v')

    if(!isExists){
        return res.status(200).json({status: false, m:"nod"})
    }
    return res.status(200).json({status: false, m:"ss", isExists})
})
module.exports = {
    AddNewItemController,
    GetNotification
}