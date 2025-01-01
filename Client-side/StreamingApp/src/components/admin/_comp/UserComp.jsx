import { Assets } from "../../../constants/Assets";
import { Colors } from "../../../constants/Colors";
import Button from "../../Button";
import "../../../assets/css/UserCompAdmin.css";
import { useState } from "react";
import { ApiConstants } from "../../../API/ApiConstants";
export default function UserCompAdmin(props){
    const [user, setUser] = useState(props.user|| {} );
    return (
        <div className="user__comp-admin fill__container rr__flex-row rrf__ai-center rrf__jc-space-between" style={{
            backgroundColor: Colors.primary,
            padding: "0.5em",
            maxWidth: "98%",
            borderRadius: "0.5em",
        }}>
            <div className="info__holder rr__flex-row rrf__col-normal rrf__ai-center">
                <img src={user.ProfilePic? ApiConstants.BASE_URL + user.ProfilePic : Assets.defaultAvatar} className="avatar__2x" style={{
                    width: "4em",
                    height: "4em",
                    objectFit: "cover",
                }}/>
                <div className="rr__flex-col rrf__jc-space-between">
                    <div className="league-spartan-bold fs__normal-3 citizenship">
                        {user.DisplayName}
                    </div>
                    <div className="league-spartan-light fs__normal-2 citizenship">
                        {user.Email}
                    </div>
                    <div className="league-spartan-light fs__normal-2 citizenship">
                        {user.Roles[0]? user.Roles[0].roleName: "undefined"}
                    </div>
                </div>
            </div>
            <div className="rr__flex-row rrf__col-small rrf__ai-center">
                <Button type="default" text="Edit" onClick={() => 
                    props.renderModal({
                        status: true,
                        action: 1,
                        value: user.UserId,
                    })
                } styles={{
                    backgroundColor: "#4CAF50", // Green for edit
                    color: "#ffffff",
                    fontWeight: 300,
                }}/>
                <Button type="default" text="Delete" onClick={() => 
                    props.renderModal({
                        status: true,
                        action: 3,
                        value: user.UserId,
                    })
                    
                } styles={{
                    backgroundColor: "#f44336",
                    color: "#ffffff",
                    fontWeight: 300,
                     // Red for delete
                }}/>
                <Button type="default" text="Detail" onClick={() => 
                    props.renderModal({
                        status: true,
                        action: 2,
                        value: user.UserId,
                    })
                } styles={{
                    backgroundColor: "#2196F3",
                    color: "#ffffff",
                    fontWeight: 300,
                     // Blue for detail
                }}/>
            </div>
        </div>
    )
}