import ChatComp from "../components/ChatComp";
import '../assets/css/ComponentTest.css'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ChannelComp from "../components/ChannelComp";
export default function ComponentTest() {
  const navigate = useNavigate();
  return (
    <>
      <div className="test__container">
        <Button type="default" text="Back to Home" onClick={() => {
          navigate("/");
        }}/>
        <div className="test-comp__holder">
        <ChatComp 
          timeStamp="12:00" 
          userName="User1" 
          chatContext="Hello World!"
          badge="moderator"
        />
        <ChatComp 
          timeStamp="12:00" 
          userName="User1" 
          chatContext="Hello World!"
          badge="owner"
        />
        <ChatComp 
          timeStamp="12:00" 
          userName="User1" 
          chatContext="Hello World!"
          badge="vip"
        />
        <ChannelComp type="search"
          profilePic="https://via.placeholder.com/150"
          userName="User1"
          followers={1000}
          onClick={() => {
            navigate("/user/User1");
          }}
        />
        </div>
      </div>
    </>
  )
}