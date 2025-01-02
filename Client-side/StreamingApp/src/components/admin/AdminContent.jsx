import { useEffect, useState } from "react";
import Button from "../Button";
import UserCompAdmin from "./_comp/UserComp";
import CategoryCompAdmin from "./_comp/CategoryComp";
import CustomModal from "../CustomModal";
import StreamCompAdmin from "./_comp/StreamComp";
import { compareDates, StreamStatus } from "../../API/Stream.route";
import { use } from "react";
import { Colors } from "../../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Scale
} from 'chart.js';
import { AdminCheck } from "../../scripts/AdminCheck";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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
    useEffect(() => {
        console.log("Modal status:", modal);
    }, [modal]);
    const renderModal = (id, action) => {
            let prevData = data.filter((item) => item.UserId == id || item.categoryId == id || item.streamId == id)[0];
            console.log(prevData);
            if(action == 1){
                console.log("edit");
                return(
                    <CustomModal type={"edit"} data={prevData} offModal={() => setModal({
                        status: false,
                        action: 0,
                        value: -1,
                    })} refresh={props.setRefetch}/>
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
                    })} refresh={props.setRefetch}/>
                )
            }
            if(action == 4){
                console.log("add");
                return(
                    <CustomModal type={"add"} addCheck={id==727? "user" : "category"} offModal={() => setModal({
                        status: false,
                        action: 0,
                        value: -1,
                    })} refresh={props.setRefetch}/>
                )
            }
            
    }
    if(props.current === "dashboard"){
        const renderData = () => {
            return (
                <>
                <div className="fill__container rr__flex-col rrf__row-small rrf__ai-center rrf__jc-center" 
                style={{
                    height: defaultHeight, 
                    backgroundColor: Colors.primary,
                    borderRadius: "0.5em",
                    cursor: "pointer",
                }}
                onClick={() => props.setOption("users")}
                >
                    <FontAwesomeIcon 
                        icon={faUsers}
                        size="3x"
                        color="#ffffff"
                    />
                    <span className="league-spartan-regular citizenship fs__normal-3">
                        {data.users.length} active users
                    </span>
                </div>
                <div className="fill__container rr__flex-col rrf__row-small rrf__ai-center rrf__jc-center" 
                style={{
                    height: defaultHeight, 
                    backgroundColor: Colors.primary,
                    borderRadius: "0.5em",
                    cursor: "pointer",
                }}
                onClick={() => props.setOption("categories")}
                >
                    <FontAwesomeIcon 
                        icon={faList}
                        size="3x"
                        color="#ffffff"
                    />
                    <span className="league-spartan-regular citizenship fs__normal-3">
                        {data.categories.length} categories
                    </span>
                </div>
                <div className="fill__container rr__flex-col rrf__row-small rrf__ai-center rrf__jc-center" 
                style={{
                    height: defaultHeight, 
                    backgroundColor: Colors.primary,
                    borderRadius: "0.5em",
                    cursor: "pointer",
                }}
                onClick={() => props.setOption("streams")}
                >
                    <FontAwesomeIcon
                        icon={faVideo}
                        size="3x"
                        color="#ffffff"
                    />
                    <span className="league-spartan-regular citizenship fs__normal-3">
                        {data.streams.length} streaming datas
                    </span>
                </div>
                </>
            )
        }
        const renderChart = () => {
            return(
                <>
                <div style={{
                    flex: 1
                }}>
                    <Line 
                    style={{
                        backgroundColor: Colors.primary,
                        borderColor: Colors.secondary,
                        borderWidth: 1,
                        borderRadius: "0.5em",
                        padding: "0.5em",
                        
                    }}
                        data={{
                            labels: [...new Set(data.streams.map(item => 
                                `${new Date(item.streamDate).toLocaleString('default', { month: 'long' })} ${new Date(item.streamDate).getFullYear()}`))],
                            datasetIdKey: "streams",
                            datasets: [
                                {
                                    label: "Number of Streams per Month",
                                    data: [...new Set(data.streams.map(item => 
                                        `${new Date(item.streamDate).toLocaleString('default', { month: 'long' })} ${new Date(item.streamDate).getFullYear()}`))].map(monthYear => 
                                            data.streams.filter(stream => 
                                                `${new Date(stream.streamDate).toLocaleString('default', { month: 'long' })} ${new Date(stream.streamDate).getFullYear()}` === monthYear
                                            ).length
                                        ),
                                    backgroundColor: Colors.primary,
                                    borderColor: Colors.secondary,
                                    borderWidth: 1,
                                    pointRadius: 5,
                                    pointHoverRadius: 7,
                                    pointBackgroundColor: Colors.secondary,
                                    pointBorderColor: Colors.primary,
                                    pointHoverBackgroundColor: Colors.primary,
                                    pointHoverBorderColor: Colors.secondary,
                                }
                            ]
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }}
                    />
                </div>
                <div style={{
                    flex: 1
                }}>
                    <Bar 
                        style={{
                            backgroundColor: Colors.primary,
                            borderColor: Colors.secondary,
                            borderWidth: 1,
                            borderRadius: "0.5em",
                            padding: "0.5em",
                            width: "50vh",
                        }}
                        data={{
                            labels: [...new Set(data.streams.flatMap(stream => 
                                stream.streamCategories.map(cat => 
                                    data.categories.find(c => c.categoryId === cat.categoryId)?.categoryName
                                )
                            ))],
                            datasets: [{
                                label: "Streams per Category",
                                data: [...new Set(data.streams.flatMap(stream => 
                                    stream.streamCategories.map(cat => cat.categoryId)
                                ))].map(catId => 
                                    data.streams.filter(stream => 
                                        stream.streamCategories.some(cat => cat.categoryId === catId)
                                    ).length
                                ),
                                backgroundColor: Colors.secondary,
                                borderColor: Colors.primary,
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            indexAxis: 'y',
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }}
                    />
                </div>
                </>
            )
        }
        return (
            <>
                <h1 className="league-spartan-bold citizenship fill__container ta__center fs__title-2">
                    Dashboard
                </h1>
                <span className="league-spartan-regular citizenship fs__normal-3 fill__container ta__center">
                    Navigate through the sidebar menu to see the details
                </span>
                <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                    {renderData()}
                </div>
                <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb"
                    style={{
                        maxWidth: "100%",
                    }}
                >
                    {renderChart()}
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
                        onClick={() => setModal({
                            status: true,
                            action: 4,
                            value: 727,
                        })} 
                        />
                        <Button type={"default"} text={"Refresh"} onClick={() => props.setRefetch(1)} styles={{
                            backgroundColor: "#2196F3",
                            width: "100%",
                        }}/>
                        {/* <Button type={"default"} text={"Try wiping data"} onClick={() => props.setRefetch(-1)} styles={{
                            backgroundColor: "#f44336",
                            width: "100%",
                        }}/> */}
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
                                .map((item) => 
                                    <UserCompAdmin user={item} key={item.UserId} renderModal={setModal}/>
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
                        onClick={() => setModal({
                            status: true,
                            action: 4,
                            value: 272,
                        })} 
                        />
                        <Button type={"default"} text={"Refresh"} onClick={() => props.setRefetch(2)} styles={{
                            backgroundColor: "#2196F3",
                            width: "100%",
                        }}/>
                        {/* <Button type={"default"} text={"Try wiping data"} onClick={() => props.setRefetch(-2)} styles={{
                            backgroundColor: "#f44336",
                            width: "100%",
                        }}/> */}
                    </div>

                    <div className="rr__flex-col rrf__row-small fill__container" style={{
                        flex: 4,
                    }}>
                        <input type="text"
                            className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship fill__container"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="Search for category..."
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
                                {data
                                .filter((item) => item?.categoryName?.toLowerCase().trim().includes(search?.toLowerCase().trim() || '')).length > 0 ? 
                                data
                                .filter((item) => item?.categoryName?.toLowerCase().trim().includes(search?.toLowerCase().trim() || ''))
                                .map((item) => 
                                    <CategoryCompAdmin category={item} key={item.categoryId} renderModal={setModal}/>
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
                    <Button type={"default"} text={"Refresh"} onClick={() => props.setRefetch(3)} styles={{
                        backgroundColor: "#2196F3",
                        width: "100%",
                    }}/>
                    <span className="league-spartan-bold fs__large-1 citizenship fill__container ta__left">
                        Currently Live
                    </span>
                    <div className="rr__flex-col rrf__row-normal def-pad-1 no__padding-tb" style={{
                        flexDirection: "column-reverse",
                    }}>
                        {data.filter((item) => item.isLive == true).length > 0 ? 
                        data
                        .filter((item) => item.isLive == true)
                        .map((item) =>
                        <StreamCompAdmin stream={item} key={item.streamId} renderModal={setModal}/>
                        )
                        :
                        <>
                            <span className="league-spartan-regular citizenship fs__normal-3 fill__container ta__center">
                                No currently live stream
                            </span>
                        </>}
                        
                    </div>
                    <span className="league-spartan-bold fs__large-1 citizenship fill__container ta__left">
                        History
                    </span>
                    <div className="rr__flex-col rrf__row-normal def-pad-1 no__padding-tb" style={{
                        flexDirection: "column-reverse",
                    }}>
                        {data.filter((item) => item.isLive == false && item.streamStatus == StreamStatus.FINISHED).length > 0 ? 
                        data
                        .filter((item) => item.isLive == false && item.streamStatus == StreamStatus.FINISHED)
                        .map((item) =>
                        <StreamCompAdmin stream={item} key={item.streamId} renderModal={setModal}/>
                        )
                        :
                        <>
                            <span className="league-spartan-regular citizenship fs__normal-3 fill__container ta__center">
                                No currently live stream
                            </span>
                        </>}
                    </div>
                </div>
                {modal.status && renderModal(modal.value, modal.action)}
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