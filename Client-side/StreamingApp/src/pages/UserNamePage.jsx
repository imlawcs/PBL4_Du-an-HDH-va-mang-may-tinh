import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { SignalRTest } from "../scripts/webrtcTemp";

export default function UserNamePage(props) {
    const params = useParams();
    console.log(params.username);
    //need validate code for username
    useEffect(() => {
        console.log("Start loading stream...");
        // SignalRTest.serverOff().then(() => {
            SignalRTest.joinRoom("randomUser", params.username);
        // });
        return () => {
            console.log("Stop loading stream...");
            SignalRTest.serverOff();
        };
      }, [params.username]);
    return(
        <>
            <NavBar routing="index"/>
            <Sidebar routing="Username" userRoute={params.username}/>
        </>
        
    )
}