import { ApiConstants } from "../API/ApiConstants";
import "../assets/css/VideoContent.css";
import { Assets } from "../constants/Assets";
import TagCard from "./TagCard";

export default function VideoContent(props) {
  if (props.type == "search") {
    return (
      <>
        <div className="rr__flex-row rrf__col-small">
          <div
            className="thumbnail__small"
            style={{
              backgroundImage: `url(${props.thumbnail? props.thumbnail : Assets.defaultThumbnail})`,
              backgroundSize: "cover",
            }}
            onClick={props.onClick}
          >
            <div className="live__tag league-spartan-regular fs__normal-1">
              LIVE
            </div>
          </div>
          <div className="vc__content-search">
            <div className="rr__flex-col rrf__row-tiny rrf__jc-space-between">
              <div className="league-spartan-bold fs__normal-3 citizenship vc__username">
                {props.userName}
              </div>
              <div className="vc__category league-spartan-semibold fs__normal-1 citizenship"
                onClick={props.navigateCategory}
              >
                {props.category}
              </div>
              <div className="fs__normal-1 league-spartan-light citizenship">
                {props.view} views
              </div>
              <div className="vc__title league-spartan-regular fs__normal-1 citizenship">
                {props.title}
              </div>
              <div className="tag__holder rr__flex-row">
              {props.tags.map((tag, index) => (
                <TagCard key={index} name={tag.tagName} id={tag.tagId}/>
              ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
  }
  return (
    <div className="vc__holder">
      <div
        className="thumbnail"
        style={{
          backgroundImage: `url(${props.thumbnail})`,
        }}
        onClick={props.onClick}
      >
        <div className="live__tag league-spartan-regular fs__normal-1">
          LIVE
        </div>
      </div>

      <div className="vc__content">
        <div className="uinf__holder">
          <img className="avatar" src={props.profilePic} />
          <div className="uinf__holder-1">
            <div className="vc__title league-spartan-semibold fs__normal-2 citizenship">
              {props.title}
            </div>
            <div className="vc__username league-spartan-light fs__small-3 citizenship">
              {props.userName}
            </div>
            <div className="vc__category league-spartan-light fs__small-3 citizenship"
              onClick={props.navigateCategory}
            >
              {props.category}
            </div>
          </div>
        </div>
        <div className="tag__holder rr__flex-row">
          {props.tags && props.tags.map((tag, index) => (
            <TagCard key={index} name={tag.tagName} id={tag.tagId}/>
          ))}
        </div>
      </div>
    </div>
  );
}
