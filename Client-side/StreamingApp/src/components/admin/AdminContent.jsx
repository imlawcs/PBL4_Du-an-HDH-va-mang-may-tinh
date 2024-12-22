import { useState } from "react";
import Button from "../Button";

export default function AdminContent(props){
    const defaultHeight = "10em";
    const getRandomColorHex = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const renderSampleDiv = (heightValue, flexData) => {
        return (
            <div className="fill__container" 
            style={{
                height: heightValue? heightValue : defaultHeight, 
                flex: flexData && flexData,
                backgroundColor: getRandomColorHex(),
            }}></div>
        )
    }
    if(props.current === "dashboard"){
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center">
                    Dashboard
                </h1>
                <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                    {renderSampleDiv()}
                    {renderSampleDiv()}
                    {renderSampleDiv()}
                </div>
                <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                    {renderSampleDiv("20em")}
                    {renderSampleDiv("20em")}
                    {renderSampleDiv("20em")}
                    {renderSampleDiv("20em")}
                </div>
                <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                    {renderSampleDiv("20em", 6)}
                    <div className="rr__flex-col rrf__row-small fill__container fill__y" style={{
                        flex: 7,
                    }}>
                        {renderSampleDiv("auto", 1)}
                        {renderSampleDiv("auto", 1)}
                        {renderSampleDiv("auto", 1)}
                    </div>
                </div>
            </>
        )
    }
    else if(props.current === "users"){
        const [search, setSearch] = useState("");
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center">
                    Users Management
                </h1>
                <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                    <div className="rr__flex-col rrf__row-small rrf__ai-center" style={{
                        flex: 1,
                    }}>
                        <span className="league-spartan-semibold citizenship fill__container ta__center fs__large-3">
                            Tools
                        </span>
                        <Button 
                        type="default" 
                        text="Add User" 
                        styles={{
                            width: "100%",
                        }}
                        onClick={() => console.log("Add User")} 
                        />
                        <Button 
                        type="default" 
                        text="Delete User" 
                        styles={{
                            width: "100%",
                        }}
                        onClick={() => console.log("Delete User")}/>
                    </div>
                    <div className="rr__flex-col rrf__row-small fill__container" style={{
                        flex: 4,
                    }}>
                        
                        <input type="text"
                            className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship fill__container"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for user..."
                            style={{
                                paddingLeft: "0.5em !important",
                                paddingTop: "0.5em",
                                paddingBottom: "0.5em",
                                width: "99.5%"
                            }}
                        />
                        {renderSampleDiv("5em")}
                        {renderSampleDiv("5em")}
                        {renderSampleDiv("5em")}
                    </div>
                </div>
                
            </>
        )
    }
    else if(props.current === "categories"){
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center">
                    Categories Management
                </h1>
                {renderSampleDiv()}
                {renderSampleDiv()}
            </>
        )
    }
    else if(props.current === "streams"){
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center">
                    Streams Management
                </h1>
                {renderSampleDiv()}
                {renderSampleDiv()}
            </>
        )
    }
    else{
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center">
                    404 Not Found
                </h1>
            </>
        )
    }

    
}