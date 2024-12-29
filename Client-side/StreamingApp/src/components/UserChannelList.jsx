import { useEffect, useState } from "react";
import { UserRoutes } from "../API/User.routes";
import ChannelComp from "./ChannelComp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FollowRoutes } from "../API/Follow.routes";
import { StreamRoutes } from "../API/Stream.route";
import { Assets } from "../constants/Assets";

export default function UserChannelList(props) {
    const [channels, setChannels] = useState([]);
    const [userFollowList, setUserFollowList] = useState([]);
    const [userGlobal, setUserGlobal] = useState(props.user);
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
      const fetchUserList = UserRoutes.getUsers().then((res) => {
        setChannels(res);
        return Promise.resolve();
      });
      const fetchUserFollow = userGlobal && FollowRoutes.GetAllChannelsByFollowerId(userGlobal.UserId).then((res) => {
        console.log("User follow list:", res);
        setUserFollowList(res);
        return Promise.resolve();
      });
        Promise.all([fetchUserList, fetchUserFollow]).then(() => {
          setLoading(false);
        });
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
                  {channels
                  .filter((channel) => userFollowList.filter((follow) => follow.channelId === channel.UserId).length>0).length > 0
                  ? 
                  channels
                  .filter((user) => userFollowList.filter((follow) => follow.channelId === user.UserId).length > 0)
                  .filter((user) => adminCheck(user) === false)
                  .slice(0, 5)
                  .map((user) => (
                    <ChannelComp
                      onClick={() => {
                        navigate(`/user/${user.UserName}`);
                      }}
                      key={user.UserId}
                      isOffline={user.UserStatus? false : true}
                      profilePic={user.ProfilePic? user.ProfilePic : Assets.defaultAvatar}
                      userName={user.DisplayName}
                      category={user.Category? user.Category : "null"}
                      viewCount={user.ViewCount? user.ViewCount : 0}
                    />
                  )):
                    <span className="cn__holder-label league-spartan-bold fs__normal-1">
                        You are not following any channels
                    </span>
                  }

                  {channels
                  .filter((channel) => userFollowList.filter((follow) => follow.channelId === channel.UserId).length>0).length > 5 && 
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {
                        
                    }}
                  />}
                </div>
                </>}
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  RECOMMENDED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  {channels.length > 0 && 
                  channels
                  .filter((channel) => userFollowList.filter((follow) => follow.channelId === channel.UserId).length === 0) //get nhung ai chua follow
                  .filter((user) => adminCheck(user) === false)
                  .slice(0, 5)
                  .map((user) => (
                    <ChannelComp
                      key={user.UserId}
                      onClick={() => {
                        navigate(`/user/${user.UserName}`);
                      }}
                      isOffline={user.UserStatus? false : true}
                      profilePic={user.ProfilePic? user.ProfilePic : Assets.defaultAvatar}
                      userName={user.DisplayName}
                      category={user.Category? user.Category : "null"}
                      viewCount={user.ViewCount? user.ViewCount : 0}
                    />
                  ))}
                  {channels.filter((user) => adminCheck(user) === false).length > 5 && 
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {
                        
                    }}
                  />}
                </div>
                </>}
                
              </div>
            </div>
        </>
    );

}