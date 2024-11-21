import AdminNav from "../components/admin/AdminNav";
import "../assets/css/AdminPage.css";
import AdminSideBar from "../components/admin/AdminSideBar";
import { useState } from "react";
import DashBoard from "../components/admin/Dashboard";
export default function AdminPage() {
    const [option, setOption] = useState("dashboard");
    const handleOption = (opt) => {
        setOption(opt);
    };
    const renderMain = () => {
        switch(option){
            case "dashboard":
                    return (
                    <>
                        <DashBoard />
                    </>
                    )
            case "users":
                return (
                    <>
                        <h1 className="league-spartan-bold citizenship fill__container ta__center">
                            Users
                        </h1>
                    </>
                    )
            case "categories":
                return (
                    <>
                        <h1 className="league-spartan-bold citizenship fill__container ta__center">
                            Categories
                        </h1>

                    </>
                    )
            case "streams":
                return (
                    <>
                        <h1 className="league-spartan-bold citizenship fill__container ta__center">
                            Streams
                        </h1>
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