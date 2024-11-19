import "../assets/svg/Logo.svg";
import ProfileMenu from "./ProfileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/Navbar.css";
import logo from "../assets/img/Logo__sieufix.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import Toast from "./Toast";
import { useAuth } from "../hooks/AuthProvider";
export default function NavBar(props) {
  const route = props.routing;
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastPosition, setToastPosition] = useState("-100%");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
  useEffect(() => {
    let timer;
    if (showToast) {
      setToastPosition("100%"); // Start from right
      setTimeout(() => setToastPosition("0%"), 100); // Move to visible position quickly
      timer = setTimeout(() => {
        setToastPosition("-100%"); // Move to left
        setTimeout(() => setShowToast(false), 300); // Wait for slide out animation
      }, 3000);
    }
    else setIsLoggedIn(false);
    return () => clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      console.log(user);
    }
    
  }, []);
  const handleLogout = () => {
    setIsLoggedIn(false);
    auth.logOut();
  }
  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };
  const renderProfileMenu = () => {
    return (
      <ProfileMenu
        userName={user? user.userName : "null"}
        imgLink={user.profilePic? user.profilePic : "https://i.imgur.com/neHVP5j.jpg"}
        logout={handleLogout}
      />
    );
  }
  if (route == "AS") {
    return (
      <>
        <div className="nav__bar">
          <div className="left__ch">
            <img
              className="n__logo"
              src={logo}
              alt="Logo"
              onClick={() => navigate("/")}
            />{" "}
            &emsp;
            <div className="lch__title league-spartan-semibold">
              Account Setting
            </div>
          </div>
          <div className="middle__ch"></div>
          <div className="right__ch rrf__jc-center rrf__ai-center">
            {renderProfileMenu()}
          </div>
        </div>
      </>
    );
  }
  if (route == "SM")
    return (
      <>
        <div className="nav__bar">
          <div className="left__ch">
            <img
              className="n__logo"
              src={logo}
              alt="Logo"
              onClick={() => navigate("/")}
            />{" "}
            &emsp;
            <div className="lch__title league-spartan-semibold">
              Stream Manager
            </div>
          </div>
          <div className="middle__ch"></div>
          <div className="right__ch rrf__jc-center rrf__ai-center">
            {renderProfileMenu()}
          </div>
        </div>
      </>
    );
  else if (route == "index") {
    return (
      <div className="nav__bar bg__color-2">
        <div className="left__ch">
          <img
            className="n__logo"
            src={logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />
          &nbsp;
          <Button
            type={"default-2"}
            text={"Following"}
            onClick={() => {
              if (isLoggedIn) {
                navigate("/following");
              } else {
                handleShowToast("Please login to access this feature");
              }
            }}
          />
          <Button
            type={"default-2"}
            text={"Browsing"}
            onClick={() => navigate("/browsing")}
          />
          <Button type={"default-2"} text={"More"} />
        </div>
        <div className="middle__ch">
          <input
            className="search__box league-spartan-regular fs__small-3"
            placeholder="Search"
            type="search"
            name="search-s"
            id="search__box"
          />
          <div className="search__btn citizenship">
            <FontAwesomeIcon icon={faSearch} onClick={() => {
              const searchValue = document.getElementById("search__box").value;
              navigate(`/searchResult?query=${encodeURIComponent(searchValue)}`);
            }}/>
          </div>
        </div>
        <div
          className={`right__ch ${
            !isLoggedIn
              ? "rrf__jc-center rrf__ai-center def-pad-2em no__padding-tb"
              : ""
          }`}
        >
          {isLoggedIn ? renderProfileMenu() : (
            <>
              <Button
                type={"default"}
                text={"Login"}
                onClick={() => setIsModalOpen(1)}
              />
            </>
          )}
        </div>
        {isModalOpen == 1 /*login index*/ && (
          <CustomModal
            type="login"
            login={() => {
              setIsModalOpen(0);
            }}
            offModal={() => setIsModalOpen(0)}
            switchModal={() => setIsModalOpen(2)}
          />
        )}

        {isModalOpen == 2 /*signup index*/ && (
          <CustomModal
            type="signup"
            signup={() => {
              setIsModalOpen(0);
            }}
            switchModal={() => setIsModalOpen(1)}
            offModal={() => setIsModalOpen(0)}
          />
        )}
        {showToast && (
          <Toast
            message={toastMessage}
            duration={3000}
            onDispose={() => setShowToast(false)}
          />
        )}
      </div>
    );
  }
}
