import "../assets/css/IconCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faEnvelope,
  faHouse,
  faPenToSquare,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import BtnIcon from "./BtnIcon";
export default function IconCard(props) {
  return (
    <>
      <div className="ic__container bg__color-2">
        <div className="rr__flex-row rrf__ai-center">
          <div className={`ic__icon-holder ${props.iconColor} fs__large-2`}>
            <FontAwesomeIcon icon={props.icon} />
          </div>
          <span className="fs__normal-2 league-spartan-regular citizenship">
            {props.text}
          </span>
        </div>
        <BtnIcon icons={faPenToSquare} onClick={() => props.onClick()}/>
      </div>
    </>
  );
}
