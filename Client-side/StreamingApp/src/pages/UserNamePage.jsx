import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { SignalRTest } from "../scripts/webrtcTemp";

export default function UserNamePage(props) {
    const params = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
    const [username, setUsername] = useState(params.username);
    console.log(username);
    //need validate code for username
    useEffect(() => {
        console.log("Start loading stream...");
        setUsername(params.username);
        // SignalRTest.serverOff().then(() => {
            SignalRTest.joinRoom(user.UserName, params.username);
        // });
        return () => {
            console.log("Stop loading stream...");
            SignalRTest.serverOff();
        };
      }, [params.username]);
    return(
        <>
            <NavBar routing="index"/>
            <Sidebar key={params.username} routing="Username" userRoute={params.username}/>
        </>
        
    )
}