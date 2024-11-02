import SbMenuLabel from "./SbMenuLabel";
import "../assets/css/Sidebar.css";
import {
  faBarChart,
  faEnvelope,
  faHouse,
  faLink,
  faPhone,
  faTowerBroadcast,
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
import { useNavigate } from "react-router-dom";
import { SignalRTest } from "../scripts/webrtcTemp";
export default function Sidebar(props) {
  const lorem =
    "lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem  Ipsum has been the industry's standard dummy text ever since the 1500s,  when an unknown printer took a galley of type and scrambled it to make a  type specimen book. It has survived not only five centuries, but also  the leap into electronic typesetting, remaining essentially unchanged.";
  //   const navigate = useNavigate();
  const [option, setOption] = useState(0);
  if (props.routing == "SM") {
    const [isOffline, setOffline] = useState(true);
    return (
      <div className="main__position">
        <div className="sidebar">
          <div className="border__r">
            <div className="cn__holder rr__flex-col hide__scroll-bar">
              <div className="sb__label league-spartan-semibold">
                {props.name}
              </div>
              <div className="sb__option-holder">
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
                <SbMenuLabel
                  type={option == 2 ? "toggle" : ""}
                  text="Analytics"
                  icon={faBarChart}
                  onClick={() => setOption(2)}
                />
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
                    <CustomModal type={"SMdesc__setting"} />
                  </div>
                  <div className="rr__flex-col">
                    <CustomModal type={"SM"} />
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
                <div class="rr__flex-row rrf__col-normal fill__container">
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
    const scrollToPersonalInfo = () => {
      personalInfoRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToConnections = () => {
      connectionsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
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
                <CustomModal type={"account__setting profile-pic"} />
                <span className="fs__normal-2 league-spartan-semibold citizenship">
                  Profile Settings
                </span>
                <CustomModal type={"account__setting profile-settings"} />
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
                    text={"0727727727"}
                    onClick={() => {}}
                  />
                  <IconCard
                    iconColor={"ic__default-color"}
                    icon={faEnvelope}
                    text={"huukhoa04@gmail.com"}
                    onClick={() => {}}
                  />
                </div>
                <span className="fs__normal-2 league-spartan-semibold citizenship">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.routing == "index") {
    const LazyChannelComp = lazy(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(import("./ChannelComp")), 200)
        )
    );
    const LazyVideoContent = lazy(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(import("./VideoContent")), 200)
        )
    );
    return (
      <div className="main__position">
        <div className="sidebar bg__color-2 rr__flex-row">
          <div className="border__r">
            <div className="cn__holder rr__flex-col hide__scroll-bar">
              <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                FOLLOWED CHANNELS
              </div>
              <div className="cn__holder-comps">
                {/* map user here */}
                <Suspense
                  fallback={
                    <div className="fs__large-2 league-spartan-semibold citizenship fill__container ta__center">
                      Loading...
                    </div>
                  }
                >
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <LazyChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                </Suspense>
                <Button
                  type={"link-type"}
                  text={"Show more"}
                  onClick={() => {}}
                />
              </div>
              <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                RECOMMENDED CHANNELS
              </div>
              <div className="cn__holder-comps">
                {/* map user here */}
                <Suspense
                  fallback={
                    <div className="fs__large-2 league-spartan-semibold citizenship fill__container ta__center">
                      Loading...
                    </div>
                  }
                >
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <LazyChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <LazyChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                </Suspense>
                <Button
                  type={"link-type"}
                  text={"Show more"}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main__content bg__color-00">
          <img
            src={Background}
            style={{ minHeight: "26em" }}
            className="fill__container obj-cover"
          />
          <div className="stream__holder rr__flex-col">
            <div className="sh__label fs__large-3 league-spartan-semibold citizenship">
              Livestream you may like
            </div>
            <div className="sh__content-holder rr__flex-row">
              {/* map stream here */}
              <Suspense
                fallback={
                  <div className="fs__large-2 league-spartan-semibold citizenship fill__container ta__center">
                    Loading...
                  </div>
                }
              >
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
              </Suspense>
            </div>
            <div className="btn__holder">
              <div className="sepe__line"></div>
              <Button
                type={"link-type"}
                text={"Show more"}
                onClick={() => {}}
              />
              <div className="sepe__line"></div>
            </div>
          </div>
          <div className="stream__holder rr__flex-col">
            <div className="sh__label fs__large-3 league-spartan-semibold citizenship">
              Livestream you may like
            </div>
            <div className="sh__content-holder rr__flex-row">
              {/* map stream here */}
              <Suspense
                fallback={
                  <div className="fs__large-2 league-spartan-semibold citizenship fill__container ta__center">
                    Loading...
                  </div>
                }
              >
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
                <LazyVideoContent
                  title="MY FIRST STREAM"
                  thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                  profilePic="https://i.imgur.com/JcLIDUe.jpg"
                  userName="nauts"
                  category="League Of Legends"
                />
              </Suspense>
            </div>
            <div className="btn__holder">
              <div className="sepe__line"></div>
              <Button
                type={"link-type"}
                text={"Show more"}
                onClick={() => {}}
              />
              <div className="sepe__line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.routing == "following") {
    const [flBtn, setFlBtn] = useState(true);
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
            <div className="border__r">
              <div className="cn__holder rr__flex-col">
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  FOLLOWED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {}}
                  />
                </div>
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  RECOMMENDED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
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
                  {flBtn ? (
                    <>
                      <VideoContent
                        title="MY FIRST STREAM"
                        thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                        profilePic="https://i.imgur.com/JcLIDUe.jpg"
                        userName="nauts"
                        category="League Of Legends"
                      />
                      <VideoContent
                        title="MY FIRST STREAM"
                        thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                        profilePic="https://i.imgur.com/JcLIDUe.jpg"
                        userName="nauts"
                        category="League Of Legends"
                      />
                    </>
                  ) : (
                    <>
                      <ChannelComp
                        type={"default"}
                        profilePic="https://i.imgur.com/neHVP5j.jpg"
                        userBg={"https://i.imgur.com/rbuyoEE.jpg"}
                        userName="Resolved"
                        category="League Of Legends"
                        viewCount={144226}
                      />
                      <ChannelComp
                        type={"default"}
                        profilePic="https://i.imgur.com/neHVP5j.jpg"
                        userBg={"https://i.imgur.com/rbuyoEE.jpg"}
                        userName="Resolved"
                        category="League Of Legends"
                        viewCount={144226}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.routing == "browsing") {
    const [flBtn, setFlBtn] = useState(true);
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
            <div className="border__r">
              <div className="cn__holder rr__flex-col">
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  FOLLOWED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {}}
                  />
                </div>
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  RECOMMENDED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
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
                <div className="sh__content-holder rr__flex-row">
                  {flBtn ? (
                    <>
                      <CategoryComp
                        cateViewCount={12727}
                        categoryName="Bach Khoa"
                        categoryPic="https://i.imgur.com/tbmr3e8.jpg"
                      />
                      <CategoryComp
                        cateViewCount={12727}
                        categoryName="Bach Khoa"
                        categoryPic="https://i.imgur.com/tbmr3e8.jpg"
                      />
                      <CategoryComp
                        cateViewCount={12727}
                        categoryName="Bach Khoa"
                        categoryPic="https://i.imgur.com/tbmr3e8.jpg"
                      />
                    </>
                  ) : (
                    <>
                      <VideoContent
                        title="MY FIRST STREAM"
                        thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                        profilePic="https://i.imgur.com/JcLIDUe.jpg"
                        userName="nauts"
                        category="League Of Legends"
                      />
                      <VideoContent
                        title="MY FIRST STREAM"
                        thumbnail="https://i.imgur.com/mUaz2eC.jpg"
                        profilePic="https://i.imgur.com/JcLIDUe.jpg"
                        userName="nauts"
                        category="League Of Legends"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.routing == "category") {
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
            <div className="border__r">
              <div className="cn__holder rr__flex-col">
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  FOLLOWED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="StreamerX"
                    category="Fortnite"
                    viewCount={0}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="GamerPro"
                    category="Valorant"
                    viewCount={5678}
                  />
                </div>
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  RECOMMENDED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="NewStreamer"
                    category="Just Chatting"
                    viewCount={789}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="EsportsPlayer"
                    category="Dota 2"
                    viewCount={10234}
                  />
                </div>
              </div>
            </div>
            <div className="main__content bg__color-00">
              {/* Main content will be inserted here */}
              <div className="fl__content-holder rr__flex-col">
                <CategoryComp
                  cateViewCount={12727}
                  type={"default"}
                  categoryName="Bach Khoa"
                  categoryPic="https://i.imgur.com/tbmr3e8.jpg"
                  categoryDesc={lorem}
                />
                <span className="fl__title fs__title-1 league-spartan-semibold citizenship fill__container def-pad-2 no__padding-lr">
                  Live channels of this category
                </span>
                <div className="def-pad-1"></div>
                <div className="sh__content-holder rr__flex-row">
                  {[
                    {
                      title: "MY FIRST STREAM",
                      thumbnail: "https://i.imgur.com/mUaz2eC.jpg",
                      profilePic: "https://i.imgur.com/JcLIDUe.jpg",
                      userName: "nauts",
                      category: "League Of Legends",
                    },
                    {
                      title: "ROAD TO CHALLENGER",
                      thumbnail: "https://i.imgur.com/pQrIBFY.jpg",
                      profilePic: "https://i.imgur.com/A3jLXXN.jpg",
                      userName: "pro_gamer123",
                      category: "League Of Legends",
                    },
                    {
                      title: "CHILL STREAM",
                      thumbnail: "https://i.imgur.com/ZGfCkYC.jpg",
                      profilePic: "https://i.imgur.com/M7uPcKN.jpg",
                      userName: "relaxed_streamer",
                      category: "Just Chatting",
                    },
                    {
                      title: "RANKED GRIND",
                      thumbnail: "https://i.imgur.com/8TZvZJO.jpg",
                      profilePic: "https://i.imgur.com/K2HdEji.jpg",
                      userName: "competitive_player",
                      category: "Valorant",
                    },
                    {
                      title: "SPEEDRUN ATTEMPT",
                      thumbnail: "https://i.imgur.com/nXYWoZS.jpg",
                      profilePic: "https://i.imgur.com/L8zGJU2.jpg",
                      userName: "speed_demon",
                      category: "Minecraft",
                    },
                    {
                      title: "ESPORTS TOURNAMENT",
                      thumbnail: "https://i.imgur.com/qR3VbVY.jpg",
                      profilePic: "https://i.imgur.com/F2XU58M.jpg",
                      userName: "esports_pro",
                      category: "Counter-Strike: Global Offensive",
                    },
                    {
                      title: "STRATEGY GUIDE",
                      thumbnail: "https://i.imgur.com/T8KYYmU.jpg",
                      profilePic: "https://i.imgur.com/W9XUx7E.jpg",
                      userName: "strategy_master",
                      category: "Starcraft II",
                    },
                    {
                      title: "CASUAL GAMEPLAY",
                      thumbnail: "https://i.imgur.com/3XZhJLU.jpg",
                      profilePic: "https://i.imgur.com/Q9ZXuZY.jpg",
                      userName: "casual_gamer",
                      category: "The Sims 4",
                    },
                    {
                      title: "HORROR NIGHT",
                      thumbnail: "https://i.imgur.com/7ZjU9L2.jpg",
                      profilePic: "https://i.imgur.com/X6Y3VNm.jpg",
                      userName: "scared_streamer",
                      category: "Resident Evil Village",
                    },
                    {
                      title: "RETRO GAMING",
                      thumbnail: "https://i.imgur.com/1KZqPjq.jpg",
                      profilePic: "https://i.imgur.com/P9ZkL7H.jpg",
                      userName: "retro_lover",
                      category: "Super Mario World",
                    },
                  ].map((content, index) => (
                    <VideoContent
                      key={index}
                      title={content.title}
                      thumbnail={content.thumbnail}
                      profilePic={content.profilePic}
                      userName={content.userName}
                      category={content.category}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.routing == "SearchResult") {
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
            <div className="border__r">
              <div className="cn__holder rr__flex-col">
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  FOLLOWED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                </div>
              </div>
            </div>
            <div className="main__content bg__color-00">
              {/* Main content will be inserted here */}
              <div className="fl__content-holder rr__flex-col">
                <span className="fl__title fs__title-1 league-spartan-semibold citizenship fill__container def-pad-2 no__padding-lr">
                  Search results for "searchTerm"
                </span>
                <div className="def-pad-2"></div>
                <span className="fs__large-2 league-spartan-regular citizenship fill__container def-pad-2 no__padding-lr">
                  Channels tag with "searchTerm"
                </span>
                <div className="sh__content-holder rr__flex-col">
                  {[
                    {
                      title: "Exploring New Horizons",
                      thumbnail: "https://i.imgur.com/mUaz2eC.jpg",
                      profilePic: "https://i.imgur.com/JcLIDUe.jpg",
                      userName: "explorer123",
                      category: "Just Chatting",
                      view: 1500,
                    },
                    {
                      title: "Late Night Coding Session",
                      thumbnail: "https://i.imgur.com/nWxUwqZ.jpg",
                      profilePic: "https://i.imgur.com/qN5DFQN.jpg",
                      userName: "codemaster",
                      category: "Science & Technology",
                      view: 800,
                    },
                    {
                      title: "Speedrunning Mario 64",
                      thumbnail: "https://i.imgur.com/7ZjOD7a.jpg",
                      profilePic: "https://i.imgur.com/8GC6owZ.jpg",
                      userName: "speedster",
                      category: "Retro",
                      view: 2200,
                    },
                    {
                      title: "Cooking Stream: Italian Cuisine",
                      thumbnail: "https://i.imgur.com/3fPsZD1.jpg",
                      profilePic: "https://i.imgur.com/LZ1Xosc.jpg",
                      userName: "chefmaster",
                      category: "Food & Drink",
                      view: 1800,
                    },
                    {
                      title: "Chill Music Stream",
                      thumbnail: "https://i.imgur.com/2RqvQkS.jpg",
                      profilePic: "https://i.imgur.com/T9qKjXV.jpg",
                      userName: "musiclover",
                      category: "Music",
                      view: 3000,
                    },
                  ].map((content, index) => (
                    <VideoContent
                      key={index}
                      type="search"
                      title={content.title}
                      thumbnail={content.thumbnail}
                      profilePic={content.profilePic}
                      userName={content.userName}
                      category={content.category}
                      view={content.view}
                    />
                  ))}
                </div>
                <span className="fs__large-2 league-spartan-regular citizenship fill__container def-pad-2 no__padding-lr">
                  Live channels
                </span>
                <div className="sh__content-holder rr__flex-row">
                  {[
                    {
                      title: "MY FIRST STREAM",
                      thumbnail: "https://i.imgur.com/mUaz2eC.jpg",
                      profilePic: "https://i.imgur.com/JcLIDUe.jpg",
                      userName: "nauts",
                      category: "League Of Legends",
                    },
                    {
                      title: "MY FIRST STREAM",
                      thumbnail: "https://i.imgur.com/mUaz2eC.jpg",
                      profilePic: "https://i.imgur.com/JcLIDUe.jpg",
                      userName: "nauts",
                      category: "League Of Legends",
                    },
                  ].map((content, index) => (
                    <VideoContent
                      key={index}
                      title={content.title}
                      thumbnail={content.thumbnail}
                      profilePic={content.profilePic}
                      userName={content.userName}
                      category={content.category}
                    />
                  ))}
                </div>
                <span className="fs__large-2 league-spartan-regular citizenship fill__container def-pad-2 no__padding-lr">
                  Categories
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    // const LazyJWPlayer = lazy(() => import("@jwplayer/jwplayer-react"));
    
    return (
      <>
        <div className="main__position">
          <div className="sidebar bg__color-2 rr__flex-row">
            <div className="border__r">
              <div className="cn__holder rr__flex-col">
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  FOLLOWED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {}}
                  />
                </div>
                <div className="cn__holder-label league-spartan-semibold fs__normal-2">
                  RECOMMENDED CHANNELS
                </div>
                <div className="cn__holder-comps">
                  {/* map user here */}
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={1326}
                  />
                  <ChannelComp
                    isOffline={false}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={132326}
                  />
                  <ChannelComp
                    isOffline={true}
                    profilePic="https://i.imgur.com/neHVP5j.jpg"
                    userName="Resolved"
                    category="League Of Legends"
                    viewCount={144226}
                  />
                  <Button
                    type={"link-type"}
                    text={"Show more"}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
            <div className="main__content bg__color-vid">
              {/* <img className="bg__img" src={smBackground} alt="background"/> */}
              <div className="video__holder rr__flex-col rrf__jc-center rrf__ai-center bg__color-00">
                {/* <span className="fs__title-5 league-spartan-regular citizenship ta__center fill__container">
                  Stream is offline
                </span> */}

                  <video style={{
                      width: "100%",
                      height: "100%",
                    }
                  } id="remote__stream" autoPlay={true} controls={true} preload="metadata"></video>

              </div>

              <StreamUserInfo
                userName={props.userRoute}
                title="Hello guys"
                category="osu!"
                profilePic="https://i.imgur.com/neHVP5j.jpg"
                viewCount={123492}
                flCount={12342}
              />
            </div>
            <StreamChat />
          </div>
        </div>
      </>
    );
  }
}
