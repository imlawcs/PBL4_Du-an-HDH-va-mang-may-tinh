import { useState } from "react";
import Button from "../Button";
import UserCompAdmin from "./_comp/UserComp";
import CategoryCompAdmin from "./_comp/CategoryComp";
import CustomModal from "../CustomModal";

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
    const [search, setSearch] = useState("");
    const [data, setData] = useState(props.dataList || []);
    const [modal, setModal] = useState({
        status: false,
        action: 0,
        value: -1,
    });
    const renderModal = (id, action) => {
            let prevData = data.filter((item) => item.UserId == id || item.categoryId == id)[0];
            console.log(prevData);
            if(action == 1){
                console.log("edit");
                return(
                    <CustomModal type={"edit"} data={prevData} offModal={() => setModal({
                        status: false,
                        action: 0,
                        value: -1,
                    })}/>
                )
            }
            if(action == 2){
                console.log("detail");
                return(
                    <CustomModal type={"detail"} data={prevData} offModal={() => setModal({
                        status: false,
                        action: 0,
                        value: -1,
                    })}/>
                )
            }
            if(action == 3){
                console.log("del");
                return(
                    <CustomModal type={"delete"} data={prevData} offModal={() => setModal({
                        status: false,
                        action: 0,
                        value: -1,
                    })}/>
                )
            }
            
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
                        <Button type={"default"} text={"Refresh"} onClick={() => props.setRefetch(1)} styles={{
                            backgroundColor: "#2196F3",
                            width: "100%",
                        }}/>
                        <Button type={"default"} text={"Try wiping data"} onClick={() => props.setRefetch(-1)} styles={{
                            backgroundColor: "#f44336",
                            width: "100%",
                        }}/>
                        <span className="league-spartan-regular citizenship fs__normal-1">
                            After wiping out previous data, click "Refresh" to see the changes or 
                            simply refresh to see the changes.
                        </span>
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
                                paddingLeft: "1em !important",
                                paddingTop: "0.5em",
                                paddingBottom: "0.5em",
                                width: "99%"
                            }}
                        />
                        <div style={{
                                maxHeight: "36em",
                                overflowY: "scroll",
                                // scrollbarColor: "#000000 #ffffff",
                            }}>
                            <div className="rr__flex-col rrf__row-small">
                                {data.length > 0 ? data
                                .filter((item) => item.UserName.toLowerCase().includes(search.toLowerCase()))
                                .map((item, index) => 
                                    <UserCompAdmin user={item} key={index} renderModal={setModal}/>
                                )
                                : 
                                <span className="league-spartan-regular citizenship fs__normal-3 fill__container ta__center">
                                    No data found, try refreshing
                                </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {modal.status && renderModal(modal.value, modal.action)}
            </>
        )
    }
    else if(props.current === "categories"){
        
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center">
                    Categories Management
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
                        text="Add new category" 
                        styles={{
                            width: "100%",
                        }}
                        onClick={() => console.log("Add User")} 
                        />
                        <Button 
                        type="default" 
                        text="Delete multiple catecories" 
                        styles={{
                            width: "100%",
                        }}
                        onClick={() => console.log("Delete User")}/>
                        <Button type={"default"} text={"Refresh"} onClick={() => props.setRefetch(2)} styles={{
                            backgroundColor: "#2196F3",
                            width: "100%",
                        }}/>
                        <Button type={"default"} text={"Try wiping data"} onClick={() => props.setRefetch(-2)} styles={{
                            backgroundColor: "#f44336",
                            width: "100%",
                        }}/>
                        <span className="league-spartan-regular citizenship fs__normal-1">
                            After wiping out previous data, click refresh to see the changes.
                        </span>
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
                                paddingLeft: "1em !important",
                                paddingTop: "0.5em",
                                paddingBottom: "0.5em",
                                width: "99%"
                            }}
                        />
                        <div style={{
                            maxHeight: "36em",
                            overflowY: "scroll",
                            scrollbarColor: "#000000 #ffffff",
                        }}>
                            <div className="rr__flex-col rrf__row-small">
                                {data.length > 0 ? 
                                data
                                .filter((item) => item.categoryName.toLowerCase().includes(search.toLowerCase()))
                                .map((item, index) => 
                                    <CategoryCompAdmin category={item} key={index} renderModal={setModal}/>
                                )
                                : 
                                <span className="league-spartan-regular citizenship fs__normal-3 fill__container ta__center">
                                    No data found, try refreshing
                                </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {modal.status && renderModal(modal.value, modal.action)}
            </>
        )
    }
    else if(props.current === "streams"){
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center">
                    Streams Management
                </h1>
                <div className="rr__flex-col rrf__row-small def-pad-1 no__padding-tb">
                    <span className="league-spartan-bold fs__large-1 citizenship fill__container ta__left">
                        Currently Live
                    </span>
                    <span className="league-spartan-bold fs__large-1 citizenship fill__container ta__left">
                        History
                    </span>
                </div>
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