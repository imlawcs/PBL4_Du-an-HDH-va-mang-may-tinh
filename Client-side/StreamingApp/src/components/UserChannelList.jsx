import { useEffect, useState } from "react";
import { UserRoutes } from "../API/UserRoutes";
import ChannelComp from "./ChannelComp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function UserChannelList() {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("site"));
    const navigate = useNavigate();
    function adminCheck(channel) {
        if (channel.userName && (channel.userName.includes("admin") || channel.userName.includes("Admin"))) {
            return true;
        }
        return false;
    }
    useEffect(() =>  {
        async function fetchData()
        {
            try
            {
                const res = await UserRoutes.getUsers();
                setChannels(res || []);
                setLoading(false);
            }
            catch(err){
                console.error("Error fetching user channels:", err);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return (
        <>
            <div className="border__r">
              <div className="cn__holder rr__flex-col">
                {loading ? 
                <>
                    <span className="cn__holder-label league-spartan-bold fs__large-1">
                        Loading...
                    </span>
                </> 
                : 
                <>
                {token && <>
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  FOLLOWED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {channels.length > 0 && channels
                  .filter((user) => adminCheck(user) === false)
                  .slice(0, 5)
                  .map((user) => (
                    <ChannelComp
                      onClick={() => {
                        navigate(`/user/${user.userName}`);
                      }}
                      key={user.userId}
                      isOffline={user.userStatus? false : true}
                      profilePic={user.profilePic? user.profilePic : "https://i.imgur.com/neHVP5j.jpg"}
                      userName={user.userName}
                      category={user.category? user.category : "null"}
                      viewCount={user.viewCount? user.viewCount : 0}
                    />
                  ))}
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {
                        
                    }}
                  />
                </div>
                </>}
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  RECOMMENDED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  {channels.length > 0 && channels
                  .filter((user) => adminCheck(user) === false)
                  .slice(0, 5)
                  .map((user) => (
                    <ChannelComp
                      key={user.userId}
                      isOffline={user.userStatus? false : true}
                      profilePic={user.profilePic? user.profilePic : "https://i.imgur.com/neHVP5j.jpg"}
                      userName={user.userName}
                      category={user.category? user.category : "null"}
                      viewCount={user.viewCount? user.viewCount : 0}
                    />
                  ))}
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {
                        
                    }}
                  />
                </div>
                </>}
                
              </div>
            </div>
        </>
    );

}