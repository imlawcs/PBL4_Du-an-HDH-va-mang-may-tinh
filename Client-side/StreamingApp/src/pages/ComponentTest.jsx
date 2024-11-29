import ChatComp from "../components/ChatComp";
import '../assets/css/ComponentTest.css'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ChannelComp from "../components/ChannelComp";
import CustomModal from "../components/CustomModal";
import CategoryComp from "../components/CategoryComp";
import "../assets/css/CustomModal.css";
import { CategoryRoutes } from "../API/Category.routes";
import { useEffect, useRef, useState } from "react";
import CustomDatalist from "../components/CustomDatalist";
import { TagRoutes } from "../API/Tag.routes";
import MenuHolder from "../components/MenuHolder.main";
import MenuOptionBtn from "../components/MenuOptionBtn";
import { faBan, faEllipsis, faInfoCircle, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";
export default function ComponentTest() {
  const navigate = useNavigate();
  const [categoryDataList, setCategoryDataList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [focus, setFocus] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const cateRef = useRef(null);
  const tagRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState([]);
  const [inputPosition, setInputPosition] = useState({ top: 0, left: 0, height: 0 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        await CategoryRoutes.getAllCategories().then((res) => {
          setCategoryDataList(res || []);
        });
        await TagRoutes.getAllTags().then((res) => {
          setTagList(res || []);
        });
      } catch (error) {
        console.error("Error fetching tags and categories:", error);
      }
    };
    fetchData();
  }, [])
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
  const handleSelectCategory = (value, id) => {
    console.log("Selected:", value, id);
    setInputValue(value);
    setSelectedCategory(id);
    setFocus(0);
  }
  const handleSelectTag = (value, id) => {
    console.log("Selected:", value, id);
    setTagValue(value);
    setSelectedCategory(id);
    setFocus(0);
  }
  return (
    <>
      <div className="test__container">
        <Button type="default" text="Back to Home" onClick={() => {
          navigate("/");
        }}/>
        <div className="test-comp__holder rr__flex-col rrf__row-tiny">

          <input
          style={{
            zIndex: 100,
          }}
          type="text"
          ref={cateRef}
          className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
          placeholder="Test"
          value={inputValue}
          onFocus={() => {
            setFocus(1);
            console.log("Focus");
          }}
          onBlur={() => {
            if(!mouseDown)
            {
              setFocus(0); 
            console.log("Blur");
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          />
          <CustomDatalist 
            id="categoryList" 
            type="category"
            data={categoryDataList}
            inputValue={inputValue}
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
          <input
          style={{
            zIndex: 100,
          }}
          type="text"
          ref={tagRef}
          className="smd__input fs__normal-1 league-spartan-regular no__bg citizenship def-pad-2 fill__container"
          placeholder="Test"
          value={tagValue}
          onFocus={() => {
            setFocus(2);
            console.log("Focus");
          }}
          onBlur={() => {
            if(!mouseDown)
            {
              setFocus(0); 
            console.log("Blur");
            }
          }}
          onChange={(e) => setTagValue(e.target.value)}
          />
          <CustomDatalist 
            id="tagList"
            type="tag"
            data={tagList}
            inputValue={tagValue}
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
        </div>
          <MenuHolder>
            <MenuOptionBtn icon={faBan} optionName={"Block"} styles={{
              width: "100%"
            }}/>
            <MenuOptionBtn icon={faInfoCircle} optionName={"About"} styles={{
              width: "100%"
            }}/>
          </MenuHolder>
      </div>
    </>
  )
}