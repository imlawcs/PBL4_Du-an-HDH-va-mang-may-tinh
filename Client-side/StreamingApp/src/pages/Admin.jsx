import AdminNav from "../components/admin/AdminNav";
import "../assets/css/AdminPage.css";
import AdminSideBar from "../components/admin/AdminSideBar";
import { useEffect, useState } from "react";
import AdminContent from "../components/admin/AdminContent";
import { UserRoutes } from "../API/User.routes";
import { CategoryRoutes } from "../API/Category.routes";
import { StreamRoutes } from "../API/Stream.route";
import { TagRoutes } from "../API/Tag.routes";
export default function AdminPage() {
    const [option, setOption] = useState("dashboard");
    const handleOption = (opt) => {
        setOption(opt);
    };
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [streams, setStreams] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(0);
    const renderMain = () => {
        if(loading) return <h1 className="league-spartan-bold citizenship fill__container ta__center">Loading...</h1>;
        switch(option){
            case "dashboard":
                    return (
                    <>
                        <AdminContent current="dashboard" />
                    </>
                    )
            case "users":
                return (
                    <>
                        <AdminContent key={JSON.stringify(users)} current="users" dataList={users} setRefetch={setRefetch}/>
                    </>
                    )
            case "categories":
                return (
                    <>
                        <AdminContent key={JSON.stringify(categories)} current="categories" dataList={categories} setRefetch={setRefetch}/>
                    </>
                    )
            case "streams":
                return (
                    <>
                        <AdminContent key={JSON.stringify(streams)} current="streams" dataList={streams} setRefetch={setRefetch}/>
                    </>
                    )
            default:
                return (
                    <>
                        <h1 className="league-spartan-bold citizenship fill__container ta__center">
                            404 Not Found
                        </h1>
                    </>
                    )
        }
    }
    //data fetching
    useEffect(() => {
        const fetchUsers = UserRoutes.getUsers().then((res) => {
            setUsers(res);
            return Promise.resolve(res);
        });
        const fetchCategories = CategoryRoutes.getAllCategories().then((res) => {
            setCategories(res);
            return Promise.resolve(res);
        });
        const fetchStreams = StreamRoutes.getAllStreams().then((res) => {
            setStreams(res);
            return Promise.resolve(res);
        });
        const fetchTags = TagRoutes.getAllTags().then((res) => {
            setTags(res);
            return Promise.resolve(res);
        });
        Promise.all([fetchUsers, fetchCategories, fetchStreams, fetchTags]).then((res) => {
            console.log("Data fetched: " + JSON.stringify(res));
            setLoading(false);
        });
    }, []);  
    //data refetching
    useEffect(() => {
        console.log("current: " + refetch);
        if(refetch < 0){
            console.log("Wiping data");
            (refetch === -1) && setUsers([]);
            (refetch === -2) && setCategories([]);
            (refetch === -3) && setStreams([]);
            (refetch === -4) && setTags([]);
        }
        if(refetch === 1){
            console.log("Refetching users...");
            UserRoutes.getUsers().then((res) => {
                setUsers(res);
                console.log(res);
            });
        }
        if(refetch === 2){
            console.log("Refetching categories...");
            CategoryRoutes.getAllCategories().then((res) => {
                setCategories(res);
                console.log(res);
            });
        }
        if(refetch === 3){
            console.log("Refetching streams...");
            StreamRoutes.getAllStreams().then((res) => {
                setStreams(res);
                console.log(res);
            });
        }
        setRefetch(0);
    }, [refetch]);



    return(
        <>
            <div className="admin__page-container">
                <div className="nav__layout">
                    <AdminNav />
                </div>
                <div className="admin__page-content">
                    <AdminSideBar setOption={handleOption}/>
                    <main className="admin__page-main rr__flex-col rrf__row-small" style={{
                        flex: 6,
                        overflowY: "scroll",
                        paddingBottom: "1em",
                    }}>
                        {renderMain()}
                    </main>
                </div>
            </div>
        </>
    )
}