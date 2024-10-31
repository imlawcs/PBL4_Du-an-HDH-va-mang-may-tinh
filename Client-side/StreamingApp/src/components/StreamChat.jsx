import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatComp from "./ChatComp";
import {
  faArrowCircleLeft,
  faArrowRightFromBracket,
  faEye,
  faIcons,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "../assets/css/StreamChat.css";
import BtnIcon from "./BtnIcon";
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { SignalRTest } from "../scripts/webrtcTemp";
export default function StreamChat(props) {
  const context =
    "Consequat ex amet quis aliqua duis. Aute sunt cupidatat irure ex anim cillum Lorem culpa. Aute elit commodo occaecat sunt elit culpa qui mollit. Commodo id officia adipisicing pariatur consectetur tempor occaecat.";
  const [isVisible, setVisible] = useState(true);
  const auth = useAuth();
  if (isVisible)
    return (
      <>
        <div className="stream__chat">
          <div className="sc__header">
            <div className="sc__header-holder rr__flex-row">
              <BtnIcon
                icons={faArrowRightFromBracket}
                onClick={() => setVisible(!isVisible)}
              />
              <span className="fs__normal-2 league-spartan-semibold citizenship mx-auto">
                STREAM CHAT
              </span>
              <BtnIcon icons={faEye} />
            </div>
          </div>
          <div className="sc__body">
            <div id="chat__holder" className="sc__body-holder">
              
            </div>
            {/* signalr here */}
          </div>
          <div className="sc__footer rr__flex-col">
            {auth.token ? 
            <>
            <div className="cb__holder rr__flex-row">
              <input
                placeholder="Chat something..."
                className="chat__box-c fs__normal-2 league-spartan-light fill__container"
                type="text"
                name="chat__context"
                id="chat__box"
              />
              <BtnIcon icons={faIcons} />
            </div>
            <div className="sc__btn-holder rr__flex-row">
              <Button type="default" text="Chat" onClick={() => {
                const chatContents = document.getElementById('chat__box').value;
                SignalRTest.sendMessage(chatContents, "random");
              }}/>
            </div>
            </> 
            :
            <>
              <span className="fs__normal-2 fill__container league-spartan-semibold citizenship ta__center">
                Please login to chat
              </span>
            </>
            }
            
          </div>
        </div>
      </>
    );
  else {
    return (
      <>
        <div
          className="enable__chat-btn"
          style={{
            position: "absolute",
            right: "5px",
            top: "4.5em",
          }}
        >
          <BtnIcon
            icons={faArrowCircleLeft}
            onClick={() => setVisible(!isVisible)}
          />
        </div>
      </>
    );
  }
}
