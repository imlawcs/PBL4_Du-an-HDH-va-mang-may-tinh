import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { Colors } from "../constants/Colors";
import { BlockRoutes } from "../API/Block.routes";

export default function Blocked(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(searchParams);
        if(searchParams.get("name") === null || searchParams.get("self") === null || searchParams.get("blocked") === null || searchParams.size > 3){
            navigate("/404");
        }
    }, [searchParams]);
    return (
        <>
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
                            You have blocked this user
                        </span>
                        <span className="league-spartan-regular citizenship fill__container fs__normal-3 ta__left">
                            Unblock to view {searchParams.get("name")}'s contents
                        </span>
                    </div>
                </div>
                <Button type={"default"} text="Go back to home" onClick={() => window.location.href = "/"} />
                <Button type={"default"} text="Unblock" onClick={() => {
                    BlockRoutes.unblockUser({
                        channelId: searchParams.get("self"),
                        UserId: searchParams.get("blocked"),
                    }).then(() => {
                        navigate(`/user/${searchParams.get("name")}`);
                    })
                }} />

            </div>
        </>
    )
}