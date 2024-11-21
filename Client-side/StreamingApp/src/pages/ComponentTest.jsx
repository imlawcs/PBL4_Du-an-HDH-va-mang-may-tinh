import ChatComp from "../components/ChatComp";
import '../assets/css/ComponentTest.css'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ChannelComp from "../components/ChannelComp";
import CustomModal from "../components/CustomModal";
export default function ComponentTest() {
  const navigate = useNavigate();
  return (
    <>
      <div className="test__container">
        <Button type="default" text="Back to Home" onClick={() => {
          navigate("/");
        }}/>
        <div className="test-comp__holder">
          
        </div>
      </div>
    </>
  )
}