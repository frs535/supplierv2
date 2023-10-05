import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Partner from "../models/Partner.js";
import Settings from "../models/Settings.js";
import Image from "../models/Image.js";

export const getPartners = async (req, res)=>{
    try {
        const partners = await Partner.find()
            .then(docs=>
                docs.map(p=>{
                    return {
                        id: p.id,
                        agreementId: p.agreementId,
                        priceTypeId: p.priceTypeId
                    }
            }));

        res.status(200).json(partners);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
};

export const getPartner = async (req, res)=>{
    try {
        const { id } = req.params;
        const partners = await Partner.findOne({id: id});

        res.status(200).json(partners);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
};

export  const postPartner = async (req, res)=> {
    try {
        const {
            id,
            name,
            agreementId,
            priceTypeId,
            deliveryAddress,
            manager,
            companies,
        } = req.body;

        const partner = await Partner.findOne({id: id});
        if (partner)
            await Partner.deleteOne( { "_id" : partner._id } )

        const newPartner = new Partner(
            {
                id,
                name,
                agreementId,
                priceTypeId,
                deliveryAddress,
                manager,
                companies,
            });

        const savedPartner = await newPartner.save();

        res.status(200).json(savedPartner);
    }catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getProfile = async (req, res) =>{
  try {
      const profile = await Profile.findOne({userId:req.user.id});
      res.status(200).json(profile);
  }
  catch (error){
      res.status(404).json({message: error.message});
  }
};

export const postProfile = async (req, res)=>{
    try {
        const {
            userId,
            phoneNumber,
            email,
            defaultDeliveryAddress,
        } = req.body;

        const profile = await Profile.findOne({userId: userId});
        if (profile!=null)
            await Profile.deleteOne( { "_id" : profile._id } )

        const newProfile = new Profile(
        {
            userId,
            phoneNumber,
            email,
            defaultDeliveryAddress,
        });

        const savedProfile = await newProfile.save();

        res.status(200).json(savedProfile);
    }
    catch (error)
    {
        res.stat(400).json({message: error.message});
    }
}

export const getSettings = async (req, res)=>{
    try {
        const settings = await Settings.findOne({});
        res.status(200).json(settings);
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
}

export  const postSettings = async (req, res)=>{
    try {
        const newSettings = new Settings(req.body);

        const settings = await Settings.findOne({});
        if (settings) {
            await Settings.deleteOne({"_id": settings._id});
        }

        const savedSettings = await newSettings.save();

        res.status(200).json(savedSettings);
    }
    catch (error)
    {
        res.stat(400).json({message: error.message});
    }
}

export const getDashboardStats = async (req, res) => {
    try {

        const settings = await Settings.findOne();
        const partner = await  Partner.findOne({id: req.user.partnerId});
        const image = await Image.findOne({id: partner?.manager?.id, destination: "manager"});
        const logo = await Image.findOne({id: "00000000-0000-0000-0000-000000000000", destination: "logo"});

        res.status(200).json({partner, settings, image, logo});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};