import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/NotificationComp.css";
export default function NotificationComp(props){
    return (
        <>
            <div className="noti__container"
                onClick={props.onClick}
            >
                <div className="left rr__flex-row">
                    <img src={props.profilePic? props.profilePic : "https://i.imgur.com/neHVP5j.jpg"} alt="" 
                        style={{
                            width: "4.2em",
                            height: "4.2em",
                            borderRadius: "50%",
                            backgroundColor: "transparent",
                            paddingLeft: "0.5em",
                            paddingRight: "0.5em",
                        }}
                    />
                    <div className="rr__flex-col rrf__row-tiny fill__container"
                    style={{
                        paddingTop: "0.2em"
                    }}>
                        <span className="league-spartan-regular fs__normal-2 citizenship">
                            <b>{props.user}</b>{props.message}
                        </span>
                        <span className="league-spartan-light fs__small-3 citizenship">
                            {props.time? props.time + " ago" : "Just now"}
                        </span>
                    </div>
                </div>
                <FontAwesomeIcon icon={faXmark} color="white"
                    style={{
                        width: "1em",
                        height: "1em",
                        padding: "0.5em",
                    }}
                />
            </div>
        </>
    )
}