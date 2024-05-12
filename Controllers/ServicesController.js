const expressAsyncHandler = require("express-async-handler")
const NewItem = require("../Model/NewItemModel")
const User = require('../Model/UserModel');
const WhishList = require("../Model/WhishListModel")
const Notification = require('../Model/NotificationModel')

const AddNewItemController = expressAsyncHandler(async (req, res) => {
    const { id, email, item_name,user_name, item_category, item_sub_category, item_description, item_location, contact_name, contact_mobile } = req.body  
  
    if(!id || !email || !item_name || !user_name || !item_category || !item_sub_category || !item_description || Object.keys(item_location)?.length !== 4 || !contact_name || !contact_mobile){
        return res.status(200).json({status: false, m:"re"})
    }

    const isExists = await User.findOne({ email, uuid: id})

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

const AddListingToWhishlist = expressAsyncHandler(async (req, res) => {
    const { uID, lID, sID, listingData } = req.body

    if(!uID || !lID || !sID || Object.keys(listingData).length !==4){
        return res.status(200).json({status: false, m:"re"})
    }

    const isListingExists = await NewItem.findOne({ uuid: lID, id: sID })

    if(!isListingExists){
        return res.status(200).json({status: false, m:"nf"})
    }
    const isExists = await WhishList.findOne({ lID, uID})

    console.log("isExists", isExists);

    if(isExists){
        return res.status(200).json({status: false, m:"ex"})
    }
    
    const whishlist = new WhishList({
        uID, sID, lID, listingData
    });

    // Save the new item to the database
    await whishlist.save();

    return res.status(200).json({status: true, m:"ss"})

})

const GetWhishlistListing = expressAsyncHandler(async (req, res) => {
    const { id } = req.query

    if(!id && Object.keys(req.query)?.[0] !== "id"){
        return res.status(200).json({ status: false, m: "re"})
    }

    const isExists = await WhishList.find({uID: id}).select('-_id -uID -lID -sID -updatedAt -__v')

    if(!isExists?.length){
        return res.status(200).json({ status: false, m: "nf"})
    }

    return res.status(200).json({ status: true, m: "ss", d: isExists})

})

const RemoveWhishlist = expressAsyncHandler(async (req, res) => {
    const { uID, lID, sID } = req.body;

    if (!uID || !lID || !sID) {
        return res.status(400).json({ status: false, message: "re" });
    }

    // Find the item in the wishlist
    const wishlistItem = await WhishList.findOneAndDelete({ uID, lID, sID });

    if (!wishlistItem) {
        return res.status(404).json({ status: false, m:"iv" });
    }

    return res.status(200).json({ status: true, m:"ss" });
})

module.exports = {
    AddNewItemController,
    GetNotification,
    AddListingToWhishlist,
    GetWhishlistListing,
    RemoveWhishlist
}