import { useState } from "react";
import { Colors } from "../../../constants/Colors";
import Button from "../../Button";
import { Assets } from "../../../constants/Assets";
import { ApiConstants } from "../../../API/ApiConstants";

export default function StreamCompAdmin(props){
    const [stream, setStream] = useState(props.stream|| {});
    return (
        
            <div className="user__comp-admin fill__container rr__flex-row rrf__ai-center rrf__jc-space-between" style={{
                backgroundColor: Colors.primary,
                padding: "0.5em",
                maxWidth: "98%",
                borderRadius: "0.5em",
            }}>
                <div className="info__holder rr__flex-row rrf__col-normal rrf__ai-center">
                    <img src={stream.streamThumbnail? ApiConstants.BASE_URL + stream.streamThumbnail : Assets.defaultThumbnail} className="avatar__2x" style={{
                        width: "8em",
                        height: "4em",
                        borderRadius: "0.4em",
                        objectFit: "cover",
                    }}/>
                    <div className="rr__flex-col rrf__jc-space-between">
                        <div className="league-spartan-bold fs__normal-3 citizenship">
                            {stream.streamTitle}
                        </div>
                        <div className="league-spartan-light fs__normal-2 citizenship">
                            {stream.streamDesc}
                        </div>
                        <div className="league-spartan-light fs__normal-2 citizenship">
                            {new Date(stream.streamDate).toLocaleString()}
                        </div>
                    </div>
                </div>
                <div className="rr__flex-row rrf__col-small rrf__ai-center">
                    {/* <Button type="default" text="Edit" onClick={() => 
                        props.renderModal({
                            status: true,
                            action: 1,
                            value: stream.streamId,
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
                            value: stream.streamId,
                        })
                        
                    } styles={{
                        backgroundColor: "#f44336",
                        color: "#ffffff",
                        fontWeight: 300,
                         // Red for delete
                    }}/> */}
                    <Button type="default" text="Detail" onClick={() => 
                        props.renderModal({
                            status: true,
                            action: 2,
                            value: stream.streamId,
                        })
                    } styles={{
                        backgroundColor: "#2196F3",
                        color: "#ffffff",
                        fontWeight: 300,
                    }}/>
                </div>
            </div>
    )
}