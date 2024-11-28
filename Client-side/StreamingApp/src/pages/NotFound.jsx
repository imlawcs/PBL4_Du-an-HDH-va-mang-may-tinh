import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/Logo__sieufix.png";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../constants/Colors";
import Button from "../components/Button";
export default function NotFound() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
            rowGap: "1em",
        }}>
            <div className="rr__flex-row rrf__col-normal">
                <FontAwesomeIcon icon={faExclamationCircle} color={Colors.secondary} size="5x" 
                style={{
                    alignSelf: "center",
                }}/>
                <div className="rr__flex-col rrf__row-small">
                    <span className="league-spartan-bold citizenship fill__container ta__left fs__title-1">
                        404 Not Found
                    </span>
                    <span className="league-spartan-regular citizenship fill__container fs__normal-3 ta__left">
                        The page you are looking for does not exist.
                    </span>
                </div>
            </div>
            <Button type={"default"} text="Go back to home" onClick={() => window.location.href = "/"} />
        </div>
    )
}