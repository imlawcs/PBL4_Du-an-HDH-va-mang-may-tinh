import { useEffect, useState } from "react";
import { UserRoutes } from "../API/User.routes";
import ChannelComp from "./ChannelComp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function UserChannelList() {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("site"));
    const navigate = useNavigate();
    function adminCheck(channel) {
        if (channel.Roles && channel.Roles.filter((role) => role.roleName === "Admin").length > 0) {
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
                        navigate(`/user/${user.UserName}`);
                      }}
                      key={user.UserId}
                      isOffline={user.UserStatus? false : true}
                      profilePic={user.ProfilePic? user.ProfilePic : "https://i.imgur.com/neHVP5j.jpg"}
                      userName={user.DisplayName}
                      category={user.Category? user.Category : "null"}
                      viewCount={user.ViewCount? user.ViewCount : 0}
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
                      key={user.UserId}
                      onClick={() => {
                        navigate(`/user/${user.UserName}`);
                      }}
                      isOffline={user.UserStatus? false : true}
                      profilePic={user.ProfilePic? user.ProfilePic : "https://i.imgur.com/neHVP5j.jpg"}
                      userName={user.DisplayName}
                      category={user.Category? user.Category : "null"}
                      viewCount={user.ViewCount? user.ViewCount : 0}
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