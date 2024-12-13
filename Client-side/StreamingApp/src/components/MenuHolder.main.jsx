import { Colors } from "../constants/Colors";

export default function MenuHolder(props){
    return(
        <div className="menu__container"
        style={{
            width: "10em",
            padding: "1em",
            backgroundColor: Colors.primary,
            position: "fixed",
            border: "0.16em var(--border-color) solid",
            borderRadius: "0.5em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            rowGap: "0.5em",
            zIndex: 9999,
            ...props.styles,
        }}
        >
            <span className="league-spartan-semibold fs__normal-3 citizenship">
                {props.title}
            </span>
            {props.children}
        </div>
    )
}