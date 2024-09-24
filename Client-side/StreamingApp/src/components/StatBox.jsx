import "../assets/css/StatBox.css";

export default function StatBox(props){
    return(
        <div className="rr__flex-col stat-box bg__color-2 citizenship">
            <span className="fs__large-2 league-spartan-semibold">{props.value}</span>
            <span className="fs__normal-2 league-spartan-light">{props.label}</span>
        </div>
    )
}