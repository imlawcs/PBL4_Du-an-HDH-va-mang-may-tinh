import '../assets/css/Button.css'

export default function Button({type, text, onClick}) {
    if(type == "default")
    {
        return(
            <button className="btn__main league-spartan-semibold" onClick={onClick}>
                {text}
            </button>
        )
    }
    else if(type == "default-2")
    { 
        return(
            <button className="btn__main no__bg league-spartan-semibold citizenship" onClick={onClick}>
                {text}
            </button>
        )
    }
    else if(type == "link-type")
    {
        return(
            <button className="btn__main no__bg league-spartan-bold citizenship fs__normal-1" onClick={onClick}>
                {text}
            </button>
        );
    }
    else if(type == "nav-type"){
        return(
            <button className="btn__main no__bg league-spartan-light citizenship fs__normal-3 no__padding-lr" onClick={onClick}>
                {text}
            </button>
        );
    }
    else if(type == "nav-type-clicked"){
        return(
            <button className="btn__main bm__clicked no__bg league-spartan-light fs__normal-3 no__padding-lr" onClick={onClick}>
                {text}
            </button>
        );
    }
}