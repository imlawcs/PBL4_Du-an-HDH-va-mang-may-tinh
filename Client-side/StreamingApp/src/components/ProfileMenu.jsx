import { useState } from "react";
import MenuOptionBtn from "./MenuOptionBtn";
import {
  faArrowRightFromBracket,
  faCode,
  faUserGear,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/ProfileMenu.css";
import { useNavigate } from "react-router-dom";
export default function ProfileMenu(props) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  if (!isChecked)
    return (
      <div className="profile__menu">
        <img
          className="img__holder"
          src={props.imgLink}
          alt="User profile pic"
          onClick={() => setIsChecked(!isChecked)}
          style={{
            cursor: "pointer",
            objectFit: "cover",
          }}
        />
      </div>
    );
  else
    return (
      <>
        <div className="profile__menu">
          <img
            className="img__holder"
            src={props.imgLink}
            alt="User profile pic"
            onClick={() => setIsChecked(!isChecked)}
            style={{
              cursor: "pointer",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="dd__menu">
          <div className="user__info-holder">
            <img
              className="img__holder"
              src={props.imgLink}
              alt="User profile pic"
              style={{
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
            <div className="uih__name league-spartan-semibold">
              {props.userName}
            </div>
          </div>
          <div className="opt__holder">
            <MenuOptionBtn
              icon={faWaveSquare}
              optionName="Stream Manager"
              onClick={() => navigate("/streamManager")}
            />
            <MenuOptionBtn
              icon={faUserGear}
              optionName="Profile Settings"
              onClick={() => navigate("/accountSetting")}
            />
            
            {props.roleCheck && 
            <>
              <MenuOptionBtn
                icon={faCode}
                optionName="Test"
                onClick={() => navigate("/test")}
              />
              <MenuOptionBtn
                icon={faCode}
                optionName="Admin"
                onClick={() => navigate("/admin")}
              />
            </>
            }
            <MenuOptionBtn
                icon={faArrowRightFromBracket}
                optionName="Log out"
                onClick={props.logout}
            />
          </div>
        </div>
      </>
    );
}
