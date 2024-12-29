import { useNavigate } from "react-router-dom";
import "../../assets/css/AdminNav.css";
import logo from "../../assets/img/Logo__sieufix.png";
import { useAuth } from "../../hooks/AuthProvider";
import ProfileMenu from "../ProfileMenu";
import { useState } from "react";
import { Assets } from "../../constants/Assets";
export default function AdminNav(){
    const navigate = useNavigate();
    const auth = useAuth();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
    const handleLogout = () => {
        auth.logOut();
    }
    const renderProfileMenu = () => {
        return (
          <ProfileMenu
            userName={user? user.UserName : "null"}
            roleCheck={user.Roles? user.Roles.filter((role) => role.roleName === "Admin").length > 0 : false}
            imgLink={user.ProfilePic? user.ProfilePic : Assets.defaultAvatar}
            logout={handleLogout}
          />
        );
      }
    return (
        <>
            <nav className="admin__nav-container">
                <div className="rr__flex-row rrf__col-normal">
                    <img
                        className="n__logo"
                        src={logo}
                        alt="Logo"
                        onClick={() => navigate("/")}
                    />
                    <span className="admin__nav-title league-spartan-semibold fs__large-2 citizenship ta__center"
                    style={{
                        lineHeight: "3.3rem",
                    }}>
                        Admin Dashboard
                    </span>
                </div>
                {renderProfileMenu()}
            </nav>
        </>
    )
}
