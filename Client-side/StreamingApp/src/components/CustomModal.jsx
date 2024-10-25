import { useState } from "react";
import Button from "./Button";
import "../assets/css/CustomModal.css";
import "../assets/css/NavBar.css";
import BtnIcon from "./BtnIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/Logo__sieufix.png";
import {
  faPenToSquare,
  faArrowDown,
  faArrowUp,
  faClose,
  faCross,
  faVideo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { WebRTCHandle } from "../scripts/webrtcHandle";
import { SignalRTest } from "../scripts/webrtcTemp";
export default function CustomModal(props) {
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
        try {
          const response = await fetch("https://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Username, Password }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token); // Store the JWT token
            props.login(Username, Password); // Call the login function passed via props
          } else {
            const errorData = await response.json();
            setErrors({ form: errorData.message });
          }
        } catch (error) {
          setErrors({ form: "An error occurred. Please try again." });
        } finally {
          setLoading(false);
        }
        // props.login(Username, Password);
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
                {errors.form && (
                  <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                    {errors.form}
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
                <Button type="default" text="Login" onClick={handleLogin}/>
              </div>
            </div>
          </div>
          <div className="bg__shadow" onClick={props.offModal}></div>
        </div>
      </>
    );
  } else if (props.type === "signup") {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [Username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const validateSignup = () => {
      let newErrors = {};

      if (!Username.trim()) {
        newErrors.Username = "Username is required";
      } else if (Username.length < 3) {
        newErrors.Username = "Username must be at least 3 characters long";
      }

      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid";
      }

      if (!Password) {
        newErrors.Password = "Password is required";
      } else if (Password.length < 8) {
        newErrors.Password = "Password must be at least 8 characters long";
      }

      if (Password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!agreeTerms) {
        newErrors.agreeTerms = "You must agree to the terms and conditions";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSignup = () => {
      if (validateSignup()) {
        // Proceed with signup
        props.signup();
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="error rr__color-secondary fs__normal-1 league-spartan-regular">
                  {errors.email}
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
              <input
                className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2"
                type="Password"
                placeholder="Confirm Password"
                value={confirmPassword}
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
                      <Button type="default" text={"Preview Stream"} onClick={() => {
                        //  WebRTCHandle.start();
                        SignalRTest.preview();
                        document.getElementById('offline_label').style.display = 'none';
                        //  WebRTCHandle.startStream();
                        //  WebRTCHandle.CreateRoom('1', '1');
                      }}/>
                      <Button type="default" text={"Start"} onClick={() => {
                        //  WebRTCHandle.start();
                        SignalRTest.start("hello");
                        //  WebRTCHandle.startStream();
                        //  WebRTCHandle.CreateRoom('1', '1');
                      }}/>
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
    return (
      <>
        <div className="smd__size rr__flex-col def-pad-1 bg__color-2 rrf__row-normal citizenship">
          <span className="fs__large-1 league-spartan-semibold">
            <FontAwesomeIcon icon={faPenToSquare} /> Description
          </span>
          <div className="rr__flex-col fill__container rrf__row-normal">
            <div className="rr__flex-row">
              <label className="smd__label fs__normal-2 league-spartan-regular">
                Title
              </label>
              <input
                className="smd__input fs__normal-1 league-spartan-regular fill__container no__bg citizenship"
                type="text"
                placeholder="Enter title here..."
              />
            </div>
            <div className="rr__flex-row">
              <label className="smd__label fs__normal-2 league-spartan-regular">
                Category
              </label>
              <input
                className="smd__input fs__normal-1 league-spartan-regular fill__container no__bg citizenship"
                type="text"
                placeholder="Search category..."
              />
            </div>
            <div className="rr__flex-row-reverse">
              <Button type="default" text="Save" onClick={() => {}} />
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
    const [displayName, setDisplayName] = useState(props.displayName);
    const [bio, setBio] = useState(props.bio);
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
            <Button type="default" text="Save" onClick={() => {}} />
          </div>
        </div>
      </>
    );
  }
}
