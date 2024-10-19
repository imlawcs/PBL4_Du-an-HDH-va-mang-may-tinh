import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
  faUserGear,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/MenuOptionBtn.css";
export default function MenuOptionBtn(props) {
  return (
    <div className="option__btn" onClick={props.onClick}>
      <div className="option__icon">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div className="option__text league-spartan-semibold">
        {props.optionName}
      </div>
    </div>
  );
}
