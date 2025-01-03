import SbMenuLabel from "./SbMenuLabel";
import "../assets/css/Sidebar.css";
import {
  faBarChart,
  faEnvelope,
  faHouse,
  faLink,
  faPhone,
  faTowerBroadcast,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import smBackground from "../assets/img/background_sm-home.png";
// import sidetracked from "../assets/videos/sidetracked.mp4";
import Button from "./Button";
import Toast from "./Toast";
import ChannelComp from "./ChannelComp";
import Background from "../assets/img/Background.jpg";
import JWPlayer from "@jwplayer/jwplayer-react";
import VideoContent from "./VideoContent";
import StreamChat from "./StreamChat";
import StreamUserInfo from "./StreamUserInfo";
import { useState, useRef, lazy, Suspense, useEffect } from "react";
import CategoryComp from "./CategoryComp";
import CustomModal from "./CustomModal";
import StatBox from "./StatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconCard from "./IconCard";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SignalRTest } from "../scripts/webrtcTemp";
import UserChannelList from "./UserChannelList";
import { UserRoutes } from "../API/User.routes";
import defaultImage from "../assets/img/Logo__Sieufix.png";
import { StreamRoutes } from "../API/Stream.route";
import { useAuth } from "../hooks/AuthProvider";
import { CategoryRoutes } from "../API/Category.routes";
import { TagRoutes } from "../API/Tag.routes";
import { FollowRoutes } from "../API/Follow.routes";
import { BlockRoutes } from "../API/Block.routes";
import TagCard from "./TagCard";
import { Assets } from "../constants/Assets";
import { ApiConstants } from "../API/ApiConstants";
import { RoleRoutes } from "../API/Role.routes";
import { ModCheck } from "../scripts/AdminCheck";
export default function Sidebar(props) {
  const lorem =
    "lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem  Ipsum has been the industry's standard dummy text ever since the 1500s,  when an unknown printer took a galley of type and scrambled it to make a  type specimen book. It has survived not only five centuries, but also  the leap into electronic typesetting, remaining essentially unchanged.";
    const navigate = useNavigate();
  const [option, setOption] = useState(0);
  const [userGlobal, setUserGlobal] = useState(JSON.parse(localStorage.getItem("user")) || "");
  if (props.routing == "SM") {
    const [isOffline, setOffline] = useState(true);
    const [userGlobal, setUserGlobal] = useState(JSON.parse(localStorage.getItem("user")) || "");
    return (
      <div className="main__position">
        <div className="sidebar">
          <div className="border__r">
            <div className="cn__holder rr__flex-col hide__scroll-bar">
              <div className="sb__label league-spartan-semibold">
                {props.name}
              </div>
              <div className="sb__option-holder no__padding-lr">
                <SbMenuLabel
                  type={option == 0 ? "toggle" : ""}
                  text="Home"
                  icon={faHouse}
                  onClick={() => setOption(0)}
                />
                <SbMenuLabel
                  type={option == 1 ? "toggle" : ""}
                  text="Setting up your stream"
                  icon={faTowerBroadcast}
                  onClick={() => setOption(1)}
                />
                {/* <SbMenuLabel
                  type={option == 2 ? "toggle" : ""}
                  text="Analytics"
                  icon={faBarChart}
                  onClick={() => setOption(2)}
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="main__content rr__flex-col">
          {option == 0 ? (
            <>
              {/* Home */}
              <img className="bg__img" src={smBackground} alt="background" />
            </>
          ) : option == 1 ? (
            <>
              {/* Setting up stream */}
              <div className="fl__content-holder rr__flex-col">
                <span className="league-spartan-semibold fs__title-4 citizenship">
                  Set up your stream source
                </span>
                <br />
                <br />
                <div className="sh__content-holder rr__flex-row">
                  <div className="rr__flex-col rrf__row-normal">
                    <div className="vd__holder bg__color-2 rr__flex-col">
                    <video style={{
                      display: "none",
                      width: "100%",
                      height: "100%",
                    }} id="localVideo" autoPlay playsInline controls={false}></video>
                        <span id="offline_label" className="fs__title-3 league-spartan-semibold citizenship">
                          Offline
                        </span>
                      
                    </div>
                    <CustomModal type={"SMdesc__setting"} user={userGlobal}/>
                  </div>
                  <div className="rr__flex-col">
                    <CustomModal type={"SM"} user={userGlobal}/>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Analysis */}
              <div className="fl__content-holder rr__flex-col def-pad-1">
                <div className="rr__flex-col def-pad-1">
                  <span className="league-spartan-semibold fs__title-5 citizenship fill__container ta__center">
                    Analytics
                  </span>
                  <span className="league-spartan-light fs__normal-3 citizenship fill__container ta__center">
                    Check your stream analytics here
                  </span>
                </div>
                <div className="rr__flex-row rrf__col-normal fill__container">
                  <StatBox value={"123"} label={"Viewers"} />
                  <StatBox value={"123"} label={"Viewers"} />
                  <StatBox value={"123"} label={"Viewers"} />
                  <StatBox value={"123"} label={"Viewers"} />
                  <StatBox value={"123"} label={"Viewers"} />
                </div>
              </div>
            </>
          )}

          {/* content here */}
        </div>
      </div>
    );
  } else if (props.routing == "Personalize") {
    const personalInfoRef = useRef(null);
    const connectionsRef = useRef(null);
    const Auth = useAuth();
    // const [userGlobal, setUserGlobal] = useState(JSON.parse(localStorage.getItem("user")) || "");
    const scrollToPersonalInfo = () => {
      personalInfoRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToConnections = () => {
      connectionsRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const [phoneNumber, setPhoneNumber] = useState(userGlobal.PhoneNumber || "");
    const [email, setEmail] = useState(userGlobal.Email || "");
    const [model, setModel] = useState(0);
    const setValue = async (value1) =>{
      if(model === 1){
        setPhoneNumber(value1);
      }
      else setEmail(value1);
    }
    const [update, setUpdate] = useState("");
    const handleUpdate = async (value, updateLabel) => {
      await setValue(value);
        const postData = {
          userId: userGlobal.UserId,
          userName: userGlobal.UserName,
          displayName: userGlobal.DisplayName,
          email: (updateLabel === "email") ? value : userGlobal.Email,
          phoneNumber: (updateLabel === "phonenumber") ? value : userGlobal.PhoneNumber,
          bio: userGlobal.Bio,
        };
        await UserRoutes.updateUser(userGlobal.UserId, postData).then((res) => {
          Auth.updateUserData();
          console.log(res);
          setUpdate(res);
          setModel(0);
        });
    }
    const handleModel = (value) => {
      console.log(value);
      setModel(value);
    }
    return (
      <>
      <div className="main__position">
        <div className="sidebar">
          <div className="border__r">
            <div className="cn__holder rr__flex-col hide__scroll-bar rrf__col-normal">
              <div className="sb__label league-spartan-semibold">
                {props.name}
              </div>
              <div className="sb__option-holder">
                <SbMenuLabel
                  text="Account"
                  icon={faUser}
                  onClick={scrollToPersonalInfo}
                />
                <SbMenuLabel
                  text="Connections"
                  icon={faLink}
                  onClick={scrollToConnections}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main__content">
          {/* content here */}
          <div
            ref={personalInfoRef}
            className="fl__content-holder rr__flex-col def-pad-1 rrf__row-normal"
          >
            <div className="rr__flex-col def-pad-1">
              {/* title  */}
              <span className="league-spartan-semibold fs__title-5 citizenship fill__container ta__center">
                Account Settings
              </span>
              <span className="league-spartan-light fs__normal-3 citizenship fill__container ta__center">
                Manage your account info here
              </span>
            </div>
            <div className="rr__flex-col def-pad-1 no__padding-tb rrf__row-small">
              <span className="fs__title-4 league-spartan-regular citizenship no__padding-tb">
                Personal Info
              </span>
              <div className="rr__flex-col rrf__row-normal">
                <span className="fs__normal-2 league-spartan-semibold citizenship">
                  Profile Picture
                </span>
                <CustomModal type={"account__setting profile-pic"} user={userGlobal}/>
                <span className="fs__normal-2 league-spartan-semibold citizenship">
                  Profile Settings
                </span>
                <CustomModal type={"account__setting profile-settings"} user={userGlobal} />
                <span className="fs__normal-2 league-spartan-semibold citizenship">
                  Change password
                </span>
                <Button 
                  type={"default"}
                  text={"Change password"}
                  onClick={() => handleModel(3)}
                />
              </div>
            </div>
            <br />
            <div
              ref={connectionsRef}
              className="rr__flex-col def-pad-1 no__padding-tb rrf__row-small"
            >
              <span className="fs__title-4 league-spartan-regular citizenship no__padding-tb">
                Connections
              </span>
              <div className="rr__flex-col rrf__row-normal">
                <span className="fs__normal-2 league-spartan-semibold citizenship">
                  Email & Phone Number
                </span>
                <div className="rr__flex-col rrf__row-normal">
                  <IconCard
                    iconColor={"ic__default-color"}
                    icon={faPhone}
                    text={phoneNumber}
                    onClick={ 
                      () => handleModel(1)
                    }
                  />
                  <IconCard
                    iconColor={"ic__default-color"}
                    icon={faEnvelope}
                    text={email}
                    onClick={
                      () => handleModel(2)
                    }
                  />
                </div>
                
                {/* <span className="fs__normal-2 league-spartan-semibold citizenship">
                  SNS
                </span> 
                 <div className="rr__flex-col rrf__row-normal">
                  <IconCard
                    iconColor={"ic__facebook"}
                    icon={faFacebook}
                    text={"/resolved.man"}
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/resolved.man",
                        "_blank"
                      )
                    }
                  />
                  <IconCard
                    iconColor={"ic__twitter"}
                    icon={faTwitter}
                    text={"/huukhoa004"}
                    onClick={() =>
                      window.open("https://www.x.com/huukhoa004", "_blank")
                    }
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {
                model == 1?
                <>
                  <CustomModal 
                  type={"update"} 
                  updateLabel={"phonenumber"} 
                  currentValue={phoneNumber}
                  update={handleUpdate}
                  offModal={() => handleModel(0)}
                  />
                </>
                : 
                model == 2 ?
                <>
                  <CustomModal 
                  type={"update"} 
                  updateLabel={"email"}
                  currentValue={email}
                  update={handleUpdate}
                  offModal={() => handleModel(0)}
                  />
                </>
                : 
                model == 3?
                <>
                <CustomModal 
                  type={"update-password"} 
                  user={userGlobal.UserId}
                  offModal={() => handleModel(0)}
                  />
                </>
                :
                <> 
                </>
              }
      </>
    );
  } else if (props.routing == "index") {
    const [tagList, setTagList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [streamList, setStreamList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = 
        StreamRoutes.getAllStreams().then((res) => {
          setStreamList(res.filter((item) => item.isLive === true && item.streamCategories.length > 0));
          return Promise.resolve();
        });
      const fetchTags = TagRoutes.getAllTags().then((res) => {
        setTagList(res);
        return Promise.resolve();
      })
      const fetchCategories = CategoryRoutes.getAllCategories().then((res) => {
        setCategoryList(res);
        return Promise.resolve();
      });

        Promise.all([fetchData, fetchTags, fetchCategories]).then(() => {
          setLoading(false);
        });
        
    }, [])
    return (
      <div className="main__position">
        <div className="sidebar bg__color-2 rr__flex-row">
          <UserChannelList key={userGlobal} user={userGlobal} />
        </div>
        <div className="main__content bg__color-00">
          <img
            src={Background}
            style={{ minHeight: "26em" }}
            className="fill__container obj-cover"
          />
          <div className="stream__holder rr__flex-col">
            <div className="sh__label fs__large-3 league-spartan-semibold citizenship">
              Currently live
            </div>
            <div className="sh__content-holder rr__flex-row">
              {loading?
              <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                Loading...
              </span>
              :
              <>
               {
               streamList.length > 0?
               streamList
               .slice(0, 5)
               .map((content, index) => (
                <VideoContent
                      key={index}
                      title={content.streamTitle}
                      thumbnail={content.streamThumbnail? ApiConstants.BASE_URL + content.streamThumbnail : Assets.defaultThumbnail}
                        profilePic={content.user.profilePic? ApiConstants.BASE_URL + content.user.profilePic : Assets.defaultAvatar}
                      displayName={content.user.displayName}
                      category={categoryList.filter((item) => item.categoryId === content.streamCategories[0].categoryId)[0].categoryName}
                      tags={tagList.filter((item) => content.streamTags.map((item) => item.tagId).includes(item.tagId))}
                      userName={content.user.userName}
                      onClick={() => {
                        navigate(`/user/${content.user.userName}`);
                      }}
                      navigateCategory={() => {
                        navigate(`/category/${content.streamCategories[0].categoryId}`);
                      }}
                    />
               ))
               :
              <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                No stream available
              </span>
               }
              </>
              }
              {/* map stream here */}
              
            </div>
            <div className="btn__holder">
              <hr style={{
                color: "#555555",
                width: "100%",
              }}></hr>
              <Button
                type={"link-type"}
                text={"Show more"}
                onClick={() => {}}
              />
              <hr style={{
                color: "#555555",
                width: "100%",
              }}></hr>
            </div>
          </div>
          <div className="stream__holder rr__flex-col">
            <div className="sh__label fs__large-3 league-spartan-semibold citizenship">
              Categories
            </div>
            <div className="sh__content-holder rr__flex-row">
              {loading?
              <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
              Loading...
              </span>
              :
              
              categoryList.length > 0 ?
              categoryList.map((content, index) => (
                <CategoryComp
                  key={index}
                  cateViewCount={12727}
                  categoryName={content.categoryName}
                  categoryId={content.categoryId}
                  categoryPic={content.imagePath? CategoryRoutes.IMAGE_PATH + content.imagePath : Assets.defaultCategory}
                />
              ))
              :
              <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                No category available
              </span>
              }
              
            </div>
            <div className="btn__holder">
            <hr style={{
                color: "#555555",
                width: "100%",
              }}></hr>
              <Button
                type={"link-type"}
                text={"Show more"}
                onClick={() => {}}
              />
              <hr style={{
                color: "#555555",
                width: "100%",
              }}></hr>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.routing == "following") {
    const [flBtn, setFlBtn] = useState(true);
    const [userFollowList, setUserFollowList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [streamList, setStreamList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchUserList = UserRoutes.getUsers().then((res) => {
        setUserList(res);
        return Promise.resolve();
      });
      const fetchData = 
        StreamRoutes.getAllStreams().then((res) => {
          console.log(res.filter((item) => item.streamCategories.length > 0));
          setStreamList(res.filter((item) => item.isLive === true && item.streamCategories.length > 0));
          return Promise.resolve();
        });
      const fetchTags = TagRoutes.getAllTags().then((res) => {
        console.log("Tag list:", res);
        setTagList(res);
        return Promise.resolve();
      })
      const fetchCategories = CategoryRoutes.getAllCategories().then((res) => {
        console.log("Category list:", res);
        setCategoryList(res);
        return Promise.resolve();
      });
      const fetchUserFollow = FollowRoutes.GetAllChannelsByFollowerId(userGlobal.UserId).then((res) => {
        console.log("User follow list:", res);
        setUserFollowList(res);
        return Promise.resolve();
      });
      Promise.all([fetchUserList, fetchData, fetchTags, fetchCategories, fetchUserFollow]).then(() => {
        console.log("done fetching");
        setLoading(false);
      });
    }, [])
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
            <UserChannelList key={userGlobal} user={userGlobal} />
            <div className="main__content bg__color-00 rr__flex-col">
              {/* main content here */}
              <div className="fl__content-holder rr__flex-col">
                <span className="fl__title fs__title-5 league-spartan-regular citizenship fill__container">
                  Following
                </span>

                <div className="btn__holder">
                  {flBtn ? (
                    <>
                      <Button
                        type={"nav-type-clicked"}
                        text={"Onstreaming"}
                        onClick={() => setFlBtn(flBtn)}
                      />
                      <Button
                        type={"nav-type"}
                        text={"Followed channels"}
                        onClick={() => setFlBtn(!flBtn)}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        type={"nav-type"}
                        text={"Onstreaming"}
                        onClick={() => setFlBtn(!flBtn)}
                      />
                      <Button
                        type={"nav-type-clicked"}
                        text={"Followed channels"}
                        onClick={() => setFlBtn(flBtn)}
                      />
                    </>
                  )}
                </div>
                <div className="def-pad-3"></div>
                <div className="sh__content-holder rr__flex-row">
                  {loading?
                  <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                   Loading...
                  </span>
                 : 
                 flBtn ? 
                  streamList.filter((user) => userFollowList.map((item) => item.channelId).includes(user.userId)).length > 0?
                  streamList
                  .filter((user) => userFollowList.map((item) => item.channelId).includes(user.userId)) //check if channel is follow
                  .slice(0, 5)
                  .map((content, index) => (
                   <VideoContent
                         key={index}
                         title={content.streamTitle}
                         thumbnail={content.streamThumbnail? ApiConstants.BASE_URL + content.streamThumbnail : Assets.defaultThumbnail}
                         profilePic={content.user.profilePic? ApiConstants.BASE_URL + content.user.profilePic : Assets.defaultAvatar}
                         displayName={content.user.displayName}
                         category={categoryList.filter((item) => item.categoryId == content.streamCategories[0].categoryId)[0].categoryName}
                         tags={tagList.filter((item) => content.streamTags.map((item) => item.tagId).includes(item.tagId))}
                         userName={content.user.userName}
                         onClick={() => {
                           navigate(`/user/${content.user.userName}`);
                         }}
                         navigateCategory={() => {
                           navigate(`/category/${content.streamCategories[0].categoryId}`);
                         }}
                       />
                  ))
                  :
                 <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                   No stream available
                 </span>
                   : userList.filter((user) => userFollowList.map((item) => item.channelId).includes(user.UserId)).length > 0?
                  userList
                  .filter((user) => userFollowList.map((item) => item.channelId).includes(user.UserId)) //check if channel is followed
                  .map((user, index) => (
                    <ChannelComp
                      onClick={() => {
                        navigate(`/user/${user.UserName}`);
                      }}
                      type={"default"}
                      key={index}
                      profilePic={user.ProfilePic? ApiConstants.BASE_URL + user.ProfilePic : Assets.defaultAvatar}
                      userName={user.DisplayName}
                      userBg={user.ProfilePic? ApiConstants.BASE_URL + user.ProfilePic : Assets.defaultAvatar}
                    />
                  ))
                  :
                  <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                   No followed channels
                  </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.routing == "browsing") {
    const [categoryList, setCategoryList] = useState([]);
    const [streamList, setStreamList] = useState([]);
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
      const fetchCategories = CategoryRoutes.getAllCategories().then((res) => {
        setCategoryList(res);
        Promise.resolve();
      });
      const fetchTags = TagRoutes.getAllTags().then((res) => {
        console.log(res);
        setTagList(res);
        Promise.resolve();
      });
      const fetchStream = StreamRoutes.getAllStreams().then((res) => {
        console.log(res.filter((item) => item.streamCategories.length > 0));
        setStreamList(res.filter((item) => item.isLive === true && item.streamCategories.length > 0));
        Promise.resolve();
      });
      Promise.all([fetchCategories, fetchTags, fetchStream]).then(() => {
          console.log("done fetching");
      });
    }, [])
    const [flBtn, setFlBtn] = useState(true);
    const [search, setSearch] = useState("");
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
              <UserChannelList key={userGlobal} user={userGlobal} />
            <div className="main__content bg__color-00 rr__flex-col">
              {/* main content here */}
              <div className="fl__content-holder rr__flex-col">
                <span className="fl__title fs__title-5 league-spartan-regular citizenship fill__container">
                  Browsing
                </span>
                  
                <div className="btn__holder">
                  {flBtn ? (
                    <>
                      <Button
                        type={"nav-type-clicked"}
                        text={"Category"}
                        onClick={() => setFlBtn(flBtn)}
                      />
                      <Button
                        type={"nav-type"}
                        text={"Live channels"}
                        onClick={() => setFlBtn(!flBtn)}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        type={"nav-type"}
                        text={"Category"}
                        onClick={() => setFlBtn(!flBtn)}
                      />
                      <Button
                        type={"nav-type-clicked"}
                        text={"Live channels"}
                        onClick={() => setFlBtn(flBtn)}
                      />
                    </>
                  )}
                </div>
                <input type="text"
                    className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for streamers or categories"
                    style={{
                      marginTop: "0.5em",
                      marginBottom: "0.5em",
                      width: "32em",
                    }}
                  />
                <div className="sh__content-holder rr__flex-row">
                  {flBtn ? 
                    
                      categoryList.length > 0 ? 
                      categoryList
                      .filter((item) => item.categoryName.toLowerCase().includes(search.toLowerCase()))
                      .map((content, index) => (
                        <CategoryComp
                          key={index}
                          cateViewCount={12727}
                          categoryName={content.categoryName}
                          categoryId={content.categoryId}
                          categoryPic={content.imagePath? CategoryRoutes.IMAGE_PATH + content.imagePath : Assets.defaultCategory}
                        />
                      ))
                   : 
                   (
                    <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                      No category available
                    </span>
                   )
                   :
                   (
                    streamList.length > 0?
                  streamList
                  .filter((item) => item.streamTitle.toLowerCase().includes(search.toLowerCase()))
                  .map((content, index) => (
                    <VideoContent
                      key={index}
                      title={content.streamTitle}
                      thumbnail={content.streamThumbnail? ApiConstants.BASE_URL + content.streamThumbnail : Assets.defaultThumbnail}
                      profilePic={content.user.profilePic? ApiConstants.BASE_URL + content.user.profilePic : Assets.defaultAvatar}
                      displayName={content.user.displayName}
                      category={categoryList.filter((item) => item.categoryId === content.streamCategories[0].categoryId)[0].categoryName}
                      tags={tagList.filter((item) => content.streamTags.map((item) => item.tagId).includes(item.tagId))}
                      userName={content.user.userName}
                      onClick={() => {
                        navigate(`/user/${content.user.userName}`);
                      }}
                      navigateCategory={() => {
                        navigate(`/category/${content.streamCategories[0].categoryId}`);
                      }}
                    />
                  ))
                  :
                  <span className="fs__normal-2 league-spartan-semibold citizenship ta__center fill__container">
                    No stream available
                  </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.routing == "category") {
    const [currentCategory, setCurrentCategory] = useState({});
    const [tagList, setTagList] = useState([]);
    const [streamList, setStreamList] = useState([]);
    useEffect(() => {
      const category = CategoryRoutes.getCategoryById(props.category).then((res) => {
        setCurrentCategory(res || {});
        return Promise.resolve(res);
      });
      const tag = TagRoutes.getAllTags().then((res) => {
        setTagList(res);
        return Promise.resolve(res);
      })
      Promise.all([category, tag]).then((res) => {
        console.log(res);
        StreamRoutes.getStreamsWithCategory(String(res[0].categoryId)).then((res2) => {
          console.log(res2);
          setStreamList(res2.filter((item) => item.isLive === true) || []);
        });
      });
    },[]);
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
              <UserChannelList key={userGlobal} user={userGlobal} />
            <div className="main__content bg__color-00">
              {/* Main content will be inserted here */}
              <div className="fl__content-holder rr__flex-col">
                <CategoryComp
                  cateViewCount={12727}
                  type={"default"}
                  categoryName={currentCategory.categoryName}
                  categoryPic={currentCategory.imagePath? CategoryRoutes.IMAGE_PATH + currentCategory.imagePath : Assets.defaultCategory}
                  categoryDesc={currentCategory.categoryDesc}
                />
                <span className="fl__title fs__title-1 league-spartan-semibold citizenship fill__container def-pad-2 no__padding-lr">
                  Live channels of this category
                </span>
                <div className="def-pad-1"></div>
                <div className="sh__content-holder rr__flex-row">
                  {
                  streamList.length > 0?
                  streamList.map((content, index) => (
                    <VideoContent
                      key={index}
                      title={content.streamTitle}
                      thumbnail={content.streamThumbnail? ApiConstants.BASE_URL + content.streamThumbnail : Assets.defaultThumbnail}
                      profilePic={content.user.profilePic? ApiConstants.BASE_URL + content.user.profilePic : Assets.defaultAvatar}
                      userName={content.user.userName}
                      category={currentCategory.categoryName}
                      tags={tagList.filter((item) => content.streamTags.map((item) => item.tagId).includes(item.tagId))}
                      onClick={() => {
                        navigate(`/user/${content.user.userName}`);
                      }}
                      navigateCategory={() => {
                        navigate(`/category/${content.streamCategories[0].categoryId}`);
                      }}
                    />
                  ))
                :
                <>
                <span className="fs__normal-2 league-spartan-semibold citizenship fill__container ta__left">
                  No stream available
                </span>
                </>
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.routing == "SearchResult") {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("query").toLowerCase();
    const [userList, setUserList] = useState([]);
    const [streamList, setStreamList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    


    const renderLoading = () => {
      return (
        <>
          <span className="fs__title-3">Loading</span>
        </>
      )
    }
    useEffect(() => {
      const fetchUser = UserRoutes.getUsers().then((res) => {
        setUserList(res);
        Promise.resolve();
      });
      const fetchCategories = CategoryRoutes.getAllCategories().then((res) => {
        setCategoryList(res);
        Promise.resolve();
      });
      const fetchTags = TagRoutes.getAllTags().then((res) => {
        console.log(res);
        setTagList(res);
        Promise.resolve();
      });
      const fetchStream = StreamRoutes.getAllStreams().then((res) => {
        console.log(res.filter((item) => item.streamCategories.length > 0));
        setStreamList(res.filter((item) => item.isLive === true && item.streamCategories.length > 0));
        Promise.resolve();
      });
      Promise.all([fetchUser, fetchCategories, fetchTags, fetchStream]).then(() => {
          console.log("done fetching");
      });
      setLoading(false);
    }, []);
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
          <UserChannelList key={userGlobal} user={userGlobal} />
            <div className="main__content bg__color-00">
              {/* Main content will be inserted here */}
              <div className="fl__content-holder rr__flex-col">
                <span className="fl__title fs__title-1 league-spartan-semibold citizenship fill__container def-pad-2 no__padding-lr">
                  Search results for "{search}"
                </span>
                {/* <div className="def-pad-2"></div> */}
                <span className="fs__large-2 league-spartan-regular citizenship fill__container def-pad-2 no__padding-lr">
                  Channels related with "{search}"
                </span>
                
                <div className="sh__content-holder rr__flex-col">
                  {loading? 
                  renderLoading() 
                  : 
                  userList
                  .filter(user => user.UserName.toLowerCase().includes(search) || user.DisplayName.toLowerCase().includes(search)).length > 0?
                  userList
                  .filter(user => user.UserName.toLowerCase().includes(search) || user.DisplayName.toLowerCase().includes(search))
                  .map((user, index) => (
                
                      <ChannelComp type="search"
                        key={index}
                        profilePic={user.ProfilePic? ApiConstants.BASE_URL + user.ProfilePic : Assets.defaultAvatar}
                        userName={user.UserName}
                        followers={user.followers? user.followers : 0}
                        onClick={() => {
                          navigate(`/user/${user.UserName}`);
                        }}
                      />
                      
                  ))
                :
                <span className="fs__normal-2 league-spartan-semibold citizenship fill__container ta__left">
                  No user found
                </span>
                }
                </div>
                <span className="fs__large-2 league-spartan-regular citizenship fill__container def-pad-2 no__padding-lr">
                  Stream with search term "{search}"
                </span>
                <div className="sh__content-holder rr__flex-row">
                  {loading? renderLoading() : 
                  streamList
                  .filter((item) => 
                    item.streamTitle.toLowerCase().includes(search) || 
                  item.streamDesc.toLowerCase().includes(search)).length > 0
                  ?
                  streamList
                  .filter((item) => 
                    item.streamTitle.toLowerCase().includes(search) || 
                  item.streamDesc.toLowerCase().includes(search))
                  .map((content, index) => (
                    <VideoContent
                      key={index}
                      title={content.streamTitle}
                      thumbnail={content.streamThumbnail? ApiConstants.BASE_URL + content.streamThumbnail : Assets.defaultThumbnail}
                      profilePic={content.user.profilePic? ApiConstants.BASE_URL + content.user.profilePic : Assets.defaultAvatar}
                      userName={content.user.userName}
                      category={currentCategory.CategoryName}
                      tags={tagList.filter((item) => content.streamTags.map((item) => item.tagId).includes(item.tagId))}
                      onClick={() => {
                        navigate(`/user/${content.user.userName}`);
                      }}
                      navigateCategory={() => {
                        navigate(`/category/${content.streamCategories[0].categoryId}`);
                      }}
                    />
                  ))
                :
                <span className="fs__normal-2 league-spartan-semibold citizenship fill__container ta__left">
                  No stream found
                </span>
                }
                </div>
                <span className="fs__large-2 league-spartan-regular citizenship fill__container def-pad-2 no__padding-lr">
                  Categories with search terms "{search}"
                </span>
                <div className="sh__content-holder rr__flex-row">
                  {loading? renderLoading() : 
                  categoryList.filter((item) => item.categoryName.toLowerCase().includes(search)).length > 0?
                  categoryList.filter((item) => item.categoryName.toLowerCase().includes(search)).map((content, index) => (
                    <CategoryComp
                        key={index}
                        cateViewCount={12727}
                        categoryName={content.categoryName}
                        categoryId={content.categoryId}
                        categoryPic={content.imagePath? CategoryRoutes.IMAGE_PATH + content.imagePath : Assets.defaultCategory}
                    />
                      )):
                      <span className="fs__normal-2 league-spartan-semibold citizenship fill__container ta__left">
                        No category found
                      </span>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.routing == "tagPage"){
    const [userList, setUserList] = useState([]);
    const [streamList, setStreamList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [currentTag, setCurrentTag] = useState({});
    const [loading, setLoading] = useState(true);
    const tagid = props.tagid;
    const renderLoading = () => {
      return (
        <>
          <span className="fs__title-3">Loading</span>
        </>
      )
    }
    useEffect(() => {
      const fetchCategories = CategoryRoutes.getAllCategories().then((res) => {
        setCategoryList(res);
        return Promise.resolve(res);
      });
      const fetchTags = TagRoutes.getAllTags().then((res) => {
        console.log(res);
        setTagList(res);
        return Promise.resolve(res);
      });
      const fetchStream = StreamRoutes.getAllStreams().then((res) => {
        console.log(res.filter((item) => item.streamCategories.length > 0));
        setStreamList(res.filter((item) => item.isLive === true && item.streamCategories.length > 0));
        return Promise.resolve(res);
      });
      Promise.all([fetchCategories, fetchTags, fetchStream]).then((res) => {
          console.log(res);
          if(res[1].filter((item) => item.tagId == tagid).length > 0){
            setCurrentTag(res[1].filter((item) => item.tagId == tagid)[0] || {});
          }
          else {
            navigate("/error");
          }
      });
      setLoading(false);
    }, [])
    return(
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
          <UserChannelList key={userGlobal} user={userGlobal} />
            <div className="main__content bg__color-00">
              <div className="fl__content-holder rr__flex-col">
                {/* Main content will be inserted here */}
                {loading?
                renderLoading():
                <>
                  <TagCard type="tagPage" name={currentTag.tagName} />
                  <span className="fl__title fs__title-1 league-spartan-semibold citizenship fill__container def-pad-2 no__padding-lr">
                    Live channels with tag "{currentTag.tagName}"
                  </span>
                  <div className="sh__content-holder rr__flex-row">
                    {
                    streamList.filter((item) => item.streamTags.some((tag) => tag.tagId == tagid)).length > 0?
                    streamList
                    .filter((item) => item.streamTags.some((tag) => tag.tagId == tagid))
                    .map((content, index) => (
                      <VideoContent
                        key={index}
                        title={content.streamTitle}
                        thumbnail={content.streamThumbnail? ApiConstants.BASE_URL + content.streamThumbnail : Assets.defaultThumbnail}
                        profilePic={content.user.profilePic? ApiConstants.BASE_URL + content.user.profilePic : Assets.defaultAvatar}
                        userName={content.user.userName}
                        category={categoryList.filter((item) => item.categoryId === content.streamCategories[0].categoryId)[0].categoryName}
                        tags={tagList.filter((item) => content.streamTags.map((item) => item.tagId).includes(item.tagId))}
                        onClick={() => {
                          navigate(`/user/${content.user.userName}`);
                        }}
                        navigateCategory={() => {
                          navigate(`/category/${content.streamCategories[0].categoryId}`);
                        }}
                      />
                    ))
                  :
                  <span className="fs__normal-2 league-spartan-semibold citizenship fill__container ta__left">
                    No stream available
                  </span>
                  }
                  </div>
                </>  
                }
              </div>
            </div>
            </div>
          </div>
      </>
    )
  } else {
    // const LazyJWPlayer = lazy(() => import("@jwplayer/jwplayer-react"));
    const [messages, setMessages] = useState([]);
    const [userList, setUserList] = useState([]);
    const [streamData, setStreamData] = useState({});
    const connection = SignalRTest.getConnection();
    const [userRoute, setUserRoute] = useState(props.userRoute);
    const [user, setUser] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentTags, setCurrentTags] = useState([]);
    const [modList, setModList] = useState([]);
    const moderatorCheck = (username) => {
      let check = false;
      ModCheck(user.UserId, username).then((res) => {
        check = res;
      });
      return check;
    }
    useEffect(() => {
      try{
        UserRoutes.getUserByName(userRoute).then((res) => {
            if(res == null || res == undefined){ 
              navigate("/error"); 
              return; 
            }
            console.log(res);
            setUser(res);
            console.log(JSON.stringify(user));
            
            StreamRoutes.getMostRecentStreamByUser(res.UserId).then((res1) => {
              console.log(res1);
              TagRoutes.getAllTags().then((res2) => {
                const tagIdList = res1.streamTags.map((item) => item.tagId);
                const tagList = res2.filter((item) => tagIdList.includes(item.tagId));
                setCurrentTags(tagList || []);
              });
              CategoryRoutes.getCategoryById(res1.streamCategories[0].categoryId).then((res2) => {
                setCurrentCategory(res2);
              });
              setStreamData(res1|| {});
              console.log(JSON.stringify(streamData));
            })
            BlockRoutes.getAllBlockedUsers().then((res2) => {
              console.log(res2);
              if(res2.filter((item) => item.channelId == res.UserId).map((item) => item.blockedId).includes(userGlobal.UserId)){
                navigate("/error");
              }
              else if(res2.filter((item) => item.channelId == userGlobal.UserId).map((item) => item.blockedId).includes(res.UserId)){
                navigate(`/blocked?self=${encodeURIComponent(userGlobal.UserId)}&blocked=${encodeURIComponent(res.UserId)}&name=${encodeURIComponent(userRoute)}`);
              }
            })
        });
        
      }
      catch(e){
        console.log(e);
      }
        
    }, [userRoute]);
    
    useEffect(() => {
      if(connection == null) return;
      connection.on("sendMessage", (username, message, badge) => {
        console.log(`${username}: ` + message);
        setMessages(prevMessages => [
          ...prevMessages,
          {
            userName: username,
            chatContext: message,
            timeStamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }),
            badge: badge != "" ? badge : moderatorCheck(username) ? "moderator" : null,
          }
        ]);
      });
      connection.on("roomUpdate", (users) => {
        console.log((users));
        setUserList(JSON.parse(users));
      });
      return () => {
        connection.off("sendMessage");
        connection.off("roomUpdate");
      }
    }, [connection]);
    
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row" style={{
            flex: 1,
          }}>
          <UserChannelList user={userGlobal} />
            <div className="main__content bg__color-vid">
              {/* <img className="bg__img" src={smBackground} alt="background"/> */}
              <div className="video__holder rr__flex-col rrf__jc-center rrf__ai-center bg__color-00">
                {!streamData.isLive && 
                <span className="fs__title-5 league-spartan-regular citizenship ta__center fill__container"
                style={{
                  // marginTop: "1em",
                  // width: "16em",
                }}
                >
                  Stream is offline
                </span>}
                  <video style={{
                      width: "100%",
                      height: "100%",
                      display: streamData.isLive? "block" : "none",
                    }}
                  id="remote__stream" autoPlay={true} controls={true} preload="metadata">

                
                  </video>
              </div>

              <StreamUserInfo
                key={user.UserId}
                channelId={user.UserId}
                userName={user.DisplayName}
                qname={userRoute}
                title={streamData.streamTitle}
                desc={streamData.streamDesc}
                date={streamData.streamDate}
                category={currentCategory || "error"}
                tagList={currentTags}
                profilePic={user.ProfilePic? ApiConstants.BASE_URL + user.ProfilePic : Assets.defaultAvatar}
                viewCount={userList.length}
                flCount={12342}
                status={streamData.isLive !== undefined ? streamData.isLive : false}
              />
            </div>
            
            {streamData.isLive ? 
            <StreamChat messages={messages} userList={userList}/> 
            : <></>}
          </div>
        </div>
      </>
    );
    
    // return(
    //   <>
    //     <div className="main__position">
    //       <div className="sidebar bg__color-2 rr__flex-row">
    //       <UserChannelList key={userGlobal} user={userGlobal} />
    //         <div className="main__content bg__color-00 rr__flex-col">
    //           {/* <img className="bg__img" src={smBackground} alt="background"/> */}
    //           <div className="fl__content-holder rr__flex-col">
                
    //             <div className="rr__flex-row rrf__ai-center">
    //             <FontAwesomeIcon style={{
    //               padding: "0.5em",
    //               paddingLeft: "0",
    //               fontSize: "3em",
    //             }} icon={faTriangleExclamation} color="#47FFD3"/>
    //             <div className="rr__flex-col">
    //               <span className="fs__title-4 league-spartan-semibold citizenship ta__center fill__container">
    //                 Cannot find user {props.userRoute}
    //               </span>
    //               <span className="fs__normal-3 league-spartan-regular citizenship">
    //                 This user may have been banned or does not exist
    //               </span>
    //             </div>
    //             </div>
                  
                
                
    //           </div>

              
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // )
  }
}
