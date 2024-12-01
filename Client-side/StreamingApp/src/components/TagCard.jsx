import { useNavigate } from 'react-router-dom';
import '../assets/css/TagCard.css'


export default function TagCard(props) {
  const navigate = useNavigate();
    if(props.type === "tagPage"){
      return(
        <div className="tag__card-2x league-spartan-light">
          <span>
           <i>#{props.name}</i> 
          </span>
        </div>
      );
    }
    else
    return(
      <div className="tag__card league-spartan-semibold fs__small-2"
        onClick={() => navigate(`/tag/${props.id}`)}
      >
        <span>{props.name}</span>
      </div>
    );
}