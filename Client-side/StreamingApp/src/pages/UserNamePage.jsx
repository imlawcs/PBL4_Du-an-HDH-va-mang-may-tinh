import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { SignalRTest } from "../scripts/webrtcTemp";

export default function UserNamePage() {
    const params = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
    const [username, setUsername] = useState(params.username);
    const navigate = useNavigate();
    console.log(username);
    //need validate code for username
    useEffect(() => {
        console.log("Start loading stream...");
        setUsername(params.username);
        // SignalRTest.serverOff().then(() => {
            SignalRTest.joinRoom(user.UserName, params.username);
            SignalRTest.getClientPeerConnection().ontrack = (event) => {
                const remoteVideo = document.getElementById('remote__stream');
                remoteVideo.srcObject = event.streams[0];
                alert("Track received");
            }
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