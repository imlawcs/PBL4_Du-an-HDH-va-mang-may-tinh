import ChatComp from "../components/ChatComp";
import '../assets/css/ComponentTest.css'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ChannelComp from "../components/ChannelComp";
import CustomModal from "../components/CustomModal";
import CategoryComp from "../components/CategoryComp";
import "../assets/css/CustomModal.css";
import { CategoryRoutes } from "../API/Category.routes";
import { useContext, useEffect, useRef, useState } from "react";
import CustomDatalist from "../components/CustomDatalist";
import { TagRoutes } from "../API/Tag.routes";
import MenuHolder from "../components/MenuHolder.main";
import MenuOptionBtn from "../components/MenuOptionBtn";
import { faBan, faBell, faBellConcierge, faEllipsis, faInfoCircle, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";
import TagCard from "../components/TagCard";
import { NotiContext } from "../hooks/NotiProvider";
import BtnIcon from "../components/BtnIcon";
import NotificationComp from "../components/NotificationComp";
export default function ComponentTest() {
  const navigate = useNavigate();
  const notiBtnRef = useRef(null);
  const [notiOpen, setNotiOpen] = useState(false);
  const [notiList, setNotiList] = useState([]);
  const [ready, socket] = useContext(NotiContext);
  const [inputPosition, setInputPosition] = useState({ top: 0, left: 0, height: 0, width: 0 });
  useEffect(() => {
    if(ready && socket)
    {
      socket.on("ReceiveNotification", (user, message) => {
        console.log(`${user}: ${message}`);
        setNotiList(notiList => [...notiList, { user, message }]);
      });
    }
  }, [ready, socket]);
  useEffect(() => {
    if(notiOpen && notiBtnRef.current)
    {
      const rect = notiBtnRef.current.getBoundingClientRect();
      console.log(rect);
      setInputPosition({ top: rect.bottom - 1.5, left: rect.left - 1, height: rect.height, width: rect.width - 2 });
    }
  },[notiOpen]);

  return (
    <>
      <div className="test__container">
        <Button type="default" text="Back to Home" onClick={() => {
          navigate("/");
        }}/>
        {/* <div className="test-comp__holder rr__flex-col rrf__row-tiny">

          <input
          style={{
            zIndex: 100,
          }}
          type="text"
          ref={cateRef}
          className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
          placeholder="Test"
          value={inputValue}
          onFocus={() => {
            setFocus(1);
            console.log("Focus");
          }}
          onBlur={() => {
            if(!mouseDown)
            {
              setFocus(0); 
            console.log("Blur");
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          />
          <CustomDatalist 
            id="categoryList" 
            type="category"
            data={categoryDataList}
            inputValue={inputValue}
            styles={{
              display: focus === 1 ? "flex" : "none",
              position: "absolute",
              top: `${inputPosition.top}px`,
              left: `${inputPosition.left}px`,
              width: `${inputPosition.width}px`,
            }}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => {
              setMouseDown(false)
              setFocus(0);
            }}
            onClick={handleSelectCategory}
          />
          <input
          style={{
            zIndex: 100,
          }}
          type="text"
          ref={tagRef}
          className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
          placeholder="Test"
          value={tagValue}
          onFocus={() => {
            setFocus(2);
            console.log("Focus");
          }}
          onBlur={() => {
            if(!mouseDown)
            {
              setFocus(0); 
            console.log("Blur");
            }
          }}
          onChange={(e) => setTagValue(e.target.value)}
          />
          <CustomDatalist 
            id="tagList"
            type="tag"
            data={tagList}
            inputValue={tagValue}
            styles={{
              display: focus === 2 ? "flex" : "none",
              position: "absolute",
              top: `${inputPosition.top}px`,
              left: `${inputPosition.left}px`,
              width: `${inputPosition.width}px`,
            }}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => {
              setMouseDown(false)
              setFocus(0);
            }}
            onClick={handleSelectTag}
          />
        </div> */}
        <Button type="default" text="Test Websocket" onClick={() => {
          socket.invoke("SendNotification", "usertest" , "Test Notification");
        }}/>
        <div ref={notiBtnRef}>
          <BtnIcon 
            icons={faBell}
            color="white"
            onClick={() => {
              setNotiOpen(!notiOpen);
            }}
          />
        </div>
        <MenuHolder styles={{
          width: "22em",
          paddingLeft: 0,
          paddingRight: 0,
          rowGap: 0,
          top: `${inputPosition.top}px`,
          right: `${inputPosition.left - inputPosition.height + 43}px`,
          display: notiOpen ? "flex" : "none",
          maxHeight: "30em",
          overflowY: "scroll",
        }}
        title="Notification"
        >
          {notiList.length == 0? 
          <>
            <span className="league-spartan-semibold fs__normal-2 citizenship">
              No new notifications
            </span>
          </>
          :
           notiList.map((noti, index) => (
            <NotificationComp 
              key={index}
              user={noti.user}
              message={noti.message}
              time={new Date().toLocaleTimeString()}
              onClick={() => {
                console.log("Clicked");
              }}
            />
          ))}
        </MenuHolder>
      </div>
    </>
  )
}