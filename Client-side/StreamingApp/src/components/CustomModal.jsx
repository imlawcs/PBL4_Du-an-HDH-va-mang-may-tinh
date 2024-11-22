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
      let newErrors = {};

      if (!Username.trim()) {
        newErrors.Username = "Username is required";
      } else if (Username.length < 3) {
        newErrors.Username = "Username must be at least 3 characters";
      }

      if (!Password) {
        newErrors.Password = "Password is required";
      } else if (Password.length < 6) {
        newErrors.Password = "Password must be at least 6 characters";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
      if (validateForm()) {
        // try {
        //   const response = await fetch("https://localhost:3001/api/auth/login", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ Username, Password }),
        //   });

        //   if (response.ok) {
        //     const data = await response.json();
        //     localStorage.setItem("token", data.token); // Store the JWT token
        //     props.login(Username, Password); // Call the login function passed via props
        //   } else {
        //     const errorData = await response.json();
        //     setErrors({ form: errorData.message });
        //   }
        // } catch (error) {
        //   setErrors({ form: "An error occurred. Please try again." });
        // } finally {
        //   setLoading(false);
        // }
        // props.login(Username, Password);
        await Auth.logIn({Username, Password});
      }
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
              <div className="btn__holder rrf__jc-center">
                <Button type="default" text="Login" onClick={handleLogin} />
              </div>
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    );
  } 
  else if (props.type === "signup") {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [DisplayName, setDisplayName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const validateSignup = () => {
      let newErrors = {};

      if (!Username.trim()) {
        newErrors.Username = "Username is required";
      } else if (Username.length < 5) {
        newErrors.Username = "Username must be at least 5 characters long";
      }

      if (!Email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(Email)) {
        newErrors.email = "Email is invalid";
      }

      if (!Password) {
        newErrors.Password = "Password is required";
      } else if (Password.length < 8) {
        newErrors.Password = "Password must be at least 8 characters long";
      }

      if (Password !== ConfirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };


    const handleSignup = () => {
      if (validateSignup()) {
        // Proceed with signup
        const data = { Username, Password, ConfirmPassword, Email, PhoneNumber, DisplayName };
        Auth.signUp(data);
        // props.signup();
      }
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
              {errors.Username && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.Username}
                </span>
              )}
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
            <div className="btn__holder rrf__jc-center">
              <Button type="default" text="Sign Up" onClick={handleSignup} />
            </div>
          </div>

          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    );
  } else if (props.type == "SM") {
    const [option, setOption] = useState(0);
    const [isClose, setIsClose] = useState(false);
    const [serverStatus, setServerStatus] = useState(false);
    
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
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Iure eum maiores quae et nesciunt ipsam explicabo quia,
                      odit, commodi voluptatem ea quos nostrum alias expedita
                      velit doloremque perferendis soluta vitae!
                    </pre>
                    <div className="fill__container rr__flex-row rrf__col-small">
                      {serverStatus ? 
                      <>
                        <Button type="default" text={"Stop"} onClick={() => {
                          SignalRTest.stop();
                          setServerStatus(false);
                          document.getElementById('offline_label').style.display = 'block';
                        }}/>
                      </> : 
                      <>
                      <Button type="default" text={"Preview Stream"} onClick={() => {
                        
                        SignalRTest.preview();
                        document.getElementById('offline_label').style.display = 'none';
                        
                      }}/>
                      <Button type="default" text={"Start"} onClick={() => {
                        
                        SignalRTest.start(userGlobal.UserName);
                        setServerStatus(true);
                        console.log("Status: " + serverStatus);
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
  } else if (props.type == "SMdesc__setting") {
    //fetched data
    const [tagDataList, setTagDataList] = useState([]);
    const [categoryDataList, setCategoryDataList] = useState([]);
    //input value
    const [title, setTitle] = useState("");
    const [inputCategory, setInputCategory] = useState("");
    const [inputTag, setInputTag] = useState("");
    const [inputTagStandAlone, setInputTagStandAlone] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    //data for stream submit
    const [selectedCategory, setSelectedCategory] = useState({});
    const [inputTagList, setInputTagList] = useState([]);
    
    //string handling
    //input ref
    const cateRef = useRef(null);
    const tagRef = useRef(null);
    const [inputPosition, setInputPosition] = useState({ top: 0, left: 0, height: 0 });
    //trigger datalist
    const [mouseDown, setMouseDown] = useState(false); //for datalist
    const [focus, setFocus] = useState(0); // 0: none, 1: category, 2: tag
    //fetch data
    useEffect(() => {
      const fetchData = async () => {
        try {
          await TagRoutes.getAllTags().then((res) => {
            setTagDataList(res || []);
          });
          await CategoryRoutes.getAllCategories().then((res) => {
            setCategoryDataList(res || []);
          });
        } catch (error) {
          console.error("Error fetching tags and categories:", error);
        }
      };
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
    //debug useEffect
    useEffect(() => {
      console.log("TagDataList: ", inputTagList);
    }, [inputTagList])


    //handle selecting value
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
      setInputTag(value);
      // setSelectedCategory(id);
      setFocus(0);
    }
    //form validating
    const [error, setError] = useState([]);
    const formCheck = () => {
      let newErrors = [];

      const tagListTemp = inputTagStandAlone.split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "")
      .filter((name, index, self) => self.indexOf(name) === index);

      if (title.trim() === "") {
      newErrors.push("Title is required");
      }
      if(tagListTemp.length > 5) newErrors.push("Tag list must be less than 5 tags");
      if (inputCategory.trim() === "") {
      newErrors.push("Category is required");
      }
      setError(newErrors);
      return newErrors.length === 0;
    };
    const handleStreamCreate = () => {
        const inputTagListCheck = () => {
          const tagIdList = [];
          tagDataList.forEach((tag) => {
            if(inputTagList.includes(tag.tagName)) {
              tagIdList.push(tag.tagId); //tag existed
            }
            else{ //tag doesn't exist
              TagRoutes.createTag(tag.tagName).then((res) => {
                tagIdList.push(res.tagId);
              });
            }
          });
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
                onFocus={() => {
                  setError([]);
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
            <div className="rr__flex-row rrf__ai-center">
              {error.length > 0 && <FontAwesomeIcon icon={faTriangleExclamation} style={{
                color: "#47FFD3",
                fontSize: "1.5em",
                paddingRight: "0.5em",
              }}/>}
              <div className="rr__flex-col">
                {error.map((err, index) => (
                  <span className="league-spartan-semibold fs__normal-1 rr__color-secondary" key={index}>
                    {err}
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
            </div>
          </div>
        </div>
      </>
    );
  } else if (props.type == "account__setting profile-pic") {
    return (
      <>
        <div className="modal__layout rr__flex-row rrf__col-normal bg__color-2 citizenship def-pad-1">
          <div className="smd__label-3">
            <img src="https://i.imgur.com/tbmr3e8.png" className="avatar__2x" id="avatarPreview" />
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
                  console.log(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      document.getElementById('avatarPreview').src = e.target.result;
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
                  document.getElementById('avatarPreview').src = "https://i.imgur.com/tbmr3e8.png";
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
  } else if (props.type == "account__setting profile-settings") {
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
  } else if (props.type == "update"){
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
  }

}
