import { useGetProfileQuery } from "state/api";
import { useSelector } from "react-redux";
import Label from "../../components/Label";
import { Box } from "@mui/material";

const Profile = () =>{

    const user = useSelector((state) => state.user);
    const { data } = useGetProfileQuery( { id :user._id });

    return <Box sx={{ flexDirection: 'column'}}>
        <Label title="First name:" text={data? data.firstName: ""}/>
        <Label title="Last name:" text={data? data.lastName: ""}/>
        <Label title="Email:" text={data? data.email: ""}/>
        <Label title="Phone:" text={data? data.phoneNumber: ""}/>
    </Box>
};

export  default  Profile;