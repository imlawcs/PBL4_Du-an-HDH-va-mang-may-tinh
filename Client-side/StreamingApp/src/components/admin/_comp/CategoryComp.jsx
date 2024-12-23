import { useState } from "react";
import { Assets } from "../../../constants/Assets";
import { Colors } from "../../../constants/Colors";
import Button from "../../Button";

export default function CategoryCompAdmin(props){
    const [category, setCategory] = useState(props.category||{});
        return (
            <div className="user__comp-admin fill__container rr__flex-row rrf__ai-center rrf__jc-space-between" style={{
                backgroundColor: Colors.primary,
                padding: "0.5em",
                maxWidth: "98%",
                borderRadius: "0.5em",
            }}>
                <div className="info__holder rr__flex-row rrf__col-normal rrf__ai-center">
                    <img src={category.categoryAvatar? category.categoryAvatar : Assets.defaultCategory} className="avatar__2x" style={{
                        width: "6em",
                        height: "8em",
                        objectFit: "cover",
                        borderRadius: "0.5em",
                    }}/>
                    <div className="rr__flex-col rrf__jc-space-between">
                        <div className="league-spartan-bold fs__normal-3 citizenship">
                            {category.categoryName}
                        </div>
                        <div className="league-spartan-light fs__normal-2 citizenship">
                            {category.categoryDesc}
                        </div>
                    </div>
                </div>
                <div className="rr__flex-col rrf__row-small rrf__ai-center">
                    <Button type="default" text="Edit" onClick={() => {}} styles={{
                        backgroundColor: "#4CAF50", // Green for edit
                        color: "#ffffff",
                        fontWeight: 400,
                        width: "4em",
                    }}/>
                    <Button type="default" text="Delete" onClick={() => {}} styles={{
                        backgroundColor: "#f44336",
                        color: "#ffffff",
                        fontWeight: 400,
                         // Red for delete
                        width: "4em",
                    }}/>
                    <Button type="default" text="Detail" onClick={() => {}} styles={{
                        backgroundColor: "#2196F3",
                        color: "#ffffff",
                        fontWeight: 400,
                         // Blue for detail
                        width: "4em",
                    }}/>
                </div>
            </div>
        )
}