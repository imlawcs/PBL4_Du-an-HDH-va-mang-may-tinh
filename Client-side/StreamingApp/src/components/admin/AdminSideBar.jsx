import { fa2, faBlackboard, faBroadcastTower, faLayerGroup, faUser } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/AdminSideBar.css";
import SbMenuLabel from "../SbMenuLabel";
import { useState } from "react";
export default function AdminSideBar({ setOption }){
    const [toggleTmp, setToggleTmp] = useState("dashboard");
    const handleClick = (opt) => {
        setOption(opt);
        setToggleTmp(opt);
    }
    return (
        <>
            <div className="admin__sidebar-container rr__flex-col" style={{
                flex: 1,
                alignItems: "flex-start",
            }}>
                <span className="
                rr__flex-col
                league-spartan-regular 
                citizenship 
                fs__large-2 
                ta__center 
                fill__container 
                def-pad-2 
                no__padding-lr
                ">
                    Managements
                </span>
                <SbMenuLabel
                    text="Dashboard"
                    icon={faBlackboard}
                    onClick={() => handleClick("dashboard")}
                    type={toggleTmp==="dashboard"? "toggle" : ""}
                />
                <SbMenuLabel
                    text="Users"
                    icon={faUser}
                    onClick={() => handleClick("users")}
                    type={toggleTmp==="users"? "toggle" : ""}
                />
                <SbMenuLabel 
                    text="Streams"
                    icon={faBroadcastTower}
                    onClick={() => handleClick("streams")}
                    type={toggleTmp==="streams"? "toggle" : ""}
                />
                <SbMenuLabel 
                    text="Categories"
                    icon={faLayerGroup}
                    onClick={() => handleClick("categories")}
                    type={toggleTmp==="categories"? "toggle" : ""}
                />
            </div>
        </>
    );
}