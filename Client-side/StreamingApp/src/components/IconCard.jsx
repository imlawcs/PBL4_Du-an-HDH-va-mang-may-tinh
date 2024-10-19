import "../assets/css/IconCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faEnvelope,
  faHouse,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
export default function IconCard(props) {
  return (
    <>
      <div className="ic__container bg__color-2" onClick={props.onClick}>
        <div className={`ic__icon-holder ${props.iconColor} fs__large-2`}>
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <span className="fs__normal-2 league-spartan-regular citizenship">
          {props.text}
        </span>
      </div>
    </>
  );
}
