import TagCard from "./TagCard";
import "../assets/css/CategoryComp.css";
import { useNavigate } from "react-router-dom";

export default function CategoryComp(props) {
  const navigate = useNavigate();
  if (props.type === "default") {
    return (
      <>
        <div className="category__card-2x rr__flex-row rrf__col-normal">
          <img src={props.categoryPic} className="cate__c-bg-2x" />
          <div className="cate__content-holder-2x rr__flex-col rrf__jc-space-between">
            <div className="rr__flex-col rrf__row-small">
              <span className="fs__title-3 citizenship fill__container league-spartan-semibold">
                {props.categoryName}
              </span>
              <span className="cate__vc league-spartan-light fs__normal-3 citizenship">
                <span className="league-spartan-semibold">
                  {props.cateViewCount}
                </span>{" "}
                viewers
              </span>
              <span className="fs__normal-2 citizenship fill__container league-spartan-light">
                {props.categoryDesc}
              </span>
            </div>
            <div className="tag__holder rr__flex-row">
              <TagCard name="English" />
              <TagCard name="Vietnamese" />
            </div>
          </div>
        </div>
      </>
    );
  } 
  else if(props.type === "datalist") {
    return (
      <>
        <div className="category__list-comp rr__flex-row rrf__ai-center" value={props.categoryName} onClick={props.onClick}>
          <span className="league-spartan-light rr__color-secondary fs__normal-2 ta__left" style={{
            padding: "0.5em",
          }}>
            {props.categoryName}
          </span>
        </div>
      </>
    )
  }
  
  else {
    return (
      <>
        <div
          className="category__card rr__flex-col"
          onClick={() => {
            navigate("/category");
          }}
        >
          <img src={props.categoryPic} className="cate__c-bg" />
          <div className="cate__content-holder rr__flex-col">
            <span className="fs__large-1 citizenship fill__container league-spartan-semibold">
              {props.categoryName}
            </span>
            <span className="cate__vc league-spartan-light fs__small-3 citizenship">
              {props.cateViewCount} viewers
            </span>
            <div className="tag__holder rr__flex-row">
              <TagCard name="English" />
              <TagCard name="Vietnamese" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
