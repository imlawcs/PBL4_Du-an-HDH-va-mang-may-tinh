import { useEffect } from "react";
import MainContentPage from "../components/MainContentPage.jsx";
import NavBar from "../components/NavBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { SignalRTest } from "../scripts/webrtcTemp.jsx";

export default function StreamManager() {
    const name = "SM"
    useEffect(() => {
        SignalRTest.serverOff().then(() => {
            SignalRTest.serverOn();
        });
      }, []);

    return(
        <>
            <NavBar routing={name} navName="Stream Manager"/>
            <Sidebar routing={name} name="Tools"/>
            
        </>
        
        
    );
}