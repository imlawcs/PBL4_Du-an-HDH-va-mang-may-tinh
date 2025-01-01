import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "../assets/css/CustomModal.css";
import "../assets/css/NavBar.css";
import BtnIcon from "./BtnIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/Logo__sieufix.png";
import { SignalRTest } from "../scripts/webrtcTemp";
import {
  faPenToSquare,
  faArrowDown,
  faArrowUp,
  faClose,
  faCross,
  faVideo,
  faTrash,
  faTriangleExclamation,
  faImagePortrait,
  faImage,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserRoutes } from "../API/User.routes";
import { TagRoutes } from "../API/Tag.routes";
import { CategoryRoutes } from "../API/Category.routes";
import CustomDatalist from "./CustomDatalist";
import TagCard from "./TagCard";
import { isEmpty, StreamRoutes, StreamStatus } from "../API/Stream.route";
import { Colors } from "../constants/Colors";
import { Assets } from "../constants/Assets";
import { ApiConstants } from "../API/ApiConstants";
import { prepareFormData } from "../scripts/FormDataHandling";


export default function CustomModal(props) {
  const Auth = useAuth();
  const navigate = useNavigate();
  const [userGlobal, setUserGlobal] = useState(props.user || "");
  if (props.type == "login") {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
      
    };

    const handleLogin = async () => {
      let newErrors = {};
      const signup = await Auth.logIn({Username, Password}).then((res) => {
        if(res.error){
          newErrors.form = "invalid username or password";
        }
        return Promise.resolve(res);
      });
      setErrors(newErrors);
    };
    return (
      <>
        <div className="modal__holder">
          <div className="login__modal modal__layout bg__color-2">
            <div className="rr__flex-col rrf__jc-center fill__container rrf__row-normal">
              <div className="rr__flex-row rrf__jc-center rrf__ai-center rrf__col-normal">
                <img src={logo} className="n__logo" />
                <span className="fs__large-3 league-spartan-semibold citizenship">
                  Login
                </span>
              </div>
              <div className="rr__flex-col rrf__row-normal fill__container">
                <input
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  type="text"
                  placeholder="Username"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  onSubmit={handleLogin}
                />
                {errors.Username && (
                  <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                    {errors.Username}
                  </span>
                )}
                <input
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  type="Password"
                  placeholder="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  onSubmit={handleLogin}
                />
                {errors.Password && (
                  <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                    {errors.Password}
                  </span>
                )}
              </div>
              <div className="rr__flex-col rrf__row-small">
                <span className="fs__normal-1 league-spartan-light citizenship ta__center">
                  Or you can use
                </span>
                <div className="rr__flex-row rrf__col-small rrf__jc-center">
                  <BtnIcon icons={faFacebook} onClick={() => {}} />
                  <BtnIcon icons={faGoogle} onClick={() => {}} />
                  <BtnIcon icons={faXTwitter} onClick={() => {}} />
                </div>
                <span className="fs__normal-1 league-spartan-light citizenship ta__center">
                  Don't have an account?{" "}
                  <span
                    className="fs__normal-1 league-spartan-semibold citizenship cur__pointer no__user-select"
                    onClick={props.switchModal}
                  >
                    Register
                  </span>
                </span>
                <span className="fs__normal-1 league-spartan-light citizenship ta__center">
                  Forgot your Password?{" "}
                  <span className="fs__normal-1 league-spartan-semibold citizenship cur__pointer no__user-select">
                    Reset
                  </span>
                </span>
              </div>
              {errors.form && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.form}
                </span>
              )}
              <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Login" onClick={handleLogin} />
              </div>
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    );
  } else if (props.type === "signup") {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [DisplayName, setDisplayName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const validateSignup = () => {
      
    };


    const handleSignup = () => {
        // Proceed with signup
        let newErrors = {};
        const data = { Username, Password, ConfirmPassword, Email, PhoneNumber, DisplayName };
        const signup = Auth.signUp(data).then((res) => {;
          if(res.status === 400){
            newErrors.email = res.errors.Email[0];
            newErrors.Password = res.errors.Password[0];
          }
          else if(res.message){
            newErrors.ok = res.message;
            console.log("Signup success");
          }
          else {
            console.log("Status: ", res.status);
          }
          return Promise.resolve(res);
        });
        Promise.all([signup]).then((res) => {
          setErrors(newErrors);
        })
        // props.signup();
    };
    return (
      <>
        <div className="modal__holder">
          <div className="login__modal modal__layout bg__color-2 rr__flex-col rrf__row-normal">
            <div className="rr__flex-row rrf__jc-center rrf__ai-center rrf__col-normal">
              <img src={logo} className="n__logo" />
              <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Sign Up
              </span>
            </div>
            <div className="rr__flex-col rrf__row-small">
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="text"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* {errors.Username && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.Username}
                </span>
              )} */}
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.email}
                </span>
              )}
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="text"
                placeholder="Display name"
                value={DisplayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="text"
                placeholder="Phone number"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {/* for error */}
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="Password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.Password && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.Password}
                </span>
              )}
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="Password"
                placeholder="Confirm Password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div className="rr__flex-col rrf__row-small">
              <span className="fs__normal-1 league-spartan-light citizenship ta__center">
                Already have an account?{" "}
                <span
                  className="fs__normal-1 league-spartan-semibold citizenship cur__pointer no__user-select"
                  onClick={() => props.switchModal("signin")}
                >
                  Sign In
                </span>
              </span>
            </div>
            {errors.ok && (
              <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                {errors.ok}
              </span>
            )}
            <div className="btn__holder rrf__jc-center">
              <Button type="default" text="Sign Up" onClick={handleSignup} />
            </div>
          </div>

          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    );
  } else if (props.type === "SM") {
    const [option, setOption] = useState(0);
    const [isClose, setIsClose] = useState(false);
    const [serverStatus, setServerStatus] = useState(false);
    const [previewStatus, setPreviewStatus] = useState(false);
    const [infoLog, setInfoLog] = useState([]);
    const handleStream = async (status) => {
      let info = [];
      if (status === "start") {
         console.log("Start");
         StreamRoutes.getMostRecentStreamByUser(userGlobal.UserId).then((res) => {
          if (res.streamStatus === StreamStatus.FINISHED) {
            console.log("finished case");
            info.push(`${new Date().toLocaleString()}: ` + "You need to re-save your stream description in order to start a new stream" + "\n");
          }
          else if(res.streamStatus === StreamStatus.UNFINISHED) {
            if(res.isLive) {
              info.push(`${new Date().toLocaleString()}: ` + "You are already streaming" + "\n");
            }
            else {
              
              if(!previewStatus) {
                info.push(`${new Date().toLocaleString()}: ` + "Preview stream first" + "\n");
              }
              else {
                const data = {
                  streamId: res.streamId,
                  streamTitle: res.streamTitle,
                  streamDesc: res.streamDesc,
                  streamCategoryId: res.streamCategories[0].categoryId,
                  streamTagIds: res.streamTags.map((tag) => tag.tagId),
                  isLive: true,
                }
                StreamRoutes.updateStream(res.streamId, data).then((res1) => {
                  info.push(`${new Date().toLocaleString()}: ` + res1.streamMessage + "\n");
                  info.push(`${new Date().toLocaleString()}: ` + "Stream starting" + "\n");
                  SignalRTest.start(userGlobal.UserName);
                  setServerStatus(true);
                });
              }
            }
          }
          else {
            info.push(`${new Date().toLocaleString()}: ` + "Wut de hell??? start" + "\n");
          }
         });
      } else if (status === "stop") {
        console.log("Stop");
        StreamRoutes.getMostRecentStreamByUser(userGlobal.UserId).then((res) => {
          if (res.streamStatus === StreamStatus.FINISHED) {
            info.push(`${new Date().toLocaleString()}: ` + "Stopped" + "\n") ;
          }
          else if(res.streamStatus === StreamStatus.UNFINISHED) {
            if(res.isLive) {
              const data = {
                streamId: res.streamId,
                streamTitle: res.streamTitle,
                streamDesc: res.streamDesc,
                streamCategoryId: res.streamCategories[0].categoryId,
                streamTagIds: res.streamTags.map((tag) => tag.tagId),
                isLive: false,
                streamStatus: StreamStatus.FINISHED,
              }
              StreamRoutes.updateStream(res.streamId, data).then((res1) => {
                info.push(`${new Date().toLocaleString()}: ` + res1.streamMessage + "\n");
                info.push(`${new Date().toLocaleString()}: ` + "Stream stopping" + "\n");
                SignalRTest.stop();
                setServerStatus(false);
                setPreviewStatus(false);
                document.getElementById('offline_label').style.display = 'block';
              });
            }
            else {
              info.push(`${new Date().toLocaleString()}: ` + "You are not streaming");
            }
          }
          else {
            info.push(`${new Date().toLocaleString()}: ` + "Wut de hell??? stop");
          }
         });
      }
      setInfoLog(info);
    }
    
    // console.log(localStorage.getItem("streamId"));
    return (
      <>
        <div className="modal__layout bg__color-2">
          <div className="rr__flex-row rrf__jc-space-between">
            <span className="rr__flex-row fs__large-1 league-spartan-semibold rrf__col-small rrf__ai-center citizenship">
              <FontAwesomeIcon icon={faVideo} /> Stream Helper
            </span>
            <BtnIcon
              icons={isClose ? faArrowDown : faArrowUp}
              onClick={() => setIsClose(!isClose)}
            />
          </div>
          {!isClose && (
            <div className="modal__content-holder rr__flex-col rrf__row-normal">
              <div className="btn__holder fill__container">
                <Button
                  type={option == 0 ? "nav-type-clicked" : "nav-type"}
                  text={"Use inline stream source"}
                  onClick={() => setOption(0)}
                />
                <Button
                  type={option == 1 ? "nav-type-clicked" : "nav-type"}
                  text={"Use external streamware"}
                  onClick={() => setOption(1)}
                />
              </div>
              <div className="rr__flex-col fill__container rrf__row-small">
                {option == 0 ? (
                  <>
                    <span className="fs__normal-3 league-spartan-regular citizenship">
                      Stream Status
                    </span>
                    <pre className="str__status bg__color-00 def-pad-1 citizenship">
                      {infoLog.map((log, index) => (
                        <span key={index}>{log}</span>
                      ))}
                    </pre>
                    <div className="fill__container rr__flex-row rrf__col-small">
                      {serverStatus ? 
                      <>
                        <Button type="default" text={"Stop"} onClick={() => {
                          
                            handleStream("stop");
                          
                        }}/>
                      </> : 
                      <>
                      <Button type="default" text={"Preview Stream"} onClick={() => {
                        setPreviewStatus(true);
                        SignalRTest.preview();
                        document.getElementById('offline_label').style.display = 'none';
                        
                      }}/>
                      <Button type="default" text={"Start"} onClick={() => {
                        
                          handleStream("start");
                        //truyền context.username vào đây
                        
                      }}/>
                      </>}
                      
                    </div>
                    </>
                ) : (
                  <>
                    <span className="fs__normal-3 league-spartan-regular citizenship fill__container ta__center">
                      External streamware is under development
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  } else if (props.type === "SMdesc__setting") {
    //fetched data
    const [tagDataList, setTagDataList] = useState([]);
    const [categoryDataList, setCategoryDataList] = useState([]);
    const [prevStreamData, setPrevStreamData] = useState({});
    //input value
    const [title, setTitle] = useState("");
    const [inputCategory, setInputCategory] = useState("");
    const [inputTagStandAlone, setInputTagStandAlone] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [tempThumbnail, setTempThumbnail] = useState(null);
    const [tempImgFile, setTempImgFile] = useState(null);
    //data for stream submit
    const [selectedCategory, setSelectedCategory] = useState({});
    //string handling
    //input ref
    const cateRef = useRef(null);
    const tagRef = useRef(null);
    const [inputPosition, setInputPosition] = useState({ top: 0, left: 0, height: 0 });
    //trigger datalist
    const [mouseDown, setMouseDown] = useState(false); //for datalist
    const [focus, setFocus] = useState(0); // 0: none, 1: category, 2: tag
    //information logging
    const [error, setError] = useState([]);
    const [info, setInfo] = useState([]);
    //fetch data
    useEffect(() => {
      let tempStandAloneList = [];
      let tempDataList = [];
      const fetchData = async () => {
        try {
          await TagRoutes.getAllTags().then((res) => {
            tempDataList.push(...res);
            setTagDataList(res || []);
          });
          await CategoryRoutes.getAllCategories().then((res) => {
            setCategoryDataList(res || []);
          });
          await StreamRoutes.getMostRecentStreamByUser(userGlobal.UserId).then((res) => {
            console.log("Prev Stream Data: ", res);
            setPrevStreamData(res || {});
              setTitle(res.streamTitle || "");
              setInputDesc(res.streamDesc, "");
              setTempThumbnail(res.streamThumbnail? ApiConstants.BASE_URL + res.streamThumbnail : null);
              CategoryRoutes.getCategoryById(res.streamCategories[0].categoryId).then((res1) => {
                setInputCategory(res1.categoryName || "");
                setSelectedCategory({
                  categoryId: res1.categoryId,
                  categoryName: res1.categoryName
                } || {});
              });
              const tempTagList = res.streamTags.map((tag) => tag.tagId) || [];
              console.log(tempDataList);
              tempDataList.forEach((tag) => {
                if(tempTagList.indexOf(tag.tagId) > -1) tempStandAloneList.push(tag.tagName);
              });
              console.log("TempStandAloneList: ", tempStandAloneList);
              handleTagsLoading(tempStandAloneList);
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      console.log("Userglobal: "+ JSON.stringify(userGlobal));
      fetchData();
    }, [])
    //datalist position
    useEffect(() => {
      if (focus === 1 && cateRef.current) {
        const rect = cateRef.current.getBoundingClientRect();
        setInputPosition({ top: rect.bottom - 1.5, left: rect.left - 1, height: rect.height, width: rect.width - 2 });
      }
      else if(focus === 2 && tagRef.current){
        const rect = tagRef.current.getBoundingClientRect();
        setInputPosition({ top: rect.bottom - 1.5, left: rect.left - 1, height: rect.height, width: rect.width - 2 });
      }
      
    }, [focus]);
    // debug useEffect
    useEffect(() => {
      console.log("TagDataList: ", tagDataList);
    }, [tagDataList]);
    

    //handle selecting value
    const handleTagsLoading = (data) => {
      console.log("Data: ", data);
      console.log("Data: ", data.length);
      const stringdata = data.join(", ");
      console.log("StringData: ", stringdata);
      setInputTagStandAlone(stringdata || "");
    }
    const handleSelectCategory = (value, id) => {
      console.log("Selected:", value, id);
      setInputCategory(value);
      setSelectedCategory({
        categoryId: id,
        categoryName: value
      });
      setFocus(0);
    }
    const handleSelectTag = (value, id) => {
      console.log("Selected:", value, id);
      setInputTagStandAlone(inputTagStandAlone + value);
      // setInputTag(value);
      // setSelectedCategory(id);
      setFocus(0);
    }
    //form validating
    const formCheck = () => {
      let newErrors = [];

      const tagListTemp = inputTagStandAlone.split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "")
      .filter((name, index, self) => self.indexOf(name) === index);

      if (title.trim() === "") {
      newErrors.push("Title is required");
      }
      if(tagListTemp.length > 3) newErrors.push("Tag list must be less than 3 tags");
      if(inputCategory.includes(",")) newErrors.push("Category must be a single value");
      if(categoryDataList.filter((cate) => cate.categoryName === inputCategory).length === 0) newErrors.push("Category must be one of value in available list");
      if (inputCategory.trim() === "") {
      newErrors.push("Category is required");
      }
      setError(newErrors);
      return newErrors.length === 0;
    };
    const infoLog = (logData) => {
      let newInfo = [];
      newInfo.push(logData);
      setInfo([...info, newInfo].filter((value, index, self) => self.indexOf(value) === index)); //remove duplicate
    }
    //create or update stream
    const thumbnailUpload = async (streamId) => {
      if(tempImgFile) {
        const formData = new FormData();
        formData.append("StreamId", streamId);
        formData.append("ImagePath", tempImgFile);
        StreamRoutes.updateThumbnail(streamId, formData).then((res) => {
          console.log(res);
          return Promise.resolve(res);
        });
      }
    }
    const handleStreamCreate = async () => {
          console.log("inputtagcheck");
          let tagIdList = [];
          const inputTagsList = inputTagStandAlone.split(",")
          .map((value) => value.trim())
          .filter((value) => value !== "")
          .filter((name, index, self) => self.indexOf(name) === index);
          //ex: ["tag1", "tag2", "tag3"]
          const filterTagList = tagDataList.map((tag) => tag.tagName); //ex: ["tag1", "tag2", "tag3"]
          const createTagPromises = inputTagsList.map((tag) => {
            if (filterTagList.indexOf(tag) > -1) {
              const neededtagId = tagDataList.filter((tagData) => tagData.tagName === tag)[0].tagId;
              tagIdList.push(neededtagId); // tag existed
              return Promise.resolve(); // Return a resolved promise for existing tags
            } else { // tag doesn't exist
              return TagRoutes.createTag({ tagName: tag }).then((res) => {
                tagIdList.push(Number(res));
              });
            }
          });
        
          // Wait for all promises to resolve
          await Promise.all(createTagPromises);
          
        try{
          const tagListTemp = tagIdList;
          console.log(tagListTemp);
          console.log(prevStreamData);
          // console.log("TagListTemp: ", tagListTemp);
          //body data
          const data = {
            UserId: userGlobal.UserId,
            StreamTitle: title,
            StreamDesc: inputDesc,
            streamCategoryId: selectedCategory.categoryId,
            streamTagIds: tagListTemp,
            streamStatus: StreamStatus.UNFINISHED,
          }
          //create stream
          console.log(data);
          console.log(prevStreamData);
          if(isEmpty(prevStreamData)) {
            console.log("Create stream 1");
            StreamRoutes.createStream(data).then((res) => {
              console.log(res);
              
              if(tempImgFile) {
                thumbnailUpload(res);
              }
              //reset prevStreamData
              StreamRoutes.getStreamById(res).then((res1) => {
                console.log(res1);
                setPrevStreamData(res1);
              });
              localStorage.setItem("streamId", res);
            });
          }
          else
          if(prevStreamData.streamStatus === StreamStatus.FINISHED) {
            console.log("Create stream 2");
            StreamRoutes.createStream(data).then((res) => {
              console.log(res);
              if(tempImgFile) {
                thumbnailUpload(res);
              }
              //reset prevStreamData
              StreamRoutes.getStreamById(res).then((res1) => {
                console.log(res1);
                setPrevStreamData(res1);
              });
              localStorage.setItem("streamId", res);
            });
          }
          else if(prevStreamData.streamStatus === StreamStatus.UNFINISHED) {
            //update stream
            console.log("Update stream");
            const data = {
              streamId: prevStreamData.streamId,
              // UserId: userGlobal.UserId,
              streamTitle: title,
              streamDesc: inputDesc,
              streamCategoryId: selectedCategory.categoryId,
              streamTagIds: tagListTemp,
            }
            if(tempImgFile) {
              thumbnailUpload(prevStreamData.streamId);
            }
            // console.log("update data: " + JSON.stringify(data));
            StreamRoutes.updateStream(prevStreamData.streamId, data).then((res) => {
              StreamRoutes.getStreamById(prevStreamData.streamId).then((res) => {
                setPrevStreamData(res);
              });
              infoLog(res);
            });
          }
          else console.error("Stream status error");
        }
        catch(error){
          console.error("Error creating stream: ", error);
        }
    }
    return (
      <>
        <div className="smd__size rr__flex-col def-pad-1 bg__color-2 rrf__row-normal citizenship" style={{
        }}>
          <span className="fs__large-1 league-spartan-semibold">
            <FontAwesomeIcon icon={faPenToSquare} /> Description
          </span>
          <div className="rr__flex-col fill__container rrf__row-normal" style={{
              width: "40em",
            }}>
            <div className="rr__flex-row">
              <label className="smd__label fs__normal-2 league-spartan-regular">
                Title
              </label>
              <div className="rr__flex-col fill__container" style={{
                rowGap: "0.5em",
              }}>
              <input
                className="smd__input fs__normal-1 league-spartan-regular fill__container no__bg citizenship"
                type="text"
                placeholder="Enter title here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => {
                  setError([]);
                  setInfo([]);
                }}
              />
              <span className="league-spartan-light fs__normal-1 citizenship">
                Title must be less than 100 characters
              </span>
              </div>
            </div>
            <div className="rr__flex-row">
              <label className="smd__label fs__normal-2 league-spartan-regular">
                Description
              </label>
              <div className="rr__flex-col fill__container" style={{
                rowGap: "0.5em",
              }}>
              <textarea
                className="smd__input fs__normal-1 league-spartan-regular fill__container no__bg citizenship"
                type="text"
                placeholder="Enter description here..."
                style={{
                  height: "7em",
                  resize: "none",
                }}
                onFocus={() => {
                  setError([]);
                  setInfo([]);
                }}
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)}
              />
              <span className="league-spartan-light fs__normal-1 citizenship">
                Description must be less than 100 characters
              </span>
              </div>
            </div>
            <div className="rr__flex-row">
              <label className="smd__label fs__normal-2 league-spartan-regular">
                Category
              </label>
              <div className="rr__flex-col fill__container" style={{
                rowGap: "0.5em",
              }}>
              <input
                style={{
                  zIndex: 100,
                }}
                className="smd__input fs__normal-1 league-spartan-regular fill__container no__bg citizenship"
                type="text"
                placeholder="Search category..."
                value={inputCategory}
                ref={cateRef}
                onFocus={() => {
                  setError([]);
                  setInfo([]);
                  setFocus(1);
                  
                }}
                onBlur={() => {
                  if(!mouseDown)
                  {
                    setFocus(0); 
                    
                  }
                }}
                onChange={(e) => setInputCategory(e.target.value)}
              />
              <CustomDatalist 
                id="categoryList" 
                type="category"
                data={categoryDataList}
                inputValue={inputCategory}
                styles={{
                  display: focus === 1 ? "flex" : "none",
                  position: "absolute",
                  top: `${inputPosition.top}px`,
                  left: `${inputPosition.left}px`,
                  width: `${inputPosition.width}px`,
                }}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => {
                  setMouseDown(false)
                  setFocus(0);
                }}
                onClick={handleSelectCategory}
              />
              <span className="league-spartan-light fs__normal-1 citizenship">
                Select a category for your stream
              </span>
              </div>
            </div>
            <div className="rr__flex-row">
              <label className="smd__label fs__normal-2 league-spartan-regular">
                Tags
              </label>
              <div className="rr__flex-col fill__container" style={{
                rowGap: "1em",
              }}>
              <input
              style={{
                zIndex: 100,
              }}
                className="smd__input fs__normal-1 league-spartan-regular fill__container no__bg citizenship"
                type="text"
                placeholder="Seperate tags with commas..."
                value={inputTagStandAlone}
                ref={tagRef}
                onFocus={() => {
                  setError([]);
                  setInfo([]);
                  setFocus(2);
                }}
                onBlur={() => {
                  if(!mouseDown)
                  {
                    setFocus(0);
                  }
                }}
                onChange={(e) => {
                  setInputTagStandAlone(e.target.value);
                  console.log("input: " + inputTagStandAlone.split(",")
                  .map((value) => value.trim())
                  .slice(-1)[0])
                  
                }}
              />
              <CustomDatalist 
                id="tagList"
                type="tag"
                data={tagDataList}
                inputValue={inputTagStandAlone.split(",")
                  .map((value) => value.trim())
                  .filter((value) => value !== "").slice(-1)[0] === undefined? 
                  ''
                  :
                  inputTagStandAlone.split(",")
                  .map((value) => value.trim())
                  .slice(-1)[0]
                } //get last tag
                styles={{
                  display: focus === 2 ? "flex" : "none",
                  position: "absolute",
                  top: `${inputPosition.top}px`,
                  left: `${inputPosition.left}px`,
                  width: `${inputPosition.width}px`,
                }}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => {
                  setMouseDown(false)
                  setFocus(0);
                }}
                onClick={handleSelectTag}
              />
              <div className="rr__flex-row" style={{
                
              }}>
                <label className="smd__label fs__normal-1 league-spartan-light">
                  Selected tags: 
                </label>
                {inputTagStandAlone.split(",")
                .map((value) => value.trim())
                .filter((value) => value !== "")
                .filter((name, index, self) => self.indexOf(name) === index) //trim value
                .map((tag, index) => (
                  <TagCard key={index} name={tag}/>
                ))}
              </div>
              </div>
              
            </div>
            <div className="rr__flex-col">
              <label className="smd__label fs__normal-2 league-spartan-regular">
                Thumbnail
              </label>
              <img 
              className="def-pad-1"
              src={tempThumbnail? tempThumbnail : Assets.defaultThumbnail}
              alt="thumbnail" 
              srcset="" 
              style={{
                width: "15em",
                height: "8em",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById('avatarInput').click()}
              />
              <span className="fs__normal-1 league-spartan-regular" 
              style={{
                marginLeft: "1em",
              }}
              >
                Click into the image to upload thumbnail
              </span>
              <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setTempImgFile(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          console.log(e.target.result);
                          setTempThumbnail(e.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                  }}
              />
            </div>
            <div className="rr__flex-row rrf__ai-center">
              {error.length > 0 && <FontAwesomeIcon icon={faTriangleExclamation} style={{
                color: "#47FFD3",
                fontSize: "1.5em",
                paddingRight: "0.5em",
              }}/>
              }
              {
                info.length > 0 && <FontAwesomeIcon icon={faTriangleExclamation} style={{
                  color: "#47FFD3",
                  fontSize: "1.5em",
                  paddingRight: "0.5em",
                }}/>
              }

              <div className="rr__flex-col">
                {error.map((err, index) => (
                  <span className="league-spartan-semibold fs__normal-1 rr__color-secondary" key={index}>
                    {err}
                  </span>
                ))}
              </div>
              <div className="rr__flex-col">
                {info.map((inf, index) => (
                  <span className="league-spartan-semibold fs__normal-1 rr__color-secondary" key={index}>
                    {inf}
                  </span>
                ))}
              </div>
            </div>
            <div className="rr__flex-row-reverse">
              <Button type="default" text="Save" onClick={() => {
                //set tag data
                const check = formCheck();
                console.log(error);
                if(!check) return;
                handleStreamCreate();
              }} />
              {/* <Button type="default" text="Test" onClick={() => {
                console.log(prevStreamData);
                console.log("title: " + title);
              }}/> */}
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.type === "account__setting profile-pic") {
    const [tempSrc, setTempSrc] = useState(userGlobal.ProfilePic? ApiConstants.BASE_URL + userGlobal.ProfilePic : null);
    const profilePicUpdate = async (file) => {
      const formData = new FormData();
      formData.append('UserId', userGlobal.UserId);
      formData.append('ImagePath', file);
      await UserRoutes.updateProfilePic(userGlobal.UserId, formData).then((res) => {
        console.log(res);
        Auth.updateUserData();
      });
    }
    return (
      <>
        <div className="modal__layout rr__flex-row rrf__col-normal bg__color-2 citizenship def-pad-1">
          <div className="smd__label-3">
            <img src={tempSrc? tempSrc : Assets.defaultAvatar} className="avatar__2x" id="avatarPreview" 
            style={{
              objectFit: "cover",
            }}
            />
          </div>
          <div className="rr__flex-col fill__container rrf__row-small mx-auto">
            <div className="rr__flex-row rrf__col-normal">
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    profilePicUpdate(file);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setTempSrc(e.target.result);
                    };
                    reader.readAsDataURL(file);
                    
                  }
                }}
              />
              <Button 
                type="default" 
                text="Update" 
                onClick={() => document.getElementById('avatarInput').click()}
              />
              <BtnIcon 
                icons={faTrash} 
                onClick={() => {
                  
                }}
              />
            </div>
            <span className="fs__normal-1 league-spartan-light citizenship">
              Must be a valid image file
            </span>
          </div>
        </div>
      </>
    );
  } else if (props.type === "account__setting profile-settings") {
    const [displayName, setDisplayName] = useState(userGlobal.DisplayName);
    const [bio, setBio] = useState(userGlobal.Bio || "");
    const [update, setUpdate] = useState("");
    return (
      <>
        <div className="modal__layout rr__flex-col def-pad-2em bg__color-2">
          <div className="modal__content-holder rr__flex-col rrf__row-normal def-pad-1 citizenship">
            <div className="rr__flex-row">
              <label className="smd__label-2 fs__normal-2 league-spartan-regular">
                Display Name
              </label>
              {/* display name  */}
              <div className="rr__flex-col fill__container rrf__row-small">
                <input
                  className="smd__input fs__normal-1 league-spartan-regular fill__container no__bg citizenship def-pad-2"
                  type="text"
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                />

                <span className="fs__normal-1 league-spartan-light citizenship">
                  Display name must be less than 20 characters
                </span>
              </div>
              {/* bio  */}
            </div>
            <div className="rr__flex-row">
              <label className="smd__label-2 fs__normal-2 league-spartan-regular">
                Bio
              </label>
              <div className="rr__flex-col fill__container rrf__row-small">
                <textarea
                  className="smd__textarea ta__no-resize fs__normal-1 league-spartan-regular fill__container no__bg citizenship def-pad-2"
                  type="text"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />
                <span className="fs__normal-1 league-spartan-light citizenship">
                  Bio must be less than 100 characters. Will show up on your
                  user stream page
                </span>
              </div>
            </div>
            <hr className="fill__container" />
            <Button type="default" text="Save" onClick={async () => {
                const postData = {
                  userId: userGlobal.UserId,
                  userName: userGlobal.UserName,
                  displayName: displayName,
                  email: userGlobal.Email,
                  phoneNumber: userGlobal.PhoneNumber,
                  bio: bio
                }
                await UserRoutes.updateUser(userGlobal.UserId, postData).then((res) => {
                  Auth.updateUserData();
                  setUpdate(res);
                });
            }} />
            
            <span className="league-spartan-regular fs__normal-1 citizenship">
              {update}
            </span>
          </div>
        </div>
      </>
    );
  } else if (props.type === "update"){
    const [value, setValue] = useState(props.currentValue);
    return(
      <div className="modal__holder">
          <div className="login__modal modal__layout bg__color-2 rr__flex-col rrf__row-normal">
            <div className="rr__flex-col rrf__jc-center rrf__ai-center rrf__row-normal">
              <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Update {props.updateLabel}
              </span>
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="text"
                placeholder={props.updateLabel}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="btn__holder rrf__jc-center">
              <Button type="default" text="OK" onClick={() => {
                props.update(value, props.updateLabel);
              }} />
              <Button type="default" text="Cancel" onClick={props.offModal} />

            </div>
            </div>
          </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
    )
  } else if (props.type === "update-password"){
    const [currentUser, setCurrentUser] = useState(props.user || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const validatePassword = () => {
      let newErrors = {};
      if(oldPassword.trim() === "") newErrors.oldPassword = "Old password is required";
      if(newPassword.trim() === "") newErrors.newPassword = "New password is required";
      if(confirmPassword.trim() === "") newErrors.confirmPassword = "Confirm password is required";
      if(newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    const handleUpdatePassword = () => {
      const check = validatePassword();
      if(!check) return;
      UserRoutes.updatePassword(currentUser, {
        userId: currentUser,
        oldPassword,
        newPassword,
        confirmPassword
      }).then((res) => {
        console.log(res);
        setErrors({ok: res});
      });
    }
    return (
      <>
        <div className="modal__holder">
          <div className="login__modal modal__layout bg__color-2 rr__flex-col rrf__row-normal">
            <div className="rr__flex-col rrf__jc-center rrf__ai-center rrf__row-normal">
              <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Update Password
              </span>
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {errors.oldPassword && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.oldPassword}
                </span>
              )}
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.newPassword && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.newPassword}
                </span>
              )}
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.confirmPassword}
                </span>
              )}
              <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Update" onClick={handleUpdatePassword} />
              </div>
              {errors.ok && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.ok}
                </span>
              )}
              {errors.form && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.form}
                </span>
              )}
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
        </>
        );
  } else if (props.type === "block-confirm"){
    return (
      <>
        <div className="modal__holder">
          <div className="login__modal modal__layout bg__color-2 rr__flex-col rrf__row-small">
              <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Confirm Block
              </span>
            <div className="rr__flex-col rrf__jc-center rrf__row-small fill__container">
              <span className="fs__normal-2 league-spartan-light citizenship ta__center">
                Are you sure you want to block {props.user || "user"}?
              </span>
              <span className="fs__normal-2 league-spartan-light citizenship ta__center">
                You will not: 
              </span>
              <span className="fs__normal-2 league-spartan-light citizenship ta__center">
                - See their content
              </span>
              <span className="fs__normal-2 league-spartan-light citizenship ta__center">
                - Be able to chat with them
              </span>
              <span className="fs__normal-2 league-spartan-light citizenship ta__center">
                - Be able to follow them
              </span>
              <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Block" onClick={props.block} />
                <Button type="default" text="Cancel" onClick={props.offModal} />
              </div>
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    );
  } else if (props.type === "template"){
    return (
      <>
        <div className="modal__holder"
        >
          <div className="login__modal modal__layout bg__color-2 rr__flex-col rrf__row-small">
              <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Title
              </span>
            <div className="rr__flex-col rrf__jc-center rrf__row-small fill__container">
              <span className="fs__normal-2 league-spartan-light citizenship ta__center">
                Content
              </span>
              <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Cancel" onClick={props.offModal} />
              </div>
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    )
  } else if (props.type === "edit"){
    const [data, setData] = useState(props.data);
    const [avatarChanged, setAvatarChanged] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState(props.data.imagePath? ApiConstants.BASE_URL + props.data.imagePath : props.data.ProfilePic? ApiConstants.BASE_URL + props.data.ProfilePic : null);
    const [tempImgFile, setTempImgFile] = useState(null);
    const [modalType, setModalType] = useState(0);
    const updateData = async () => {
      const postData = props.data.UserId ? {
        UserId: data.UserId, 
        UserName: data.UserName,
        DisplayName: data.DisplayName,
        Email: data.Email,
        PhoneNumber: data.PhoneNumber,
        Bio: data.Bio,
      } : (() => {
        const formData = new FormData();
        formData.append('CategoryId', data.categoryId);
        formData.append('CategoryName', data.categoryName);
        formData.append('CategoryDesc', data.categoryDesc);
        if(tempImgFile)
        formData.append('ImagePath', tempImgFile);
        
        return formData;
      })();
      console.log("run update");
      if (props.data.UserId) {
        await UserRoutes.updateUser(data.UserId, postData).then((res) => {
          console.log(res);
        });
        if (tempImgFile) {
          await profilePicUpdate();
        }
        props.refresh(1);
        props.offModal();
      } else {
        await CategoryRoutes.updateCategory(data.categoryId, postData).then((res) => {
          console.log(res);
          props.refresh(2);
          props.offModal();
        });
      }
    }
    const userRoleUpdate = async () => {
      console.log("userrole");
    }
    const profilePicUpdate = async () => {
      const formData = new FormData();
      formData.append('UserId', data.UserId);
      formData.append('ImagePath', tempImgFile);
      await UserRoutes.updateProfilePic(data.UserId, formData).then((res) => {
        console.log(res);
      });
    }
    if(props.data.UserId)
    return <>
      <div className="modal__holder">
        <div className="modal__layout-2 bg__color-2 rr__flex-col rrf__row-normal" style={{
          zIndex: 1000,
        }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Edit info
            </span>
            {modalType != 1 ? <>
              <div className="rr__flex-col rrf__row-normal">
                <div className="rr__flex-row rrf__col-normal">
                  <img src={tempImgSrc? tempImgSrc : Assets.defaultAvatar}
                  className="avatar__2x avatarPreview1" style={{
                      width: "6em",
                      height: "6em",
                      objectFit: "cover",
                  }}/>
                  <div className="rr__flex-col rrf__row-tiny">
                    <span className="fs__normal-3 league-spartan-semibold citizenship ta__left">
                      User ID: {data.UserId}
                    </span>
                    <span className="fs__normal-3 league-spartan-semibold citizenship ta__left">
                      Username: {data.UserName}
                    </span>
                    <input
                      type="file"
                      id="avatarInput"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setTempImgFile(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            console.log(e.target.result);
                            setTempImgSrc(e.target.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button
                    type="default" 
                    text="Update avatar"
                    onClick={() => document.getElementById('avatarInput').click()}
                    />
                    {avatarChanged && 
                      <span className="fs__normal-1 rr__color-secondary league-spartan-regular ta__left">
                        Avatar changed  
                      </span>
                    }
                  </div>
                </div>
                  <Button
                    type="default" 
                    text="Status update"
                    onClick={() => {setModalType(1)}}
                  />
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  Display name
                </span>
                <input type="text" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Enter new displayname"
                  value={data.DisplayName}
                  onChange={(e) => {
                    setData({...data, DisplayName: e.target.value});
                  }}
                />
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  Email
                </span>
                <input type="email" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Enter new email"
                  value={data.Email}
                  onChange={(e) => {
                    setData({...data, Email: e.target.value});
                  }}
                />
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  Phone number
                </span>
                <input type="text" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Enter new phone number"
                  value={data.PhoneNumber}
                  onChange={(e) => {
                    setData({...data, PhoneNumber: e.target.value});
                  }}
                />
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  Bio
                </span>
                <textarea
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Enter new Bio"
                  style={{
                    resize: "none",
                    height: "5em",
                  }}
                  value={data.Bio}
                  onChange={(e) => {
                    setData({...data, Bio: e.target.value});
                  }}
                />
              </div>
            </>:
            <>
              <div className="rr__flex-col rrf__row-tiny">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  Role
                </span>
                <select
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  value={data.Role}
                  onChange={(e) => {
                    setData({...data, Role: e.target.value});
                  }}
                  >
                  <option value="1">User</option>
                  <option value="2">Admin</option>
                </select>
              </div>
              <div className="btn__holder">
                <Button type="default" text="Back" onClick={() => setModalType(0)}/>
              </div>
            </>}
            <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Confirm" onClick={modalType == 1 ? userRoleUpdate : updateData} />
                <Button type="default" text="Cancel" onClick={props.offModal} />
            </div>
        </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
    </>
    else return(
      <>
      <div className="modal__holder">
        <div className="modal__layout-2 bg__color-2 rr__flex-col rrf__row-normal" style={{
          zIndex: 1000,
        }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Edit info
            </span>
            <div className="rr__flex-row rrf__col-normal">
              <div className="rr__flex-col rrf__row-small">
                <img src={tempImgSrc? tempImgSrc : Assets.defaultCategory} 
                className="avatar__2x" 
                style={{
                      width: "14em",
                      height: "16em",
                      objectFit: "cover",
                      borderRadius: "0.5em",
                }}/>  
                <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setTempImgFile(file);
                      console.log(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          console.log(e.target.result);
                          setTempImgSrc(e.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                <Button 
                  type="default" 
                  text="Update image"
                  onClick={() => document.getElementById('avatarInput').click()} 
                  styles={{
                    width: "auto",
                  }}
                />
              </div>
              <div className="rr__flex-col rrf__row-small fill__container">
                  <span className="fs__normal-3 league-spartan-semibold citizenship ta__left">
                    ID: {data.categoryId}
                  </span>
                <div className="rr__flex-col rrf__row-tiny">
                  <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                    Category name
                  </span>
                  <input type="text" 
                      className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                      placeholder="Enter new phone number"
                      value={data.categoryName}
                      onChange={(e) => {
                        setData({...data, categoryName: e.target.value});
                      }}
                    />
                </div>
                <div className="rr__flex-col rrf__row-tiny">
                  <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                    Description
                  </span>
                  <textarea
                    className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                    placeholder="Enter new Bio"
                    style={{
                      resize: "none",
                      height: "5em",
                    }}
                    value={data.categoryDesc}
                    onChange={(e) => {
                      setData({...data, categoryDesc: e.target.value});
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Confirm" onClick={updateData} />
                <Button type="default" text="Cancel" onClick={props.offModal} />
            </div>
        </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
      </>
    )
  } else if (props.type === "delete"){
    const [data, setData] = useState(props.data);
    const handleDelete = async () => {
      if(data.UserId){
        if(data.Roles[0] != undefined && data.Roles[0].roleName === "Admin"){ 
          alert("Cannot delete admin");
          return;
        }
        await UserRoutes.deleteUser(data.UserId).then((res) => {
          console.log(res);
          props.refresh(1);
          props.offModal();
        });
      } else {
        await CategoryRoutes.deleteCategory(data.categoryId).then((res) => {
          console.log(res);
          props.refresh(2);
          props.offModal();
        });
      }
    }
    if(data.UserId)
    return <>
      <div className="modal__holder">
        <div className="modal__layout bg__color-2 rr__flex-col rrf__row-small" style={{
          zIndex: 1000,
        }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Confirm deletion
            </span>
            <span className="fs__normal-3 league-spartan-semibold citizenship fill__container">
              Are you sure you want to delete this {data.UserId? "user":"category"}?
            </span>
            <div className="rr__flex-row rrf__col-normal">
            <img src={data.ProfilePic? ApiConstants.BASE_URL + data.ProfilePic : Assets.defaultAvatar}
                className="avatar__2x avatarPreview1" style={{
                    width: "6em",
                    height: "6em",
                    objectFit: "cover",
                }}/>
              <div className="rr__flex-col rrf__row-small">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  <b style={{
                    color: Colors.secondary,
                  }}>User ID:</b> {data.UserId}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Username:</b> {data.UserName}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Display name:</b> {data.DisplayName}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Role: </b> {data.Roles[0]? data.Roles[0].roleName : "undefined"}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Email: </b>{data.Email}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Phone number:</b> {data.PhoneNumber}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Registered date:</b> {new Date(data.RegisterDate).toLocaleString()}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Bio:</b> {data.Bio? data.Bio : "undefined" }<br></br>
                </span>
              </div>
            </div>
            <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Confirm" onClick={handleDelete} />
                <Button type="default" text="Cancel" onClick={props.offModal} />
            </div>
        </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
    </>
    else return(
      <>
      <div className="modal__holder">
        <div className="modal__layout bg__color-2 rr__flex-col rrf__row-small" style={{
          zIndex: 1000,
        }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Confirm deletion
            </span>
            <span className="fs__normal-3 league-spartan-semibold citizenship fill__container">
              Are you sure you want to delete this {data.UserId? "user":"category"}?
            </span>
            <div className="rr__flex-row rrf__col-normal">
              <img src={data.imagePath? ApiConstants.BASE_URL + data.imagePath : Assets.defaultCategory}
                className="avatar__2x avatarPreview1" style={{
                    width: "10em",
                    height: "12em",
                    objectFit: "cover",
                    borderRadius: "0.5em",
              }}/>
              <div className="rr__flex-col rrf__row-small">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  <b style={{
                    color: Colors.secondary,
                  }}>ID: </b> {data.categoryId}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Name: </b> {data.categoryName}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Description: </b> {data.categoryDesc}<br></br>
                </span>
              </div>
            </div>
            <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Confirm" onClick={handleDelete} />
                <Button type="default" text="Cancel" onClick={props.offModal} />
            </div>
        </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
      </>
    )
  } else if (props.type === "detail"){
    const [data, setData] = useState(props.data);
    if(data.UserId)
    return <>
      <div className="modal__holder">
        <div className="modal__layout bg__color-2 rr__flex-col rrf__row-small" style={{
          zIndex: 1000,
        }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Detailed info
            </span>
            <div className="rr__flex-row rrf__col-normal">
            <img src={data.ProfilePic? ApiConstants.BASE_URL + data.ProfilePic : Assets.defaultAvatar}
                className="avatar__2x avatarPreview1" style={{
                    width: "6em",
                    height: "6em",
                    objectFit: "cover",
                }}/>
              <div className="rr__flex-col rrf__row-small">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  <b style={{
                    color: Colors.secondary,
                  }}>ID:</b> {data.UserId}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Username:</b> {data.UserName}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Display name:</b> {data.DisplayName}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Role: </b> {data.Roles[0]? data.Roles[0].roleName : "undefined"}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Email: </b>{data.Email}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Phone number:</b> {data.PhoneNumber}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Registered date:</b> {new Date(data.RegisterDate).toLocaleString()}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Bio:</b> {data.Bio? data.Bio : "undefined" }<br></br>
                </span>
              </div>
            </div>
            <div className="btn__holder rrf__jc-center">
                <Button type="default" text="OK" onClick={props.offModal} />
            </div>
        </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
    </>
    else 
    if(data.categoryId)
    return (
      <>
      <div className="modal__holder">
        <div className="modal__layout bg__color-2 rr__flex-col rrf__row-small" style={{
          zIndex: 1000,
        }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Detailed info
            </span>
            <div className="rr__flex-row rrf__col-normal">
              <img src={data.imagePath? ApiConstants.BASE_URL + data.imagePath : Assets.defaultCategory}
                className="avatar__2x avatarPreview1" style={{
                    width: "10em",
                    height: "12em",
                    objectFit: "cover",
                    borderRadius: "0.5em",
              }}/>
              <div className="rr__flex-col rrf__row-small">
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  <b style={{
                    color: Colors.secondary,
                  }}>ID: </b> {data.categoryId}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Name: </b> {data.categoryName}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Description: </b> {data.categoryDesc}<br></br>
                </span>
              </div>
            </div>
            <div className="btn__holder rrf__jc-center">
                <Button type="default" text="OK" onClick={props.offModal} />
            </div>
        </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
      </>
    )
    return (
      <>
        <div className="modal__holder">
          <div className="modal__layout bg__color-2 rr__flex-col rrf__row-small" style={{
            zIndex: 1000,
          }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
              Detailed info
            </span>
            <div className="rr__flex-row rrf__col-normal">
              <img src={data.streamThumbnail ? ApiConstants.BASE_URL + data.streamThumbnail : Assets.defaultThumbnail}
                className="avatar__2x avatarPreview1" style={{
                  width: "16em", 
                  height: "9em",
                  objectFit: "cover",
                  borderRadius: "0.5em",
                }}/>
              <div className="rr__flex-col rrf__row-small" style={{
                marginBottom: "1em",
              }}>
                <span className="fs__normal-2 league-spartan-regular citizenship ta__left">
                  <b style={{
                    color: Colors.secondary,
                  }}>Stream ID: </b> {data.streamId}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Title: </b> {data.streamTitle}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Description: </b> {data.streamDesc}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Author: </b> {data.user.userName}<br></br>
                  <b style={{
                    color: Colors.secondary,
                  }}>Stream Date: </b> {new Date(data.streamDate).toLocaleString()}<br></br>
                </span>
                <Button
                type="default" 
                text="View this user" 
                onClick={() => {
                  navigate(`/user/${data.user.userName}`);
                }}/>
              </div>
            </div>
            <div className="btn__holder rrf__jc-center">
              <Button type="default" text="OK" onClick={props.offModal} />
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    )
  } else if (props.type === "add"){
    const addCheck = props.addCheck;
    const [data, setData] = useState(
      addCheck === "user"? {
        UserName: "",
        DisplayName: "",
        Email: "",
        PhoneNumber: "",
        Password: "",
        ConfirmPassword: "",
      }:
      {
        CategoryName: "",
        CategoryDesc: "",
        ImagePath: null,
      }
    );
    const [error, setError] = useState({});
    const [formError, setFormError] = useState("");
    const [tempImgSrc, setTempImgSrc] = useState("");
    const errorCheck = () => {
      let newError = {};
      if(addCheck === "user"){
        if(data.UserName.trim() === "") newError.Username = "Username is required";
        if(data.DisplayName.trim() === "") newError.DisplayName = "Display name is required";
        if(data.Email.trim() === "") newError.Email = "Email is required";
        if(data.PhoneNumber.trim() === "") newError.PhoneNumber = "Phone number is required";
        if(data.Password.trim() === "") newError.Password = "Password is required";
        if(data.ConfirmPassword.trim() !== data.Password.trim()) newError.ConfirmPassword = "Confirm password is not matched";
      } else {
        if(data.CategoryName.trim() === "") newError.categoryName = "Category name is required";
        if(data.CategoryDesc.trim() === "") newError.categoryDesc = "Category description is required";
      }
      setError(newError);
      return Object.keys(newError).length === 0;
    }
    const handleForm = async () => {
      setFormError("");
      const check = errorCheck();
      if(!check) return;
      if(addCheck === "user"){
        console.log(data);
        Auth.signUp(data).then((res) => {
          console.log(res);
          setFormError(res.message);
          props.refresh(1);
          props.offModal();
        });
      } else {
        console.log(data);
        const formData = prepareFormData(data);
        console.log(formData);
        CategoryRoutes.addNewCategory(data).then((res) => {
          console.log(res);
          setFormError(res);
          props.refresh(2);
          props.offModal();
        });
      }
    }

    if(addCheck === "user")
    return(
      <>
        <div className="modal__holder">
          <div className="modal__layout-2 bg__color-2 rr__flex-col rrf__row-normal" style={{
            zIndex: 1000,
          }}>
              <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                  Add a new user
              </span>
              <div className="rr__flex-col rrf__row-tiny">
                <input type="text" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Username"
                  value={data.UserName}
                  onChange={(e) => {
                    setData({...data, UserName: e.target.value});
                  }}
                  />
                  {error.Username && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {error.Username}
                    </span>
                  )}
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <input type="text" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Display name"
                  value={data.DisplayName}
                  onChange={(e) => {
                    setData({...data, DisplayName: e.target.value});
                  }}
                />
                {error.DisplayName && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {error.DisplayName}
                    </span>
                )}
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <input type="email" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Email"
                  value={data.Email}
                  onChange={(e) => {
                    setData({...data, Email: e.target.value});
                  }}
                />
                {error.Email && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {error.Email}
                    </span>
                )}
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <input type="text" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Phone number"
                  value={data.PhoneNumber}
                  onChange={(e) => {
                    setData({...data, PhoneNumber: e.target.value});
                  }}
                />
                  {error.PhoneNumber && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {error.PhoneNumber}
                    </span>
                  )}
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <input type="password" 
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Password"
                  value={data.Password}
                  onChange={(e) => {
                    setData({...data, Password: e.target.value});
                  }}
                />
                {error.Password && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {error.Password}
                    </span>
                )}
              </div>
              <div className="rr__flex-col rrf__row-tiny">
                <input type="password"
                  className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                  placeholder="Confirm Password"
                  value={data.ConfirmPassword}
                  onChange={(e) => {
                    setData({...data, ConfirmPassword: e.target.value});
                  }}
                />
                {error.ConfirmPassword && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {error.ConfirmPassword}
                    </span>
                )}
              </div>
                {formError !== "" && (
                  <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                    {formError}
                  </span>
                )}
              <div className="btn__holder rrf__jc-center">
                  <Button type="default" text="Confirm" onClick={handleForm} />
                  <Button type="default" text="Cancel" onClick={props.offModal}/>
              </div>
          </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
      </>
    )
    else return (
      <>
        <div className="modal__holder">
        <div className="modal__layout-2 bg__color-2 rr__flex-col rrf__row-normal" style={{
          zIndex: 1000,
        }}>
            <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Add new category
            </span>
            <div className="rr__flex-row rrf__col-normal">
              <div className="rr__flex-col rrf__row-small">
                <img src={tempImgSrc? tempImgSrc : Assets.defaultCategory} 
                className="avatar__2x" 
                style={{
                      width: "14em",
                      height: "16em",
                      objectFit: "cover",
                      borderRadius: "0.5em",
                }}/>  
                <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setData({...data, ImagePath: file});
                      console.log(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          console.log(e.target.result);
                          setTempImgSrc(e.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                <Button 
                  type="default" 
                  text="Update image"
                  onClick={() => document.getElementById('avatarInput').click()} 
                  styles={{
                    width: "auto",
                  }}
                />
              </div>
              <div className="rr__flex-col rrf__row-small fill__container">
                <div className="rr__flex-col rrf__row-tiny">
                  <input type="text" 
                      className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                      placeholder="Category name"
                      value={data.CategoryName}
                      onChange={(e) => {
                        setData({...data, CategoryName: e.target.value});
                      }}
                    />
                    {error.categoryName && (
                      <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                        {error.categoryName}
                      </span>
                    )}
                </div>
                <div className="rr__flex-col rrf__row-tiny">
                  <textarea
                    className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                    placeholder="Description"
                    style={{
                      resize: "none",
                      height: "5em",
                    }}
                    value={data.CategoryDesc}
                    onChange={(e) => {
                      setData({...data, CategoryDesc: e.target.value});
                    }}
                  />
                  {error.categoryDesc && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {error.categoryDesc}
                    </span>
                  )}
                </div>
                  {formError !== "" && (
                    <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                      {formError}
                    </span>
                  )}
              </div>
            </div>
            
            <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Confirm" onClick={handleForm} />
                <Button type="default" text="Cancel" onClick={props.offModal} />
            </div>
        </div>
        <div className="bg__shadow" onClick={props.offModal}></div>
      </div>
      </>
    )
  } else if (props.type === "moderator-confirm"){
    return(
      <>
        <div className="modal__holder"
        >
          <div className="login__modal modal__layout bg__color-2 rr__flex-col rrf__row-small">
              <span className="fs__large-3 league-spartan-semibold citizenship ta__center">
                Assigning Moderator
              </span>
            <div className="rr__flex-col rrf__jc-center rrf__row-small fill__container">
              <span className="fs__normal-2 league-spartan-light citizenship ta__center">
                Are you sure to grand moderator role of your channel to {props.user || "user"}?
              </span>
              <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Confirm" onClick={props.confirm} />
                <Button type="default" text="Cancel" onClick={props.offModal} />
              </div>
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
      )
  }
}
