import { useEffect, useState } from "react";
import { UserRoutes } from "../API/User.routes";
import ChannelComp from "./ChannelComp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FollowRoutes } from "../API/Follow.routes";
import { StreamRoutes } from "../API/Stream.route";
import { Assets } from "../constants/Assets";
import { ApiConstants } from "../API/ApiConstants";
import { BlockRoutes } from "../API/Block.routes";
import { AdminCheck } from "../scripts/AdminCheck";

export default function UserChannelList(props) {
    const [channels, setChannels] = useState([]);
    const [userFollowList, setUserFollowList] = useState([]);
    const [userBlockList, setUserBlockList] = useState([]);
    const [userGlobal, setUserGlobal] = useState(props.user);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("site"));
    const navigate = useNavigate();
    const blockCheck = (channel, blockComp) => {
        //filter out
        //case1: this channel blocked userGlobal
        // blockComp.ChannelId == channel.UserId && blockComp.BlockedId == userGlobal.UserId
        //case2: userGlobal blocked this channel
        // blockComp.ChannelId == userGlobal.UserId && blockComp.BlockedId == channel.UserId
        return(
          (blockComp.channelId == channel.UserId && blockComp.blockedId == userGlobal.UserId || 
          blockComp.channelId == userGlobal.UserId && blockComp.blockedId == channel.UserId)
        )

    }
    useEffect(() =>  {
      const fetchUserList = UserRoutes.getUsers().then((res) => {
        setChannels(res);
        return Promise.resolve();
      });
      const fetchUserFollow = userGlobal && FollowRoutes.GetAllChannelsByFollowerId(userGlobal.UserId).then((res) => {
        console.log("User follow list:", res);
        setUserFollowList(res || []);
        return Promise.resolve();
      });
      const fectchAllBlocked = userGlobal && BlockRoutes.getAllBlockedUsers().then((res) => {
        console.log("User block list:", res);
        setUserBlockList(res || []);
        return Promise.resolve();
      })
        Promise.all([fetchUserList, fetchUserFollow, fectchAllBlocked]).then(() => {
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
                  .filter((channel) => userBlockList.filter((block) => blockCheck(channel, block)).length <= 0)
                  .filter((channel) => userFollowList.filter((follow) => follow.channelId === channel.UserId).length>0).length > 0
                  ? 
                  channels
                  .filter((channel) => userBlockList.filter((block) => blockCheck(channel, block)).length <= 0)
                  .filter((user) => userFollowList.filter((follow) => follow.channelId === user.UserId).length > 0)
                  .filter((user) => AdminCheck(user) === false)
                  .slice(0, 5)
                  .map((user) => (
                    <ChannelComp
                      onClick={() => {
                        navigate(`/user/${user.UserName}`);
                      }}
                      key={user.UserId}
                      isOffline={user.UserStatus? false : true}
                      profilePic={user.ProfilePic? ApiConstants.BASE_URL + user.ProfilePic : Assets.defaultAvatar}
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
                  {channels
                  .length > 0 && 
                  channels
                  .filter((channel) => userBlockList.filter((block) => blockCheck(channel, block)).length === 0) //filter out blocked users
                  .filter((channel) => userFollowList.filter((follow) => follow.channelId === channel.UserId).length === 0) //get nhung ai chua follow
                  .filter((user) => AdminCheck(user) === false)
                  .slice(0, 5)
                  .map((user) => (
                    <ChannelComp
                      key={user.UserId}
                      onClick={() => {
                        navigate(`/user/${user.UserName}`);
                      }}
                      isOffline={user.UserStatus? false : true}
                      profilePic={user.ProfilePic? ApiConstants.BASE_URL + user.ProfilePic : Assets.defaultAvatar}
                      userName={user.DisplayName}
                      category={user.Category? user.Category : "null"}
                      viewCount={user.ViewCount? user.ViewCount : 0}
                    />
                  ))}
                  {channels.filter((user) => AdminCheck(user) === false).length > 5 && 
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