import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import Profile from "../models/Profile.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        //if (id === "null") res.status(401).json({message: "Unauthorized"});
        //else {
            const user = await User.findById(id);
            res.status(200).json(user);
        //}
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getProfile = async (req, res) =>{
  try {
      const {id } = req.params;
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
            companyName,
            phoneNumber,
            email,
            deliveryAddress,
            managerName,
            managerPhone,
            managerEmail,
            managerPicturePath,
        } = req.body;

        const profile = await Profile.findOne({userId: userId});
        if (profile!=null)
            await Profile.deleteOne( { "_id" : profile._id } )

        const newProfile = new Profile(
        {
            userId,
            companyName,
            phoneNumber,
            email,
            deliveryAddress,
            managerName,
            managerPhone,
            managerEmail,
            managerPicturePath
        });

        const savedProfile = await newProfile.save();

        res.status(200).json(savedProfile);
    }
    catch (error)
    {
        res.stat(400).json({message: error.message});
    }
}

export const getDashboardStats = async (req, res) => {
    try {
        // hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        /* Recent Transactions */
        const transactions = await Transaction.find()
            .limit(50)
            .sort({ createdOn: -1 });

        /* Overall Stats */
        const overallStat = await OverallStat.find({ year: currentYear });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth;
        });

        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};