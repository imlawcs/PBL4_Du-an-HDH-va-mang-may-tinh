import TagCard from "./TagCard";
import '../assets/css/StreamUserInfo.css'
import BtnIcon from "./BtnIcon";
import { faEllipsis, faEye, faHeart, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { useEffect, useState } from "react";
import { SignalRTest } from "../scripts/webrtcTemp";
import { Colors } from "../constants/Colors";
import Toast from "./Toast";
import { UserRoutes } from "../API/User.routes";
export default function StreamUserInfo(props) {
    function doNothing() {
        return;
    }
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
      //show toast
    const [showToast, setShowToast] = useState(false);

    const handleFollow = () => {
        setIsFollowed(!isFollowed);
        setShowToast(true);
    }

    return(
        <>
        <div className="sui__layout fill__container">
            <div className="sui__holder rr__flex-col">
                {/* content here */}
                <div className="suiu__info-holder rr__flex-row fill__container">
                    <div className="uih__left-holder rr__flex-row">
                          
                            <img src={props.profilePic} className="avatar__2x"/>
                        
                        <div className="uih__context-holder rr__flex-col">
                            <div className="uihc__h-username league-spartan-semibold fs__large-1 citizenship">
                                {props.userName}
                            </div>
                            <div className="uihc__h-title league-spartan-semibold fs__normal-2 citizenship">
                                {props.title}
                            </div>
                            <div className="uihc__h-tag rr__flex-row">
                                <div className="uihc__h-category league-spartan-light fs__normal-2">
                                    {props.category}
                                </div>
                                <div className="uihc__h-tag__holder rr__flex-row">
                                    {/* map tag here */}
                                    <TagCard name="English"/>
                                    <TagCard name="Vietnamese"/>
                                    <TagCard name="RPG"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="uih__right-holder rr__flex-col">
                        <div className="uihr__btn-holder rr__flex-row">
                            <BtnIcon icons={faShareFromSquare}/>
                            <BtnIcon icons={faHeart} color={isFollowed ? Colors.secondary : "#fff"} onClick={handleFollow}/>
                        </div>
                        <div className="uihr__view-holder rr__flex-row">
                            <span className="uihr__view-count citizenship league-spartan-semibold fs__large-1">
                                <FontAwesomeIcon icon={faEye} /> {props.viewCount}
                            </span>
                            <BtnIcon icons={faEllipsis}/>
                        </div>
                    </div>
                </div>
                <div className="user__about-holder rr__flex-col citizenship">
                    <span className="fs__large-3 league-spartan-semibold">About {props.userName}</span>
                    <div className="uah__context-holder rr__flex-col">
                        <span className="fs__normal-3 league-spartan-regular">{shortenNumber(props.flCount)} Followers</span>
                        <div className="uah__desc league-spartan-light fs__normal-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, minima? Enim, ex fuga, eligendi consequatur quis alias ipsum est omnis velit, porro rerum. Veniam eius ullam quod voluptates mollitia molestiae.
                        </div>
                        <div className="uihr__btn-holder rr__flex-col">
                            <Button type={"link-type"} text={"btn_1"} onClick={doNothing()}/>
                            <Button type={"link-type"} text={"btn_2"} onClick={doNothing()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showToast && (
            <Toast
                message={isFollowed ? "Followed" : "Unfollowed"}
                onDispose={() => setShowToast(false)}
            />
        )}
        </>
    );
}