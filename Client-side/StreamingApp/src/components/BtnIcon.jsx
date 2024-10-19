import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faClose,
  faArrowRightFromBracket,
  faEye,
  faIcons,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/IconOnlyBtn.css";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function BtnIcon(props) {
  if (props.icons == faIcons) {
    return (
      <>
        <div
          className="rr__icon-btn emoji-btn citizenship"
          onClick={props.onClick}
        >
          <FontAwesomeIcon icon={props.icons} />
        </div>
      </>
    );
  } else if (
    [faGoogle, faFacebook, faXTwitter, faInstagram].includes(props.icons)
  ) {
    return (
      <>
        <div
          className="ic__icon-holder fs__large-2 citizenship"
          onClick={props.onClick}
        >
          <FontAwesomeIcon icon={props.icons} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="rr__icon-btn citizenship" onClick={props.onClick}>
          <FontAwesomeIcon icon={props.icons} />
        </div>
      </>
    );
  }
}
