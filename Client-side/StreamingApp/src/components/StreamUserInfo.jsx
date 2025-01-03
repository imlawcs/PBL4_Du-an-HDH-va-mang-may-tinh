import TagCard from "./TagCard";
import '../assets/css/StreamUserInfo.css'
import BtnIcon from "./BtnIcon";
import { faBan, faEllipsis, faEye, faHeart, faInfoCircle, faShareFromSquare, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { SignalRTest } from "../scripts/webrtcTemp";
import { Colors } from "../constants/Colors";
import Toast from "./Toast";
import { UserRoutes } from "../API/User.routes";
import { TagRoutes } from "../API/Tag.routes";
import { CategoryRoutes } from "../API/Category.routes";
import { FollowRoutes } from "../API/Follow.routes";
import MenuOptionBtn from "./MenuOptionBtn";
import MenuHolder from "./MenuHolder.main";
import CustomModal from "./CustomModal";
import { BlockRoutes } from "../API/Block.routes";
import { useNavigate } from "react-router-dom";
import { Assets } from "../constants/Assets";
import { RoleRoutes } from "../API/Role.routes";
import { ModCheck } from "../scripts/AdminCheck";
export default function StreamUserInfo(props) {
    function doNothing() {
        return;
    }
    const [userGlobal, setUserGlobal] = useState(JSON.parse(localStorage.getItem("user")) || "");
    function shortenNumber(number) {
        if(number >= 1000000000){
            return (number / 1000000000).toFixed(1) + "B";
        }
        else if (number >= 1000000) {
          // If the number is greater than or equal to 1 million, shorten it to millions.
          return (number / 1000000).toFixed(1) + "M";
        } else if (number >= 1000) {
          // If the number is greater than or equal to 1 thousand, shorten it to thousands.
          return (number / 1000).toFixed(1) + "K";
        } else {
          // Otherwise, return the original number.
          return number;
        }
      }
    const [isFollowed, setIsFollowed] = useState(false); 
    const [isBlocked, setIsBlocked] = useState(false);
    const navigate = useNavigate();
      //show toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isModerator, setIsModerator] = useState(false);
    const [moreMenuOption, setMoreMenuOption] = useState(0);
    const [inputPosition, setInputPosition] = useState({ top: 0, left: 0, height: 0, width: 0 });
    const menuRef = useRef(null);
    useEffect(() => {
        FollowRoutes.FollowCheck(props.channelId, userGlobal.UserId).then((res) => {
            console.log("isfollowed: ", res);
            setIsFollowed(res);
        });
        ModCheck(userGlobal.UserId, props.channelId).then((res) => {
            console.log("isModerator: ", res);
            setIsModerator(res);
        });
    }, [])
    
    useEffect(() => {
        if (showMoreMenu && menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            console.log(rect);
            setInputPosition({ top: rect.bottom - 1.5, left: rect.left - 1, height: rect.height, width: rect.width - 2 });
        }
    }, [showMoreMenu]);
    const handleFollow = () => {
        if(userGlobal.UserId === undefined){
            setToastMessage("Please login to follow this channel");
            setShowToast(true);
            return;
        }
        if(isFollowed){
            FollowRoutes.Unfollow(props.channelId, userGlobal.UserId).then((res) => {
                console.log(res);
                setToastMessage("Unfollowed " + props.userName);
                setIsFollowed(false);
                setShowToast(true);
            });
        }
        else{
            FollowRoutes.Follow(props.channelId, userGlobal.UserId).then((res) => {
                console.log(res);
                setToastMessage("Followed " + props.userName);
                setIsFollowed(true);
                setShowToast(true);
            })
        }
    }
    const HandleBlock = () => {
        console.log("Block user");
        if(userGlobal.UserId === undefined){
            setToastMessage("Please login");
            setShowToast(true);
            return;
        }
            BlockRoutes.blockUser({
                ChannelId: userGlobal.UserId,
                UserId: props.channelId
            }).then((res) => {
                console.log(res);
                setToastMessage("Blocked " + props.userName);
                setIsBlocked(true);
                setShowToast(true);
                navigate(`/blocked?self=${encodeURIComponent(userGlobal.UserId)}&blocked=${encodeURIComponent(props.channelId)}&name=${encodeURIComponent(props.qname)}`);
            });
    }
    const HandleModAssign = () => {
        console.log("Assign moderator");
        if(userGlobal.UserId === undefined){
            setToastMessage("Please login");
            setShowToast(true);
            return;
        }
        if(!isModerator){
            RoleRoutes.addRole({
                ChannelId: userGlobal.UserId,
                UserId: props.channelId,
                RoleId: 3
            }).then((res) => {
                console.log(res);
                setToastMessage("Moderator assigned");
                setIsModerator(true);
                setShowToast(true);
                setMoreMenuOption(0);
            });
        }
        else{
            RoleRoutes.removeRole({
                ChannelId: userGlobal.UserId,
                UserId: props.channelId,
                RoleId: 3
            }).then((res) => {
                console.log(res);
                setToastMessage("Moderator removed");
                setIsModerator(false);
                setShowToast(true);
                setMoreMenuOption(0);
            });
        }
        

    }
    return(
        <>
        <div className="sui__layout fill__container">
            <div className="sui__holder rr__flex-col">
                {/* content here */}
                <div className="suiu__info-holder rr__flex-row fill__container">
                    <div className="uih__left-holder rr__flex-row">
                            <img src={props.profilePic ? props.profilePic : Assets.defaultAvatar} className="avatar__2x"/>
                        
                        <div className="uih__context-holder rr__flex-col">
                            <div className="uihc__h-username league-spartan-semibold fs__large-1 citizenship">
                                {props.status? props.userName: `${props.userName} (offline)`}
                            </div>
                            <div className="uihc__h-title league-spartan-semibold fs__normal-2 citizenship">
                                {props.title}
                            </div>
                            <div className="uihc__h-tag rr__flex-row">
                                <div className="uihc__h-category league-spartan-light fs__normal-2" onClick={() => {
                                    navigate(`/category/${props.category.categoryId}`);
                                }}>
                                    {props.category.categoryName}
                                </div>
                                <div className="uihc__h-tag__holder rr__flex-row">
                                    {props.tagList.length > 0 && props.tagList.map((tag, index) => (
                                        <TagCard key={index} name={tag.tagName} id={tag.tagId}/>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="uih__right-holder rr__flex-col">
                        <div className="uihr__btn-holder rr__flex-row">
                            <BtnIcon icons={faShareFromSquare}/>
                            { (userGlobal.UserId !== props.channelId) && <BtnIcon icons={faHeart} color={isFollowed ? Colors.secondary : "#fff"} onClick={handleFollow}/>}
                        </div>
                        <div className="uihr__view-holder rr__flex-row">
                            <span className="uihr__view-count citizenship league-spartan-semibold fs__large-1">
                                <FontAwesomeIcon icon={faEye} /> {props.viewCount}
                            </span>
                            <div ref={menuRef}>
                            {(userGlobal.UserId !== props.channelId) && <BtnIcon icons={faEllipsis} onClick={() => {
                                setShowMoreMenu(!showMoreMenu);
                                }}/>}
                            </div>
                            <MenuHolder styles={{
                                top: `${inputPosition.top}px`,
                                left: `${inputPosition.left - inputPosition.height - 110}px`,
                                display: showMoreMenu ? "flex" : "none",
                            }}>
                                <MenuOptionBtn icon={faBan} optionName={"Block"} styles={{
                                    width: "100%"
                                }}
                                onClick={() => {
                                    setMoreMenuOption(1);
                                    setShowMoreMenu(false);
                                }}
                                />
                                <MenuOptionBtn icon={faInfoCircle} optionName={"About"} styles={{
                                width: "100%"
                                }}
                                onClick={() => {
                                    setMoreMenuOption(2);
                                    setShowMoreMenu(false);
                                }}
                                />
                                <MenuOptionBtn icon={faWrench} optionName={isModerator? "Remove moderator" : "Assign Moderator"} styles={{
                                width: "100%"
                                }}
                                onClick={() => {
                                    setMoreMenuOption(3);
                                    setShowMoreMenu(false);
                                }}
                                />
                            </MenuHolder>
                            {moreMenuOption === 1 ? (
                                <CustomModal 
                                    type={"block-confirm"}
                                    offModal={() => setMoreMenuOption(0)}
                                    user={props.userName}
                                    block={() => {
                                        HandleBlock();
                                    }}
                                />
                            ): moreMenuOption === 3 ? 
                            (<>
                                <CustomModal 
                                    type={"moderator-confirm"}
                                    offModal={() => setMoreMenuOption(0)}
                                    modcheck={isModerator}
                                    user={props.userName}
                                    confirm={() => {
                                        HandleModAssign();
                                    }}
                                />
                            </>) 
                            : <></>}
                        </div>
                    </div>
                </div>
                <div className="user__about-holder rr__flex-col citizenship">
                    <span className="fs__large-3 league-spartan-semibold">About {props.userName}</span>
                    <div className="uah__context-holder rr__flex-col">
                        <span className="fs__normal-3 league-spartan-regular">Most recent stream: {new Date(props.date).toLocaleString()}</span>
                        <div className="uah__desc league-spartan-light fs__normal-2">
                            {props.desc || `This is ${props.userName}'s stream. Enjoy!`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showToast && (
            <Toast
                message={toastMessage}
                onDispose={() => setShowToast(false)}
            />
        )}
        </>
    );
}