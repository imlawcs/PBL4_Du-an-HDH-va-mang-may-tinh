import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBarChart,
  faHouse,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/SbMenuLabel.css";

export default function SbMenuLabel(props) {
  if (props.type == "toggle")
    return (
      <>
        <div className="sb__option-label_toggled" onClick={props.onClick}>
          <div className="icon">
            <FontAwesomeIcon icon={props.icon} />
          </div>
          <div className="text league-spartan-light">{props.text}</div>
        </div>
      </>
    );
  else
    return (
      <div className="sb__option-label" onClick={props.onClick}>
        <div className="icon">
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <div className="text league-spartan-light">{props.text}</div>
      </div>
    );
}
