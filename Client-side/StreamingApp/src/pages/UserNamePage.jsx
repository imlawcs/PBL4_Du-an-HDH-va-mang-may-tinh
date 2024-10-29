import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

export default function UserNamePage(props) {
    const params = useParams();
    console.log(params.username);
    return(
        <>
            <NavBar routing="index"/>
            <Sidebar routing="Username" userRoute={params.username}/>
        </>
        
    )
}